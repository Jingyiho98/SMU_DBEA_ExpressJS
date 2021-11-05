const express = require('express');
const app = express();
const port = process.env.PORT || 8085;
var XMLHttpRequest = require('xhr2');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//get OTP
app.post('/otp', (req,res)  => {
    var headerObj = {
        Header: {
            serviceName: "requestOTP",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: ""
        }
    };

    var header = JSON.stringify(headerObj);

    var http = new XMLHttpRequest();
    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway" + "?Header=" + header, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {

            var responseObj = JSON.parse(http.responseText);
            console.log(responseObj);
            // res.send(responseObj);

            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    }
})


//login customer
app.post('/login', (req,res)  => {
    var headerObj = {
        Header: {
            serviceName: "loginCustomer",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp
        }
    };

    var header = JSON.stringify(headerObj);

    var http = new XMLHttpRequest();
    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway" + "?Header=" + header, true);
    http.send();

     // setup http event handlers

     http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {

            var responseObj = JSON.parse(http.responseText);
            console.log(responseObj);

            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010000") {
                console.log("You have successfully logged in!");
                res.send("login");

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("login failed");
            }
        }
    };

    }

     )


//get customer details
app.post('/getCustomerDetails', (req,res)  => {
    var headerObj = {
        Header: {
            serviceName: "getCustomerDetails",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp
        }
    };

    var header = JSON.stringify(headerObj);

    var http = new XMLHttpRequest();
    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway" + "?Header=" + header, true);
    http.send();

     // setup http event handlers

     http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {

            var responseObj = JSON.parse(http.responseText);
            console.log(responseObj);

            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    };

    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);

    var http = new XMLHttpRequest();
    if (http === null){
        alert("Browser does not support HTTP request.");
        return;
    }

    http.open("POST", getApiURL()+"?Header="+header+"&Content="+content, true);
    http.timeout = 5000;


})

//Add beneficiary  
app.post('/addBeneficiary', (req,res) => {
    var headerObj = {
        Header: {
            serviceName: "addBeneficiary",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp,
        }
    };

    var contentObj = {
        Content: {
            AccountID: req.body.accountid,
            Description: req.body.description
        }
    };

    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);

    var http = new XMLHttpRequest();

    if (http === null){
        alert("Browser does not support HTTP request.");
        return;
    }

    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway"+"?Header="+header+"&Content="+content, true);
    http.send()

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {

            responseObj = JSON.parse(http.responseText);
            res.send(responseObj);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010041"){
                res.send("OTP expired");
            }
            else if (globalErrorID !== "010000"){
                // res.send(serviceRespHeader.ErrorDetails);
                res.send("error")
            }
        }
    }
})

//credit xfer
app.post('/creditTransfer' , (req, res) =>{
    var headerObj = {
        Header: {
            serviceName: "creditTransfer",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp,
        }
    };

    var contentObj = {
        Content: {
            accountFrom: req.body.accountFrom,
            accountTo: req.body.accountTo,
            transactionAmount: req.body.transactionAmount,
            transactionReferenceNumber: req.body.transactionReferenceNumber,
            narrative: req.body.narrative
        }
    };

    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);

    var http = new XMLHttpRequest();
    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway"+"?Header="+header+"&Content="+content, true);
    http.send();

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            var responseObj = JSON.parse(http.responseText);
        //check what is responseObj later  // get data
        // transactionID = responseObj.Content.ServiceResponse.TransactionID._content_;
        // balanceBefore = responseObj.Content.ServiceResponse.BalanceBefore._content_;
        // balanceAfter = responseObj.Content.ServiceResponse.BalanceAfter._content_;

            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;
            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    };

})

//getCustomerAccounts
app.get('/getCustomerAccounts' , (req, res) =>{
    var headerObj = {
        Header: {
            serviceName: "getCustomerAccounts",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp
        }
    };

    var header = JSON.stringify(headerObj);

    // setup http request
    var http = new XMLHttpRequest();
    if (http === null){
        res.send("Browser does not support HTTP request.");
    }

    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway" + "?Header=" + header, true);
    http.send();

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {

            responseObj = JSON.parse(http.responseText);
            res.send(responseObj);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    }

})

//getDepositAccountDetails
app.get('/getDepositAccountDetails', (req, res)=> {
    var headerObj = {
        Header: {
            serviceName: "getDepositAccountDetails",
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp,
        }
    };

    var contentObj = {
        Content: {
            AccountID: req.body.accountid
        }
    };

    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);

    var http = new XMLHttpRequest();

    if (http === null){
        alert("Browser does not support HTTP request.");
        return;
    }

    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway"+"?Header="+header+"&Content="+content, true);
    http.send()

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {

            responseObj = JSON.parse(http.responseText);
            res.send(responseObj);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    }

})

//applyForLoan
app.get('/applyLoan', (req,res) => {
    var headerObj = {

        Header: {
            serviceName: applyForLoan,
            userID: req.body.userid,
            PIN: req.body.pin,
            OTP: req.body.otp
        }

    };

    var contentObj = {

        Content: {
            productID: req.body.productid,
            loanPurpose: req.body.loanPurpose,
            loanAmount: req.body.loanAmount,
            numberOfMonths: req.body.numberOfMonths,
            assetValue: req.body.assetValue,
            title: req.body.title,
            currency: req.body.currency,
            settlementAccount: req.body.settlementAccount
        }

    };

    var header = JSON.stringify(headerObj);
    var content = JSON.stringify(contentObj);
    var http = new XMLHttpRequest();

    if (http === null){
        alert("Browser does not support HTTP request.");
        return;
    }

    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway"+"?Header="+header+"&Content="+content, true);
    http.send()

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {

            responseObj = JSON.parse(http.responseText);
            
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    }
})


//sendEmail
app.post('/sendEmail', (req,res) => {
         // set request parameters

         var headerObj = {

            Header: {

                serviceName: "sendEmail",

                userID: req.body.userid,

                PIN: req.body.pin,

                OTP: req.body.otp

            }

        };

        var contentObj = {

            Content: {

                emailAddress: req.body.emailAddress,

                emailSubject: req.body.emailSubject,

                emailBody: req.body.emailBody

            }

        };

        var header = JSON.stringify(headerObj);

        var content = JSON.stringify(contentObj);

        var http = new XMLHttpRequest();

    if (http === null){
        alert("Browser does not support HTTP request.");
        return;
    }

    http.open("POST", "http://tbankonline.com/SMUtBank_API/Gateway"+"?Header="+header+"&Content="+content, true);
    http.send()

    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {

            responseObj = JSON.parse(http.responseText);
            serviceRespHeader = responseObj.Content.ServiceResponse.ServiceRespHeader;
            globalErrorID = serviceRespHeader.GlobalErrorID;

            if (globalErrorID === "010000") {
                console.log("success");
                res.send(responseObj);

            } else {
                console.log(serviceRespHeader.ErrorDetails);
                res.send("error");
            }
        }
    }


})


app.listen(port, () => {
  console.log(`Server running on ${port}`)
})