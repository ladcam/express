const express = require('express');
const app = express();
const port = 3000;

const users = [{'name':'andres', 'lastname:':'fernandez'}, {'name':'jose', 'lastname':'ruiz'}];
app.use(express.json());

//Para añadir un usuario a nuestra lista de usuarios
app.post('/users', function(req, res){
    console.log(req.body);
    users.push(req.body);
    return res.send('usuario almacenado correctamente')
})


app.listen(port, () => {
    console.log(`The app is running`);
});