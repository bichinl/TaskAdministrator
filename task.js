var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship  = require('mongoose-relationship');

var UserSchema = new Schema({
    nombre: String,
    username: String,
    password: String,
    tasks: [{type: Schema.ObjectId, ref: 'Task'}]
});
var User = mongoose.model('User', UserSchema);

var TaskSchema = new Schema({
    nombre: String,
    apellido: String,
    direccion: String,
    telefono: String,
    email: String,
    cantidad: Number,
    tarea_asignada:{
    	type: Boolean,
    	default: false
    },
    tarea_cobrada:{
    	type: Boolean,
    	default: false
    },
    user : {type: Schema.ObjectId, ref: 'User', childPath:"tasks"}
});

TaskSchema.plugin(relationship, { relationshipPathName:'user' });
var Task = mongoose.model('Task', TaskSchema);

exports.User = User;
exports.Task = Task;