const mongoose = require("mongoose");

// url schema
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      requied: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      
    },
    visitHistory: [
      {
        timestamp: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// model url
const URL = mongoose.model("url", urlSchema);

module.exports = URL;