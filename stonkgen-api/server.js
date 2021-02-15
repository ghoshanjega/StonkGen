const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./routes');
const { handleError, ErrorHandler } = require('./helper/error');
const authenticationController = require('./controller/authenticationController');

const app = express();

// middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 3001;

routes(app);

app.get('/error', (req, res) => {
   throw new ErrorHandler(500, 'Internal server error');
 })
app.use((err, req, res, next) => {
   try{
   handleError(err, res);
   }
   catch (e) {
      console.log(err)
      res.redirect('/error')
   }
 });
 
app.listen(port, function() {
   console.log('Server started on port: ' + port);
});