const app = require('express')()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDoucemnt = yamljs.load('./docs/swagger.yaml');



const games = [
    {id: 1,name:"Baldurs gate 3",price: 10.99},
    {id: 2,name:"Dota 2",price: 20.99},
    {id: 3,name:"Dayz",price: 30.99}
]

app.get('/games',(req,res)=>{
    res.send(games)
})
app.get('/games/:id',(req,res)=>{
    if(typeof games[req.params.id - 1]==='undefined'){
        return res.status(404).send({error: "Game not found"})
    }

    res.send(games[req.params.id -1])
})


app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})

app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoucemnt))