const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs')
const swaggerDoucemnt = yamljs.load('./docs/swagger.yaml');

app.use(cors())
app.use(express.json())

const games = [
    {id: 1,name:"Baldurs gate 3",price: 10.99},
    {id: 2,name:"Dota 2",price: 0},
    {id: 3,name:"Dayz",price: 30.99},
    {id: 4,name:"Wither 3",price: 49.99},
    {id: 5,name:"Cyberpunk 2077",price: 15.99},
    {id: 6,name:"Minecraft",price: 10.99},
    {id: 7,name:"Counter-Strike: Global Offensive",price: 0},
    {id: 8,name:"Grand Theft Auto V",price: 30.99}
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

app.post('/games',(req,res)=>{
    if(!req.body.name || !req.body.price){
        return res.status(400).send({error:'One or all params are missing'})
    }
    let game ={
        id: games.length + 1,
        price: req.body.price,
        name: req.body.name
    }
    games.push(game)
    res.status(201)
        .location(`${getBaseUrl(req)}/games/${games.length}}`)
        .send(game)
})
app.delete('/games/:id',(req,res)=>{
    if (typeof games[req.params.id - 1]==='undefined'){
        return res.status(404).send({error:'Game not found'})
    }

    games.splice(req.params.id - 1,1)

    res.status(204).send({error:"No content"})
})

app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDoucemnt))

app.listen(port,()=>{
    console.log(`Api up at: http://localhost:${port}`)
})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted
        ? 'https' : 'http' + `://${req.headers.host}`
}