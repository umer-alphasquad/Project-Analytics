const express = require("express");
const body_parser = require("body-parser");

const router = require("./routes");

const app = express();
app.use(body_parser.json());

app.use(router);
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res
      .status(err.statusCode)
      .send({ err: true, message: err.message })
      .end();
  });
  app.listen(process.env.PORT || 5000 , function(){
    console.log('Ready to Go!');
});
