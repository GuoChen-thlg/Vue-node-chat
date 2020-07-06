const mysql = require("mysql"); // mysql 驱动
// 连接池
const pool = mysql.createPool({
  // 主机名
  host: "127.0.0.1",
  // 端口 默认为 3306
  port: "3306",
  // 数据库 用户名
  user: "root",
  // 数据库 密码
  password: "root",
  //  数据库名
  database: "node_chatroom"
});
exports.query = (sql,params, callback) => {
  pool.getConnection(function(err, connection) {
    connection.query(sql,[...params], function(err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
};
