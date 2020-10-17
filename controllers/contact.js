'use strict'

var Contact = require('../models/contact');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');


var controller = {


	//Controlador para Save Project y Envio de Email
	sendEmail: function(req, res){
		
		var contact = new Contact();

		var params = req.body;
		contact.first = params.firstName;
		contact.last = params.lastName;
		contact.email = params.emailAddress;
		contact.phone = params.phoneNumber;
		contact.message = params.message;
		contact.subject = params.message;

		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			auth: {
				user: 'ryann25@ethereal.email',
				pass: '4uu6YKsfEdmugeUxA2'
			}
		});
		
		var mailOptions = {
			from: contact.email,
 			to: 	"bernardotano@gmail.com", // Cambia esta parte por el destinatario
 			subject: contact.subject,
 			html: `
 				<strong>Nombre:</strong> ${contact.first} <br/>
 				<strong>E-mail:</strong> ${contact.email} <br/>
 				<strong>Mensaje:</strong> ${contact.message}
 ` 
 			
		};

			transporter.sendMail(mailOptions, (error, info) => {
				if(error){
					res.status(500).send(error.message);
				}else{
					console.log("Email enviado correctamente");
					res.status(200).json(req.body);
					res.status(200).send({info});
				
				}

			});

			contact.save((err, contactStored) => {
				if(err) return res.status(500).send({message: 'Error al guardar el documento.'});
	
				if(!contactStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});
	
				return res.status(200).send({contact: contactStored});
			});
	
		

	},


	

};

module.exports = controller;