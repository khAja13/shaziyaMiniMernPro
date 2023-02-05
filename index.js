const express = require("express");
const sql = require("mssql/msnodesqlv8");
const pool = require("./dbConnection");
const app = express();
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const { token, login, signup } = require("./login");
var favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "public", "favIcon.ico")));
// app.use('/favicon.ico', express.static('public/favIcon.ico'));
const session = require('express-session');

app.use(session({
  secret: 'yoursecretkey',
  resave: false,
  saveUninitialized: true
}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", "views");
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("*/css", express.static("public/css"));
const partialsPath = path.join(__dirname, "views/partial");
hbs.registerPartials(partialsPath);

app.use(express.json());



// Home
app.get("/signin", token, (req, res) => {
  console.log(req.token);
  if(req.token) {
    return res.redirect('/')
  }
  console.log("no token");
  return res.render("login_signup_API");
});

app.post('/signup', signup)
app.post("/login", login);

// All Customer
app.get("/", token, (req, res) => {
  console.log("yess ", req.token);
  if (req.token) {
    pool.connect().then(() => {
      pool
        .request()
        .query(
          "select * from customer where Deleted=0",
          (error, results, fields) => {
            res.render("index", {
              title: "Customer List Page",
              navCss: "nav.css",
              viewCss: "view.css",
              data: results.recordset,
            });
          }
        );
    });
  } 
  else return res.redirect('/signin')
}); 

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/signin')
})
// ADD
app.get("/add", token, (req, res) => {
  if(req.token) {
    return res.render("add", {
      title: "Customer Add Page",
      navCss: "nav.css",
      addCss: "add.css",
      // data: results.recordset,
    });
  }
  return res.redirect('/')
});

app.post("/add", (req, res) => {
    let { cName, email, password, phone } = req.body;
    phone = Number(phone);
    if (cName == "" || email == "" || password == "" || phone == "") {
      return res.render("add", {
        title: "Customer add page",
        navCss: "nav.css",
        addCss: "add.css",
        absent: true,
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
                return res.render("add", {
                  title: "Customer Add Page",
                  navCss: "nav.css",
                  addCss: "add.css",
                  checkmesg: true,
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
                          return res.render("add", {
                            title: "Customer Add Page",
                            navCss: "nav.css",
                            addCss: "add.css",
                            working: true,
                          });
                        } else {
                          return res.render("add", {
                            title: "Customer add page",
                            navCss: "nav.css",
                            addCss: "add.css",
                            error: true,
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

});

// UPDATE
app.get("/update/:id", token, (req, res) => {
  // console.log(req.params.id);
  if(req.token) {
    if (req.params.id) {
      pool.connect().then(async () => {
        const result = await pool
          .request()
          .input("Id", req.params.id)
          .query(`SELECT * FROM customer WHERE customerId = @Id`);
        updateData = result.recordset.length ? result.recordset[0] : null;
        // console.log(updateData);
        res.render("update", {
          title: "Customer Update Page",
          navCss: "nav.css",
          addCss: "add.css",
          data: updateData,
          updateid: updateData.customerId,
        });
      });
    }
  }
  else return res.redirect('/')
});

let updateData = {};
app.post("/update/:id", (req, res) => {
  console.log(req.params.id);
  let { cName, email, password, phone } = req.body;
  phone = Number(phone);

  if (cName == "" || email == "" || password == "" || phone == "") {
    return res.render("update", {
      title: "Customer Update Page",
      navCss: "nav.css",
      addCss: "add.css",
      absent: true,
    });
  }
  if (req.params.id) {
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
                if (results.recordset[0].customerId != req.params.id) {
                  return res.render("update", {
                    title: "Customer Update Page",
                    navCss: "nav.css",
                    addCss: "add.css",
                    repeated: true,
                  });
                }
              }
              pool
                .request()
                .input("Id", sql.VarChar, req.params.id)
                .input("cName", sql.VarChar, cName)
                .input("email", sql.VarChar, email)
                .input("password", sql.VarChar, password)
                .input("phone", sql.VarChar, phone)
                .query(
                  `UPDATE customer SET cName = @cName, email = @email,password = @password,phone = @phone WHERE customerId = @Id`,
                  (error, results, fields) => {
                    if (results && results.rowsAffected > 0) {
                      return res.render("update", {
                        title: "Customer Update Page",
                        navCss: "nav.css",
                        addCss: "add.css",
                        working: true,
                      });
                    } else {
                      return res.render("update", {
                        title: "Customer Update Page",
                        navCss: "nav.css",
                        addCss: "add.css",
                        error: true,
                      });
                    }
                  }
                );
            }
          }
        );
    });
  } else {
    res.render("update", {
      title: "Customer Update Page",
      navCss: "nav.css",
      addCss: "add.css",
      notExist: true,
    });
  }
});

// DELETE
let deleted = null;
app.get("/delete/:id", token, (req, res) => {
  console.log("in the /delete/{id}", req.params.id);
  if(req.token) {
    pool.connect().then(async () => {
      const result = await pool
        .request()
        .input("Id", req.params.id)
        .query(`SELECT * FROM customer WHERE customerId = @Id`);
      let check = result.recordset.length ? result.recordset[0] : null;
      if (check) {
        pool
          .request()
          .input("Id", sql.VarChar, req.params.id)
          .query(
            `UPDATE customer SET Deleted = 1 WHERE customerId = ${req.params.id}`,
            (error, results, fields) => {
              if (error) {
                throw error;
              } else {
                console.log(results);
                if (results.rowsAffected > 0) {
                  deleted = true;
                  res.redirect("/");
                } else {
                  deleted = true;
                  res.redirect("/");
                }
                console.log("changed the deleted to ", deleted);
              }
            }
          );
      }
    });
  }
  else return res.redirect('/')
});

app.listen("5000", (err) => {
  console.log("Server Running at port = localhost:5000");
});
