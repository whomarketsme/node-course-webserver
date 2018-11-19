const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server.log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');

});

app.use(express.static(__dirname + '/public')) //static requires an absolute path

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get('/', (req, res) => {
//   //res.send('<h1>Hello Express!</h1>');
//   res.send({
//     name: 'Andrew',
//     likes: [
//       'Biking',
//       'Swimming',
//       'Cities',
//       'Becoming free'
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the test website built with express and hbs!',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
    //currentYear: new Date().getFullYear()
  });
});

// app.get('/maintenance', (req, res) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Mode'
//   });
// });

app.get('/bad', (req, res) => {
  res.send({Error: 'Page in development. Visit us on December 1 again.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
