const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const swaggerDoucemnt = require('./docs/swagger.json');

app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoucemnt))

app.get('/games',(req,res)=>{
    res.send(["Baldurs gate 3","Dota 2","Dayz"])
})

app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})
