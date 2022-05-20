const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors({
  credentials: true,
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.get('/', (req, res) => {
  res.send('Hello World1!')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

