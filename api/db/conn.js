const pg = require("pg");
const dbObj = {
    host: "localhost",
    port: 5432,
    database: "linkify",
    user: "yashwantsoni",
    password: "toor"
};
const client = new pg.Client(dbObj);
client.connect();

module.exports = client;