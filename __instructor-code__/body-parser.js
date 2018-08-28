// Hide student JSON errors from the console by using this custom version of body-parser.

module.exports = {
  json() {
    return (req, res, next) => {
      // From: https://stackoverflow.com/a/34915723/135101
      var data = "";
      req.on('data', function(chunk){ data += chunk})
      req.on('end', function(){
        try {
          req.body = JSON.parse(data);
        } catch (error) {
          res.status(400).send('Invalid JSON; clean it up');
          return;
        }
        next();
      })
    }
  }
}
