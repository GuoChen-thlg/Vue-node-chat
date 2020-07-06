const socket = require("socket.io");
exports.io = server => {
  const io = socket(server);
  const usocket = {},
    user = [];
  io.on("connection", function(socket) {
    // 登录
    socket.on("login", userinfo => {
      if (!(userinfo.phone in usocket)) {
        socket.userphone = userinfo.phone;
        usocket[userinfo.phone] = socket;
        // user.push(userinfo.phone);
        socket.emit("login", userinfo);
      }
    });
    // 接受消息
    socket.on("send", function(infoobj) {
      // 查找是否在线
      console.log(infoobj);
      if (infoobj.receiver in usocket) {
        // 发送消息
        usocket[infoobj.receiver].emit("receiv", infoobj);
      }
    });
  });
};
