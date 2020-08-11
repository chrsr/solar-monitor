const https = require('https')

exports.handler = async (event) => {

  const API_KEY = "[PASTEYOURSOLAREDGEAPIKEYHERE]"
  const SITE_ID = "[YOURSITEID]"

  let options = {
    host: 'monitoringapi.solaredge.com',
    port: 443,
    path: `/site/${SITE_ID}/overview.json?api_key=${API_KEY}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await new Promise((resolve, reject) => {
    const timeReq = https.get(options, (res) => {
      let timeRes = ''
      res.on('data', (chunk) => {
        timeRes += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(timeRes))
      })
      timeReq.on('error', (error) => {
        reject({
          statusCode: 500,
          body: error
        })
      })
    })
  })
  return response
}
