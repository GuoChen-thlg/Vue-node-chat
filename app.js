const express = require("express"); // 引入 express 框架
const bodyParser = require("body-parser");
const multer = require("multer");
const route = require("./node/route");
const socket = require("./node/socket");
const app = express();
const server = require("http").Server(app);

const port = process.env.PORT || 3001;

socket.io(server);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* 配置静态文件 */
app.use(express.static("dist"));

/**
 * 路由
 */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
// Api 路由
route.api(app);

server.listen(port, () => {
  console.log("访问地址为 http://localhost:%s", port);
});
