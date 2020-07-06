const db = require("./config/db");
const crypto = require("crypto");

// api
exports.api = app => [
  // 注册功能
  app.post("/api/register", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      db.query(
        "SELECT * FROM `user_login` WHERE `user_phone`=?",
        [data.phone],
        (error, rows) => {
          if (error) {
            console.log("查询手号是否注册" + error);
            res.json({
              code: 0,
              hint: "注册失败"
            });
          } else {
            let md5 = crypto.createHash("md5");
            let newpwd = md5.update(data.password).digest("hex");
            rows.length > 1
              ? res.json({
                  code: 0,
                  init: "此手机号已经注册，请登录"
                })
              : db.query(
                  "INSERT INTO `node_chatroom`.`user_login` (`user_phone`, `user_pwd`,`user_name`) VALUES (?,?,?)",
                  [data.phone, newpwd, "用户" + data.phone],
                  function(error, rows) {
                    if (error) {
                      res.json({
                        code: 0,
                        init: "注册失败"
                      });
                    } else {
                      if (rows.affectedRows == 1) {
                        res.json({
                          code: 200,
                          init: "注册成功"
                        });
                      }
                    }
                  }
                );
          }
        }
      );
    });
  }),
  // 登录功能
  app.post("/api/login", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      db.query(
        "SELECT l.`user_pwd` pwd,i.`user_phone` phone,i.`user_head` head,i.`user_name` uname FROM `user_login` l,`user_info` i WHERE l.`user_phone`=? AND l.`user_phone`=i.`user_phone`",
        [data.phone],
        (error, rows) => {
          console.log(error, rows);
          
          if (error) {
            console.log(error);
            res.json({
              code: 0,
              user: {},
              hint: "登陆失败"
            });
          } else {
            if (rows.length > 0) {
              let md5 = crypto.createHash("md5");
              rows[0].pwd == md5.update(data.password).digest("hex")
                ? res.json({
                    code: 200,
                    user: {
                      phone: rows[0].phone,
                      name: rows[0].uname,
                      head: rows[0].head
                    },
                    hint: "登陆成功"
                  })
                : res.json({
                    code: 0,
                    user: {},
                    hint: "账号或密码错误"
                  });
            } else {
              res.json({
                code: 0,
                user: {},
                hint: "账号或密码错误"
              });
            }
          }
        }
      );
    });
  }),
  // 添加好友
  app.post("/api/addfriend", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      // 逻辑
      db.query(
        "INSERT INTO `node_chatroom`.`friends_1` (`friends_phone`, `user_phone`) VALUES (?,?)",
        [data.friend_phone, data.user_phone],
        (error, rows) => {
          if (error) {
            res.json({
              code: 0,
              hint: "添加失败"
            });
          } else {
            rows.affectedRows == 1
              ? res.json({
                  code: 200,
                  hint: "添加成功"
                })
              : res.json({
                  code: 0,
                  hint: "添加失败"
                });
          }
        }
      );
    });
  }),
  // 删除好友
  app.post("/api/delfriend", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      // 逻辑
      db.query("", [], (error, rows) => {});
    });
  }),
  // 修改好友信息
  app.post("/api/alterfriend", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      // 逻辑
      db.query("", [], (error, rows) => {});
    });
  }),
  // 得到所有好友
  app.post("/api/getallfriend", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      console.log(data.phone);
      
      db.query(
        "SELECT friend.`user_phone` friendPhone ,friend.`user_name` friendName,friend.`user_head` friendHead  FROM `user_info` friend WHERE`user_phone`   IN (SELECT f.`friends_phone` FROM (SELECT `friends_phone`,`user_phone` FROM `friends_1` WHERE `friends_phone`=? OR `user_phone`=?) f WHERE f.`user_phone`=? UNION SELECT f.`user_phone` FROM (SELECT `friends_phone`,`user_phone` FROM `friends_1` WHERE `friends_phone`=? OR `user_phone`=?) f WHERE f.`user_phone`!=?)",
        [
          data.phone,
          data.phone,
          data.phone,
          data.phone,
          data.phone,
          data.phone
        ],
        (error, rows) => {
          if (error) {
            res.json({
              code: 0
            });
          } else {
            console.log(rows);
            
            res.json({
              code: 200,
              data: rows
            });
          }
        }
      );
    });
  }),
  // 搜索好友
  app.post("/api/findfriend", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      // 逻辑
      db.query(
        "SELECT `user_phone`,`user_name` FROM `user_login` WHERE `user_phone`=?",
        [data.keyword],
        function(error, rows) {
          if (error) {
            res.json({
              code: 0
            });
          } else {
            res.json({
              code: 200,
              data: rows
            });
          }
        }
      );
    });
  }),
  // 获得所有用户
  app.get("/api/getalluser", (req, res) => {
    db.query("", [], (error, rows) => {});
  }),

  app.post("/api/", (req, res) => {
    let currentData = "";
    req.on("data", data => {
      currentData += data;
    });
    req.on("end", () => {
      let data = JSON.parse(currentData);
      // 逻辑
      db.query("", [], (error, rows) => {});
    });
  })
];
