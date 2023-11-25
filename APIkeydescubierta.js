const express = require ('express')
const app = express()
const {Pool} = require('pg')
const pool = new Pool({
    user:'default',
    host: 'ep-summer-breeze-14627241.us-east-1.postgres.vercel-storage.com',
    database: "verceldb",
    password: 'D1mtZ6KHNsYu',
    port: 5432,
    ssl: {rejectUnauthorized: false},
})
//"postgres://default:D1mtZ6KHNsYu@ep-summer-breeze-14627241.us-east-1.postgres.vercel-storage.com:5432/verceldb"

const API_KEY = "123"
const apiKeyValidation = (req, res, next) => {
    const userApiKey = req.get('USER_API_KEY');
    if (userApiKey && userApiKey === API_KEY){
        next();
    }else {
        res.status(401).send('Llave invalida')
    }
}

app.use(apiKeyValidation);

const port = 3000
app.use(express.json());



app.get('/products', (req, res) => {
const traerProductos = `SELECT * FROM products`
pool.query(traerProductos).then 
})

app.post('/products', (req, res) =>{
    const Nameproduct = req.body.Nameproduct
    const Price = req.body.price
    const Quantity = req.body.quantity

    const insertarProductos = `INSERT INTO products (Nameproduct, Price, Quantity) VALUES("${Nameproduct}", ${Price}, ${Quantity})`
    pool.query(insertarProductos)
    .then(() => {
        res.status(201).send("Producto registrado correctamente")

    })
    .catch(err => {
    console.error(err)
    res.status(500).send("hubo un error registrando el producto")

    })
    console.log(nameProduct)
    res.send(nameProduct)
})

app.listen(posrt, function(){
    console.log('servidor corriendo')
})



