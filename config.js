const dotenv = require("dotenv");


dotenv.config();

module.exports = {
    connection_string : process.env.CONNECTION_STRING
}