'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var tasks = traceur.require(__dirname + '/../routes/tasks.js');


  app.get('/', dbg, home.index);

  app.post('/users/register', dbg, users.register);
  app.get('/users/home', dbg, users.home);
  app.post('/users/login', dbg, users.login);
  app.get('/users/dashboard', dbg, users.dashboard);

  app.all('*', users.bounce);

  app.get('/test', dbg, users.testytest);

  app.put('/tasks/add', dbg, tasks.addNew);
  app.delete('/tasks/delete/:id', dbg, tasks.delete);

  console.log('Routes Loaded');
  fn();
}
