var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose= require('mongoose');
var app = express();

mongoose.connect('mongodb://sourcode:sourcode@novus.modulusmongo.net:27017/dida9Qad');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

var shit = require('./task.js');

app.get('/', function(req,res){
	res.sendfile('index.html');
});

/***********************************************
*
*	TASKS
*
************************************************/
app.get('/alltasks', function(req,res){
	shit.Task.find({tarea_asignada: false},function(err,tasks){
		if (err)
			console.log(err);
		res.json(tasks);
	});
});

app.get('/alltasksassigned', function(req,res){
	shit.Task.find({tarea_asignada: true},function(err,tasks){
		if (err)
			console.log(err);
		res.json(tasks);
	}).populate('user players');

});

app.get('/relationship-tasks', function(req,res){
	// shit.Task.find(function(err,tasks){
	// 	if (err)
	// 		console.log(err);
	// 	res.json(tasks);
	// });

	shit.Task.find().populate('user').exec(function(err, tasks) {
		if (err) 
			res.send(err);
		res.json(tasks);
	});
});

app.get('/relationship-users', function(req,res){
	// shit.Task.find(function(err,tasks){
	// 	if (err)
	// 		console.log(err);
	// 	res.json(tasks);
	// });

	shit.User.find().populate('tasks').exec(function(err, tasks) {
		if (err) 
			res.send(err);
		res.json(tasks);
	});
});

app.delete('/deletetask/:id', function(req,res){
	shit.Task.remove({_id:req.params.id},function(err){
		if (err)
			console.log(err);
		res.send('borrado');
	});
});

app.post('/save_task', function(req,res){
	var task = new shit.Task({
		nombre: req.body.nombre,
	    direccion: req.body.direccion,
	    telefono: req.body.telefono,
	    email: req.body.email,
	    cantidad: req.body.cantidad,
	});
	task.save(function(err){
		if(err)
			res.send(err);
		res.send('guardado');
	});

	//res.send(task._id);
});

/***********************************************
*
*	USERS
*
************************************************/
app.get('/allusers', function(req,res){
	shit.User.find(function(err,users){
		if (err)
			console.log(err);
		res.json(users);
	});
});

app.post('/save_user', function(req,res){
	var user = new shit.User({
		nombre: req.body.nombre,
	    username: req.body.username,
	});
	user.save(function(err){
		if(err)
			res.send(err);
		res.send('guardado');
	});

	//res.send(task._id);
});

/***********************************************
*
*	ASIGNAR TAREAS A USUARIO
*
************************************************/
// app.post('/asignartareas/:id', function(req,res){
// 	shit.User.findOneAndUpdate({_id:req.params.id}, {nombre: "nuevo nombre"}, function (err, place) {
// 		res.send('actualizado');
// 	});
// });

app.post('/asignartareas', function(req,res){
	// res.send(req.body);
	shit.Task.findOneAndUpdate({_id: req.body.task_id}, {user: req.body.usuario_id, tarea_asignada: true}, function (err, task) {
		if (err)
			res.send(err);

		res.send('asignada');
	});
});






app.listen(port, function(){
	console.log('Magic happens on port http://localhost:' + port);
});