const express = require('express');
const app = express();
const port = 3000;

const users = [{'name':'andres', 'lastname:':'fernandez'}, {'name':'jose', 'lastname':'ruiz'}];
app.use(express.json());

//esta funcion es la mas sencilla de todas, solo muestra cualquier texto que se ponga en el res.send
app.get('/', function(req,res) {
return res.send('hello world!');
});

//esta funcion muestra un arreglo cualquiera que se ponga en el res.send, en este caso la url http://localhost:3000/users/0 va a mostrar el arrego ['andres', 'maria', 'juan']
app.get('/users', function(req,res) {
return res.send(users);    
})

//index es lo mismo que posicion. Las posiciones comienzan en 0. Esta funcion muestra la informacion de una posicion
//ejemplo: http://localhost:3000/users/0, esta url va a mostrar la informacion de la posicion 0
app.get('/users/:id', function(req,res) {
    const index = req.params.id;
    return res.send(users[index]);
})

//filtrar un usuario poniendo el nombre en la url. por ejemplo: localhost:3000/users2?name=jose Nota: fijese que tiene que poner 
app.get('/users2', function(req,res){
    console.log(req.query.name)
    const foundUser = users.find(function (user){
        return user.name === req.query.name;
    })
    return res.send(foundUser);
})

//Para añadir un usuario a nuestra lista de usuarios
app.post('/users', function(req, res){
    console.log(req.body);
    users.push(req.body);
    res.status(201);
    return res.send('usuario almacenado correctamente')
})

//para modificar un usuario ya existente
app.put('/users/:id', function(req,res) {
    const index = req.params.id;
    users[index] = req.body;
    return res.send(users[index])
})

//para modificar un usuario ya existente
app.delete('/users/:id', function(req,res) {
    const index = req.params.id;
    users.splice(index,1);
    return res.send(users)
})

app.listen(port, () => {
    console.log(`The app is running`);
});