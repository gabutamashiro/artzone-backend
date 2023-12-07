module.exports = function ({ app, dbConn, upload }) {
  app.get('/api/search', (req, res) => {
    const searchTerm = `%${req.query.q}%`;
    if(req.query.q) {
      getPostsSql = `SELECT * FROM post WHERE post_description LIKE ? ORDER BY post_created_date DESC`;
      dbConn.query(getPostsSql, [searchTerm], function (error, posts) {
        if (posts) {
          res.status(200).jsonp(posts);
        } else {
          res.status(200).jsonp({ message: 'Cannot get your posts, please try again' });
        }
      });
    } else {
      getPostsSql = `SELECT * FROM post ORDER BY post_created_date DESC`;
      dbConn.query(getPostsSql, function (error, posts) {
        if (posts) {
          res.status(200).jsonp(posts);
        } else {
          res.status(200).jsonp({ message: 'Cannot get your posts, please try again' });
        }
      });
    }
    
  });
}