var marked = require('marked');
var fs = require('fs');

// Load index page
var indexPage = fs.readFileSync('README.md', 'utf8');

module.exports = {
  // Converts the README to HTML and serves it
  serveIndex: function serveIndex (req, res, next) {
    var body = marked(indexPage);
    body = '<head><link rel=\"stylesheet\" type=\"text/css\" ' +
    'href=\"http://jasonm23.github.io/markdown-css-themes/swiss.css\"></head>' +
    '<body>' + body + '</body>';
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'text/html'
    });
    res.write(body);
    res.end();
  }
};
