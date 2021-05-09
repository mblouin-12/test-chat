var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

let users = [];

app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {

  socket.on('new-user', (user) => {
    users.push(user);
    io.emit('users-broadcast', users);
  })

  socket.on('message', (msg) => {
    socket.broadcast.emit('message-broadcast', msg);
  });

  socket.on('user-update', (updated_user) => {
    var user = users.find(u => u.id==updated_user.id)
    if (user) {
      Object.assign(user, updated_user);
      socket.broadcast.emit('users-broadcast', users);
    }
  });

  socket.on('user-disconnect', (user_id) => {
    var user = users.find(u => u.id==user_id)
    if (user) {
      user.connected = false;
      socket.broadcast.emit('users-broadcast', users);
    }
  });

});

http.listen(3000, () => {});
