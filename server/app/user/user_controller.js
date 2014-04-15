// ~> Controller
// ~A Scott Smereka

module.exports = function(app, db, config) {
  
  var fox    = require('foxjs'),
      sender = fox.send,
      auth   = fox.authentication,
      model  = fox.model,
      User   = db.model('User');                                     // Pull in the user schema


  /* ************************************************** *
   * ******************** Routes and Permissions
   * ************************************************** */

  app.get('/users.:format', users);                          // Get all users.
  app.get('/users/:userId.:format', user);                 // Get a specific user.

  // Load user roles used for authentication.
  var adminRole = auth.queryRoleByName("admin"),
      selfRole  = auth.queryRoleByName("self");


  app.io.route('users', {
    create: function(req) {
      console.log("Auth user: ");
      console.log(req.handshake.user);
      console.log("created user");

      req.io.emit('talk', { message: "success?!"});
    } 
  });


  app.io.route('hello', function(req) {
    console.log(req.session);
    console.log(req.data);
    console.log(req.handshake.user);
    req.io.emit('hello', { message: (req.handshake.user.logged_in === false) ? "You are not authenticated." : "WHY HELLO THERE AUTHENTICATED USER!!"});
  });


  /* ************************************************** *
   * ******************** Route Methods
   * ************************************************** */


  /* User
   * Get and return the user object specified by their Object ID,
   * name, or index.
   */
  function user(req, res, next) {
    User.findOne({_id:req.params.userId}).exec(function(err, user){
      if(err) return next(err);
      user = user.sanitize();
      sender.setResponse(user, req, res, next);
    })
  }

  /* Users
   * Get all the users and return them in the requested format.
   */
  function users(req, res, next) {
    User.find().sort('index').exec(function(err, userRoles) {    // Find all the user roles and sort them by their permission level.
      if(err) return next(err);

      for(index in userRoles){
        userRoles[index] = userRoles[index].sanitize();
      }

      sender.setResponse(userRoles, req, res, next);
    });
  }

};