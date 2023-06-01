const express = require('express')
const app = express()
app.listen(4000, () => console.log(`server running on 4000`))

app.use(express.static(`${__dirname}/public`))