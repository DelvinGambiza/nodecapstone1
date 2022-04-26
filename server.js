const express = require('express')
const fs = require('node:fs')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.render('/index.html')
})

app.get('/sys', (req, res) => {
   const osInfo = {
     hostname: os.hostname(),
     platform: os.platform(),
     architecture: os.arch(),
     numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
     uptime: os.uptime()
   }
   const osInfoJSON = JSON.stringify(osInfo)
   
   fs.writeFile('osinfo.json', osInfoJSON, (err) => {
     if(err) throw err;
     res.set('Content-Type', 'text/html')
     res.status(201).send('Your OS info has been saved successfully!')     
   })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
