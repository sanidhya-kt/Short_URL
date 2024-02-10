const mongoose = require("mongoose");

async function connectDatabase() {
  await mongoose
    .connect("mongodb://localhost:27017/urlShortener")
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    })
}

module.exports = { connectDatabase };
