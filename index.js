//Declaración de Constantes
const express = require('express'); //Se importa el paquete
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Se llama al body-parser
app.use(bodyParser.json()); 
app.use(express.json());

//Conexión a la BD
mongoose.connect('mongodb+srv://edisonjsm17:KGO7htorRS7hlrLl@cluster0.dt2xs.mongodb.net/', {userNewUrlParser: true}, ()=>{
    console.log('Conexión a la base de datos exitosa');
});

//Arreglo de estudiantes
const students = [
    {id: 1, name: 'jorge', age: 20, enroll: true},
    {id: 2, name: 'mariana', age: 30, enroll: false},
    {id: 3, name: 'antonio', age: 25, enroll: false},
];

//Método para ver el mensaje "Node JS API"
app.get ('/', (req, res) => {
    res.send('Node JS API');    
});

//Método para que el arreglo se muestre en el navegador
app.get ('/api/students', (req, res) => {
    res.send(students);
});

//Método para buscar estudiantes según su ID, si el ID no está se mostrará el mensaje "Estudiante no encontrado"
app.get ('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

/*Método para crear un nuevo estudiante, la ID será de tipo autoincremental, el parámetro enroll será true
y los demás datos serán creados por el usuario 
*/ 
app.post('/api/students', (req, res)=> {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll ==='true')
    }
    student.push(student);
    res.send(student);
});

//Método para eliminar usuarios por el ID
app.delete('/api/students/:id', (req, res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send('Estudiante' + student + 'eliminado');
});

/*Este método creará un mensaje a la terminal que dira "Escuchando al puerto" seguido del puerto seleccionado,
en este caso el puerto 80
*/
const port = process.env.port || 80;
app.listen(port, ()=> console.log(`Escuchando al puerto ${port}...`));