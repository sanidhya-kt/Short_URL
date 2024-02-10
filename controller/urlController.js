const ShortUniqueId = require("short-unique-id");
const URL = require("../models/urlModel");

//post request:
async function generateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    res.status(400).json({ error: "url not found" });
  }
  const uid = new ShortUniqueId({ length: 12 });
  const shortUrl = uid.rnd();

  await URL.create({
    shortId: shortUrl,
    redirectUrl: body.url,
    visitHistory: [],
  });
  res.status(201).json({ status: "success", id: shortUrl });
}
// get request: redirect from short url to original url-----

async function redirectToUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).json({ error: "Document not Found!" });
  }
}

// get request : get totalclick of user, analytics
async function getAnalytics(req, res) {
  const shortid = req.params.shortUrl;
  const result = await URL.findOne({ shortid });
  res.json({
    TotalClick: result.visitHistory.length ,
    analytics: result.visitHistory,
  });
}

module.exports = { generateShortUrl, redirectToUrl, getAnalytics };
