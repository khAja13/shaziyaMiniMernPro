
const sql = require("mssql/msnodesqlv8");
module.exports = new sql.ConnectionPool({
  database: "mappedTable",
  server: "KHAJASHAIK\\SQLEXPRESS",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
});