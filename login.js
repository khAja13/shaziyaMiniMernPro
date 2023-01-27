const pool = require("./dbConnection");
const jwt = require("jsonwebtoken");
const sql = require("mssql/msnodesqlv8");

// module.exports = {
//   login: (req, res) => {
//     pool.connect().then(() => {
//       pool
//         .request()
//         .query("select * from customer", (error, results, fields) => {
//           let check = results.recordset.some(
//             (cust) => cust.email == req.body.email && cust.password == req.body.password
//           );
//           if (check) {
//             jwt.sign(
//               { email: req.body.email, password: req.body.password },
//               "secretKey",
//               { expiresIn: "300s" },
//               (err, token) => {
//                 res.json(token);
//               }
//             );
//             // return res.render("login", {
//             //   title: "Login List Page",
//             //   viewCss: "login.css",
//             //   // data: results.recordset,
//             // });
//           } else {
//             throw error;
//           }
//         });
//     });
//   },
//   token: (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//       const bearer = bearerHeader.split(" ");
//       const token = bearer[1];
//       req.token = token;
//       jwt.verify(token, "secretKey", (err, data) => {
//         if (err) {
//           res.send("Authentication Failed!");
//         } else {
//           res.json({ data });
//           next();
//         }
//       });
//     } else {
//       res.send("Authentication Not Found!");
//     }
//   },
// };

module.exports = {
  login: (req, res) => {
    pool.connect().then(() => {
      pool
        .request()
        .query("select * from customer where Deleted=0", (error, results, fields) => {
          if (error) {
            // handle the error
            console.error(error);
            return res.status(500).send("An error occurred");
          }
          let check = results.recordset.some(
            (cust) =>
              cust.email == req.body.email && cust.password == req.body.password
          );
          console.log(check, " it has checked the login");
          if (check) {
            jwt.sign(
              { email: req.body.email, password: req.body.password },
              "secretKey",
              { expiresIn: "300s" },
              (err, token) => {
                var expiryDate = new Date();
                expiryDate.setSeconds(expiryDate.getSeconds() + 10);
                res.cookie('token', 'Bearer ' + token, {expiryDate:expiryDate})
                // res.cookie('token', 'Bearer ' + token, {expire : expiryDate.toUTCString()})
                return res.redirect('/')
              }
            );
          } else {
            // email and password don't match any records
            return res.status(401).send("Invalid email or password");
          }
        });
    });
  },

  signup : (req, res) => {
    let { cName, email, password, phone } = req.body;
    phone = Number(phone);
    console.log(cName, email, password, phone);
    if (cName == "" || email == "" || password == "" || phone == "") {
      return res.render("signup", {
        title: "Signup List Page",
        viewCss: "login.css",
      });
    }
    pool.connect().then(() => {
      pool
        .request()
        .input("email", sql.VarChar, email)
        .query(
          "select * from customer where email = @email and Deleted=0",
          (error, results, fields) => {
            if (error) {
              throw error;
            } else {
              if (results.recordset.length > 0) {
                return res.render("signup", {
                  title: "Signup List Page",
                  viewCss: "login.css",
                });
              } else {
                pool.connect().then(() => {
                  pool
                    .request()
                    .input("cName", sql.VarChar, cName)
                    .input("email", sql.VarChar, email)
                    .input("password", sql.VarChar, password)
                    .input("phone", sql.Int, phone)
                    .input("Deleted", sql.Bit, false)
                    .query(
                      "INSERT INTO customer (cName,email,password,phone,Deleted) VALUES (@cName,@email,@password,@phone, @Deleted) ",
                      (error, results, fields) => {
                        if (results && results.rowsAffected > 0) {
                          jwt.sign(
                            { email, password },
                            "secretKey",
                            { expiresIn: "300s" },
                            (err, token) => {
                              var expiryDate = new Date();
                              expiryDate.setSeconds(expiryDate.getSeconds() + 10);
                              res.cookie('token', 'Bearer ' + token, {expiryDate:expiryDate})
                              // res.cookie('token', 'Bearer ' + token, {expire : expiryDate.toUTCString()})
                              return res.redirect('/')
                            }
                          );
                        } else {
                          return res.render("signup", {
                            title: "Signup List Page",
                            viewCss: "login.css",
                          });
                        }
                      }
                    );
                });
              }
            }
          }
        );
    });


  },

  // other functions go here
  token: (req, res, next) => {
    
    const bearerHeader = req.cookies['token']
    console.log(req.cookies, "adf ");
    console.log(typeof bearerHeader !== "undefined");
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
      jwt.verify(token, "secretKey", (err, data) => {
        if (err) {
          console.log("messed the token");
          res.clearCookie('token');
          return res.redirect('/login')
        } 
        else {
          next()
        }
      });
    } else {
      next()
    }
  },
};


// complete code of modern portfolio website , using html css js boostrap, and styled components, including navbar, hero section, about section, services, contact, projects, skills and footer?