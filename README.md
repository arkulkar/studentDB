# studentDB
```
A simple example on using mongoDB with nodeJS
```

##Getting started

Let's go with step by step procedure starting from installing node  

##Step 1: Installing node
```
npm init [-f|--force|-y|--yes]
```
This will ask you a bunch of questions, and then write a package.json for you.

It attempts to make reasonable guesses about what you want things to be set to, and then writes a package.json file with the options you've selected.

If you already have a package.json file, it'll read that first, and default to the options in there.

If you invoke it with -f, --force, -y, or --yes, it will use only defaults and not prompt you for any options.

At this point you will see the "package.json" file created. The file looks something like this,

```
{
  "name": "studentdb",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Akshata",
  "license": "ISC",
  "dependencies": {
  }
  }
  
```
  
this is the initial setting for any nodeJS project. We will have to install few additional capabilities for this porject.

1. express framework 

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

##Installation

```
npm install express --save

```
Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.
Please refer https://github.com/expressjs/body-parser for further info on express framework.

2. body-parser 

The nodeJS body-parser middleware basically parses JSON.

##Installation

```
npm install body-parser --save

```

please refer https://www.npmjs.com/package/body-parser-json for further info.

3. method-override

Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

##Installation

```
npm install mehtod-override --save

```

Please refer https://github.com/expressjs/method-override for further info on body-parser

4. mongoose

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.

##Installation

```

npm install mongoose --save

```

Please refer https://github.com/Automattic/mongoose for further info on mongoose.

5. morgan

HTTP request logger middleware for node.js

##Installation

```

npm install morgan --save

```

Please refer https://github.com/expressjs/morgan for details about morgan.

Please **note** that **--save** option saves the details about the framework/middleware versions we are installing, in the package.json file under **dependencies** block.

At this stage the package.json files looks something like this,

```

{
  "name": "studentdb",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Akshata",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.4",
    "body-parser"    : "^1.4.3",
    "method-override": "^2.1.3",
    "mongoose"       : "^4.4.12",
    "morgan"         : "^1.1.1"
  }
}

```

## NOTE 
The benifit of **--save** option i.e saving all dependencies is that, if you want to copy your project to a new path then you do not have to copy all the files related to the dependencies. You just copy the package.json file to new path and run **npm init** followed by **npm install**, all those dependencies will be installed automatically.

## Step 2 : Node Configuration

In our package.json file, we told it that our main file would be server.js. This is the main file for our Node app and where we will configure the entire application.

This is the file where we will:

- Configure our application
- Connect to our database
- Create our Mongoose models
- Set the app to listen on a port so we can view it in our browser

the server.js file should look something like this at this point of time.

```

/**
 * Created by arkulkar on 4/20/2016.
 */
    // server.js
    
var mongoose = require('mongoose');                                 // mongoose for mongodb
var express = require('express');
var app = express();
var morgan = require('morgan');                                     // log requests to the console (express4)
var bodyParser = require('body-parser');                            // pull information from HTML POST (express4)
var methodOverride = require('method-override');                    // simulate DELETE and PUT (express4)

mongoose.connect('mongodb://localhost:27017/studentDb');            // connect to mongoDB database on your system

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


app.listen(3000);
console.log('listening on port 3000');

```
Just with that bit of code, we now have an HTTP server courtesy of Node. We have also created an app with Express and now have access to many benefits of it. In our app.configure section, we are using express modules to add more functionality to our application.
we will updating the file as we will start with the actual coding.

## Step 3 : Creating student and college schema

Creating schema in mongoDB is equivalent to cretaing database tables. In mongoDB we call them as schemas.
Please refer to **server/student/schema/student.shcema.js** and **server/college/schema/college.schema.js** files for schema design of student and college DBs.
One of the advantages of using mongoDB is that we can put validations on each indivasual fields/parameters of the schema so that only valid data is inserted into the DB.

## Step 4 : The Logic

When we talk about logic in a nodeJS project, we are talking about the controller part of it. In controller we write the data processing part of the code. In this example, we have written code to save, delete, update and display the data into the DB. Please refer to **server/student/controller/student.controller.js** and **server/college/controller/college.controller.js**.

## Step 5 : Route it

We are done with creating schema and writing logic to it, but till now nowhere we have specified when which logic should be used or rather called !! We know that its going to be http request and response, also when it comes to http its gonna be HTTP GET/POST/DELETE/PUT and so on.. but there should be some place in whole project where it should be specified on which of the HTTP call which of the logic is called. 

For this purpose we write the routing concept in nodeJS. Basically we will have to write route.js files for each of the modules of our project. In this example there are two modules, student module and college modules. So I have written student.route and college.route files.

Please refer to **server/student/route/student.route.js** and **server/college/route/college.route.js** for the same.

## Step 6 : Start the project

Before going forward with running the project, there is one last thing we need to do. While explaining about server.js we have seen that it is the main file of our application where we configure entire application. It also the point from where the program execution will begin when we run the application.

Now in order to make our application run i.e to access student and college DBs from client side, we obviously have to configure these into server.js files. Below lines will configure these into server.js file thus making these two DB schemas accessible.

```

var studentRoute = require('./server/student/route/student.route');
var collegeRoute = require('./server/college/route/college.route');

studentRoute(app);
collegeRoute(app);

```

at this point the whole server.js file should look something like this,

```

/**
 * Created by arkulkar on 4/20/2016.
 */
    // server.js
var mongoose = require('mongoose');                                 // mongoose for mongodb
var express = require('express');
var app = express();
var morgan = require('morgan');                                     // log requests to the console (express4)
var bodyParser = require('body-parser');                            // pull information from HTML POST (express4)
var methodOverride = require('method-override');                    // simulate DELETE and PUT (express4)
var studentRoute = require('./server/student/route/student.route');
var collegeRoute = require('./server/college/route/college.route');

mongoose.connect('mongodb://localhost:27017/studentDb');            // connect to mongoDB database on your system

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

studentRoute(app);
collegeRoute(app);

app.listen(3000);
console.log('listening on port 3000');

```

This is it.. now we can start the server and run our application.

```

node server  //from commandline terminal in your application path

```

Now send http requests to your application, for my application the app path is **localhost:3000/student** 

Thanks :)





  
