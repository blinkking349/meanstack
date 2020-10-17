'use strict'

// conexion a la base de datos MongoDb
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;
var path = require('path');
var express = require('express');

var app = express();
const { urlencoded } = require('body-parser');
const { routes } = require('./app');


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:test35755@cluster0.hdhh3.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser:true, useUnifiedTopology: true })
    .then(() =>{
        console.log('conexion a la base de datos MongoDB establecida con exito');
        
        //Creacion del Servidor 
        app.listen(port, ()=>{
            console.log("Servidor Activo en la Url Localhost:" +port);
        });
    
    })
    .catch(err => console.log(err));
    
    app.use(express.static(__dirname + '/client/dist/proyecto-angular' ));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname + '/client/dist/proyecto-angular/index.html')); //relative path
    });
    


