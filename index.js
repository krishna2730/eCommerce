const express = require('express');
const useAPI = require('./src/routes/api.routes');
const errorHandler = require('./src/middleware/error-handler');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/api-docs/swagger.json');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

useAPI(app, "/api/v1/triveous");
app.use(
    "/api-docs",
    swaggerUi.serveWithOptions({ redirect: false }),
    swaggerUi.setup(swaggerDocument)
  );

// app.use(function(error, req, res, next) {
    //   console.log('Error: ',error);
    //     next(error);
//   });

app.use(errorHandler);

app.listen(process.env.PORT,() => {
    console.log(`App is listening at port: ${process.env.PORT}`);
})