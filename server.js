const express = require('express')
const fs = require('node:fs')
const path = require('path')
const os = require('os')
const app = express()
const port = 8000

const pages = path.join(__dirname, 'pages');
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile('./index.html', { root : pages })
  res.set('Content-Type', 'text/html')
  res.status(200) 
})

app.get('/about', (req, res) => {
  res.sendFile('./about.html', { root : pages })
  res.set('Content-Type', 'text/html')
  res.status(200) 
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

app.use(function(req,res,next){
  res.status(404).sendFile('404.html', { root : pages })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
