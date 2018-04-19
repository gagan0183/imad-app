var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
  title: 'Article one',
  heading: 'Article one',
  date: 'Sep 9, 2016',
  content: `<p>
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.
  </p>
  <p>
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.
  </p>
  <p>
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.This is the content of article one.
    This is the content of article one.
  </p>`
};

var articleTwo = {
  title: 'Article two',
  heading: 'Article two',
  date: 'Sep 9, 2016',
  content: `<p>
      This is the content of article two.
    </p>
  `
};

var articleThree = {
  title: 'Article three',
  heading: 'Article three',
  date: 'Sep 9, 2016',
  content: `<p>
      This is the content of article three.
    </p>
  `
};

var articles = {
  'article-one': articleOne,
  'article-two': articleTwo,
  'article-three': articleThree
};

function createTemplate(data) {
  var title = data.title;
  var heading = data.heading;
  var date = data.date;
  var content = data.content;
  var htmltemplate = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width;initial-scale=1">
      <title>${title}</title>
      <link rel="stylesheet" href="/ui/style.css">
    </head>
    <body>
      <div class="container">
        <div>
          <a href="/">Home</a>
        </div>
        <hr>
        <h3>${heading}</h3>
        <div>
          ${date}
        </div>
        <div>
          ${content}
        </div>
      </div>
    </body>
  </html>
  `;
  return htmltemplate
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function(req, res) {
  counter = counter + 1;
  res.send(counter.toString());
})

app.get('/article/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

var ar = [];
app.get('/submit-btn/:name', function(req, res) {
  var name = req.params.name;
  ar.push(req.params.name);
  res.send(JSON.stringify(ar));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 8080;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
