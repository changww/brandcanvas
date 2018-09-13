var http = require('http');
var fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer'); 
var app = express();
const PORT=8080; 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

//app.use(express.static());

var emailC = ``; //to hold email
//push from client submission
app.use('/api/subscribe', function(req, res){
    try {
        console.log(req.body.email);
        nameC = JSON.stringify(req.body.name);
        emailC = JSON.stringify(req.body.email);
        //makeApiCall(nameC, emailC);
        console.log("googPost function executed");
        // sendMail(emailC);
        // console.log("sendMail function executed");
        return true;
    } catch (error) {
        console.log("Something errored");
        //return res;
    }
        
    


})

//GoogleAPI post
// var googPost = function(name, email){
//     var datatPost = {
//         "range": "Sheet1!A9:B9",
//         "majorDimension": "ROWS",
//         "values": [
//               [
//                 name,
//                 email
//               ]
//             ]
//     }

//     POST https://sheets.googleapis.com/v4/spreadsheets/1Ed4qkqhJxEWiLrV49Lb0Mv3nItrXOwJ9yGrEjbdlFtk/values/{range}:append
// }

const {google} = require('googleapis');
var sheets = google.sheets('v4');
const TOKEN_PATH = 'token.json';

authorize(function(TOKEN_PATH) {
  var request = {
    // The ID of the spreadsheet to update.
    spreadsheetId: '1Ed4qkqhJxEWiLrV49Lb0Mv3nItrXOwJ9yGrEjbdlFtk',  

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: 'Sheet1!A1:B1',  

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',  

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',  
    

    resource: {
        "values": [
            [
              name,
              email
            ]
          ]
    },
    auth: authClient,
 };
    
  sheets.spreadsheets.values.append(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    // TODO: Change code below to process the `response` object:
    console.log(JSON.stringify(response, null, 2));
  });
});

function authorize(callback) {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'

  var authClient = TOKEN_PATH;

  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
  callback(authClient);
}






app.listen(PORT, function(){console.log("server running")});

