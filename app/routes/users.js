'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Task = traceur.require(__dirname + '/../models/task.js');
var Mongo = require('mongodb');

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