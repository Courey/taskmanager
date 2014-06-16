'use strict';
var traceur = require('traceur');
//var User = traceur.require(__dirname + '/../models/user.js');
var Task = traceur.require(__dirname + '/../models/task.js');

exports.addNew= (req, res)=>{
	Task.create(req.session.userId, req.body, task=>{
		res.render('tasks/task', {task:task});
	});
};
exports.delete= (req, res)=>{
	Task.findByTaskId(req.params.id, task=>{
		task.destroy(()=>{
			res.send();
		});
	});
};