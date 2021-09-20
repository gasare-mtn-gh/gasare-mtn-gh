require("dotenv").config();
const express = require("express");
const path = require("path");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 8081;
const secret = process.env.SECRET;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("/" + req.method, req.path);
  next();
});

app.get("/", (req, res, err) => {
  res.send("sms-gateway server");
});

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

app.post("/sms-gateway", (req, res, err) => {
  const token = getToken(req);

  if (!token) {
    throw new Error("Authorization token is required");
  }
  console.log("Authorization Token : " + token);

  if (!secret) {
    throw new Error("Secret is not provided");
  }
  console.log("Secret : " + secret);

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      throw new Error("Error : " + err);
    }
    console.log(decoded);
  });
  console.log("Request Body ========= \n");
  console.log(req.body);
  res.sendStatus(200);
});

(async() => {

app.listen(port, () => console.log(`server is running on ${port}`));
})();