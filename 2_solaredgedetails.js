const https = require('https')

exports.handler = async (event) => {

  const API_KEY = "[PASTEYOURSOLAREDGEAPIKEYHERE]"
  const SITE_ID = "[YOURSITEID]
  const dateTime = encodeURI(event.Input.Payload.overview.lastUpdateTime)

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
