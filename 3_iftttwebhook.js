  const https = require('https')

  exports.handler = async (event) => {

    const IFTTT_APIKEY = process.env.IFTTT_APIKEY
    const EVENTS = {
      on: "turnon_light",
      off: "turnoff_light"
    }
    const meters = null

    try {
      meters = event.Input.Payload.powerDetails.meters
    } catch (exception) {
      console.log("Could not read power meter data", exception)
      return
    }

    function areWeProducing(meters) {
      let production, consumption
      meters.forEach(meter => {
        if (meter.type === "Production") production = meter.values[0].value
        if (meter.type === "Consumption") consumption = meter.values[0].value
      })
      return production > consumption
    }

    const iftttevent = areWeProducing(meters) ? EVENTS.on : EVENTS.off

    let options = {
      host: `maker.ifttt.com`,
      port: 443,
      path: `/trigger/${iftttevent}/with/key/${IFTTT_APIKEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await new Promise((resolve, reject) => {
      const post_req = https.request(options, (res) => {
        let iftttRes = ''
        res.on('data', (chunk) => {
          iftttRes += chunk
        })
        res.on('end', () => { 
          resolve(iftttRes)
        })
        post_req.on('error', (error) => {
          reject({
            statusCode: 500,
            body: error
          })
        })
      })
      post_req.write("");
      post_req.end();
    })
    return response
  }
