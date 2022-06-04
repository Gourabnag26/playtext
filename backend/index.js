const connectToMon=require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors=require('cors')
connectToMon()

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`playtext backend is listening on port http://localhost:${port}`)
})