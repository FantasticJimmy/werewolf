const express = require('express')

const app = express();

const port = process.env.PORT || 1201
app.use('/',(req, res)=>{
  res.send('hello werewolf game')
})


app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
})



