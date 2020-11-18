const https = require('https')

exports.handler = async (event) => {

  const API_KEY = process.env.SOLAREDGE_APIKEY
  const SITE_ID = process.env.SOLAREDGE_SITEID
  let dateTime = null

  try {
    dateTime = encodeURI(event.Input.Payload.overview.lastUpdateTime)
  } catch (exception) {
    console.log("Could not read last update time", exception)
    return
  }

  let options = {
    host: 'monitoringapi.solaredge.com',
    port: 443,
    path: `/site/${SITE_ID}/powerDetails.json?api_key=${API_KEY}&meters=PRODUCTION,CONSUMPTION&startTime=${dateTime}&endTime=${dateTime}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await new Promise((resolve, reject) => {
    const detailsReq = https.get(options, (res) => {
      let detailsRes = ''
      res.on('data', (chunk) => {
        detailsRes += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(detailsRes))
      })
      detailsReq.on('error', (error) => {
        reject({
          statusCode: 500,
          body: error
        })
      })
    })
  })
  return response
}
