const express = require('express');
const cors = require('cors');
const con = require('./conectDb');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


app.listen(4000, () => {
    con.connect('mongodb://localhost/clinica', (erro, res) => {
        if(!erro) {
            db = res.db('clinica');
            console.log("Servidor iniciado!");
        } else {
            console.log("Erro: " + con.MongoError)
        }
    });
});

app.get('/paciente/:nome', (req,res) => {
    const collection = db.collection('pacientes')

    let paciente = req.params.nome;

    console.log(paciente);

    collection.findOne({ nome: paciente })
        .then(item => {
            res.json(item);
            console.log("Item: " + res)
        })
        .catch(err => {
            console.error("Erro: " + err)
        })
});

app.get('/pacientes', (req,res) => {
    db.collection('pacientes').find().toArray((err, items) => {
        console.log(items)
        res.json(items);
    })
});

app.post('/pacientes', (req,res) => {
    const collection = db.collection('pacientes');

    let paciente = req.body;

    collection.insertOne(paciente, (err, result) => {
        console.log(result)
    })
    console.log(paciente);
    res.send("Ok!");
});

app.delete('/paciente/:nome', (req,res) => {
    const collection = db.collection('pacientes');

    let paciente = req.params.nome;

    collection.deleteOne({ name: paciente })
        .then(item => {
            res.json(item);
            console.log("Apagado: " + res)
        })
        .catch(err => {
            console.log("Erro: " + err)
        })
});

app.put('/paciente/', (req,res) => {
    const collection = db.collection('pacientes');

    let paciente = req.body;

    collection.updateOne(paciente, {'$set': paciente}, (err, item) => {
        console.log(item)
    })
});


app.post('/medico', (req,res) => {
    const collection = db.collection('medicos');

    let medico = req.body;

    collection.insertOne(medico, (err, result) => {
        console.log(result)
    })
    console.log(medico);
    res.send("Ok!");
});

app.get('/medicos', (req,ree) => {
    db.collection('medicos').find().toArray((err, items) => {
        console.log(items)
        res.json(items);
    })
});