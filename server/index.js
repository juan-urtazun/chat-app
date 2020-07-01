const express = require("express");
const socket_io = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require("./users");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

app.use(router);

io.on("connection", (socket) => {
  console.log("We have a new connection!!!");

  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(user.room);

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!");
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
