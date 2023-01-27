const express = require("express")
const api = express();
// var knex = require("knex")({
//   client: "mssql",
//   connection: {
//     user: "",
//     password: "",
//     server: 'localhost',
//     // database: "mappedTable",
//   },
// });

// require("mssql/msnodesqlv8");
// let Knex = require("knex");
// let Dialect = require(`knex/lib/dialects/mssql/index.js`);
// Dialect.prototype._driver = () => require("mssql/msnodesqlv8");
// let sql = Knex({
//   client: Dialect,
//   connection: {
//     server: "HP\\SQLEXPRESS",
//     port: 1433,
//     database: "mappedTable",
//     driver: "msnodesqlv8",
//     options: {
//       trustedConnection: true,
//     },
//   },
// });

// const knex = require("knex");
// const database = knex({
//   client: "mssql",
//   connection: {
//     user: "root",
//     password: "",
//     host: "HP\\SQLEXPRESS",
//     database: "mappedTable",
//   },
// });

// const knex = require("knex")({
//   client: "mssql",
//   connection: {
//     driver: "msnodesqlv8",
//     server: "HP\\SQLEXPRESS",
//     database: "mappedTable",
//     options: {
//       trustedConnection: true,
//     },
//   },
// });
const { json } = require("body-parser");
const _ = require("lodash");
const lodash = require("lodash");

const knex = require("knex")({
  client: "mssql",
  connection: {
    host: "localhost",
    port: 1433,
    user: "user",
    password: "Iqra@1234",
    database: "mappedTable",
  },
});


api.use(express.json());
console.log("working");
api.get("/helo",(req,res)=>{
  res.send("working")
})
api.get("/",(req,res)=>{
  let hydrated = {}
  let ans = {}
  const one = knex
  .select(
    "customer.customerId",
    "customer.cName",
    "customer.email",
    "customer.phone",
    "custAddres.place",
    "custAddres.zipcode",
    // "OrdersDetails.oderId",
    // "OrdersDetails.customerId as custIdOrder",
    // "OrdersDetails.oQty",
    // "OrdersDetails.invoice"
  )
  .from("customer")
  .leftJoin("custAddres", "customer.customerId", "custAddres.customerId")
  // .leftJoin("OrdersDetails", "customer.customerId", "OrdersDetails.customerId")
  .then((results) => {
    console.log(results.length);
    results.forEach((row) => {
      console.log(row);
          if (!(row.customerId in hydrated)) {
            hydrated[row.customerId] = {
              customerId: row.customerId,
              cName: row.cName,
              phone: row.phone,
              address: [],
              order : [],
            };
          }
          // else if (!(row.customerId in hydrated)) {
          //   hydrated[row.customerId] = {
          //     customerId: row.customerId,
          //     cName: row.cName,
          //     phone: row.phone,
          //     address: [],
          //     order : [],
          //   };
          // }
          hydrated[row.customerId].address.push({
            place: row.place,
            zipcode: row.zipcode,
          });
          // hydrated[row.customerId].order.push({
          //   oderId: row.oderId,
          //   invoice: row.invoice,
          //   oQty :row.oQty
          // });
     });
     res.send(hydrated)
    console.log(hydrated);
})
})
api.listen("1999");


// need data in this format expected
// {
//   "customerId":1,
//   "cName":"Tim",
//   "email":"IND",
//   "password":"21151",
//   "phone":545454545,
//   "Deleted":null,
//   "orders":[
//      {
//         "oderId":9,
//         "invoice":121515,
//         "oQty":23
//      },
//      {
//         "oderId":8,
//         "invoice":1511,
//         "oQty":1
//      },
//      {
//         "oderId":1,
//         "invoice":555500,
//         "oQty":2
//      }
//   ],
//   "address":[
//      {
//         "custaddId":1,
//         "place":"usa",
//         "zipcode":2132,
//         "customerId":1
//      },
//      {
//         "custaddId":4,
//         "place":"nes",
//         "zipcode":69453,
//         "customerId":1
//      }
//   ]
// }
//repeated/?
