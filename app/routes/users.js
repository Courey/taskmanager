'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Task = traceur.require(__dirname + '/../models/task.js');
var Mongo = require('mongodb');
var exec = require('child_process').exec;

exports.testytest = (req, res)=>{
	var child;
	var test = 'say "how much wood could a woodchuck chuck if a woodchuck could chuck wood"';

	child = exec(test,
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
		});
};

exports.dashboard = (req, res)=>{
	User.findById(req.session.userId, response=>{
		var userId = Mongo.ObjectID(req.session.userId);
		Task.findByUserId(userId, taskList=>{
			console.log(taskList);
			res.render('users/tasks', {user:response, tasks: taskList});
		});
	});
};

exports.register= (req, res)=>{
	User.register(req.body, user=>{
		req.session.userId = user._id;
		res.redirect('/users/home');
	});
};

exports.home= (req, res)=>{
	User.findById(req.session.userId, response=>{
		var userId = Mongo.ObjectID(req.session.userId);
		Task.findByUserId(userId, taskList=>{
			console.log(taskList);
			res.render('users/home', {user:response, tasks: taskList});
		});
	});
};

exports.login= (req, res)=>{
	User.login(req.body, user=>{
		req.session.userId = user._id;
		res.redirect('/users/home');
	});
};

exports.bounce = (req, res, next)=>{
	User.findById(req.session.userId, user=>{
		if(user){
			res.locals.user = user;
			next();
		}else{
			res.redirect('/');
		}
	});
};
