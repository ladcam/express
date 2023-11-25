const express = require ('express')
const app = express()
const port = 3000
app.use(express.json());

app.get('/products', (req, res) => {
res.status(200).send('hola mundo')
})

app.listen(posrt, function(){
    console.log('servidor corriendo')
})

app.post('/products', (req, res) =>{
    const name = req.body.name
    console.log(name)
    res.send(name)
})

