// ~> Config
// ~A Scott Smereka

/*
 * Configure the server and initalize global variables available 
 * to all models and controllers.  Note that each of the settings 
 * defined will override its default setting.
 */


/* ************************************************** *
 * ******************** Modules & Variables
 * ************************************************** */

var path            = require('path'),
    serverDirectory = path.resolve(__dirname, "../"); // Path to the server directory.


/* ************************************************** *
 * ******************** Config Constructor
 * ************************************************** */

var Config = function() {
};

/* ************************************************** *
 * ******************** Config Object
 * ************************************************** */

Config.prototype.default = {
  
  // Access tokens are used for API calls made on behalf
  // of a user.  You can override the default behavior here.
  accessTokens: {
    tokenLifeInDays: 10                       // How long a token is valid before a new token must be requested.
  },

  // Create, read, update, and delete routes and methods can be automatically
  // generated for each schema model.  This allows you to configure how the 
  // routes behave, authentication, and other settings.
  crud: {
    enabled: true,                            // Enable or Disable creation of the CRUD methods and routes.
    auth: {                                   // Authentication for each module's routes can be controlled.
      routeRoleAuth: {                        // Role based authentication
        "user": {                             // User schema model specific settings.
          read: {                             // Getting a single user object settings.
            enabled: true,                    // Enable authentication
            method: ">=",                     // Allow roles with permissions equal to or greater than the roles specified.
            roles: [ "admin", "self" ],       // Allow roles admin and the user themselves to read the single user object.
          },
          update: {                           // Updating a single user object settings.
            enabled: true,                    // Enable authentication for updates.
            method: ">=",                     // Allow roles with permissions equal to or greater than the roles specified.
            roles: [ "admin", "self" ],       // Allow roles admin and the user themselves to update the single user object.
          }
        },
      }
    }
  },

  // Server application's root directory.
  dirname: serverDirectory + "/app/",

  // Absolute paths to files and folders.
  paths: {

    // Server application root directory.
    serverAppFolder: serverDirectory + "/app/",

    // Server configuration folder, where all the config files are stored.
    serverConfigFolder: serverDirectory + "/configs/",

    // Server node_modules folder, where all the dependencies are stored.
    serverNodeModulesFolder: path.resolve(__dirname, "../node_modules") + "/",

    // A static folder's content is made available in routes similar to browsing
    // the folder on your computer.  Everything in the static folders is made 
    // public to everyone.
    //
    // Entries are made available using the following pattern:   /:name/:folderName/:file
    //
    // Example:  /assets/css/styles.css
    // 
    //   staticFolders: {
    //     assets: {
    //       path: path.normalize('/assets/')
    //     }
    //   }
    //
    staticFolders: {},

  },

  // Routes determines the order in which models and controllers are required
  // and therefore executed.  All models and static routes are loaded 
  // automatically for you so you should not list them here.
  // An example routes value is: [ "controller", "error" ]
  // which loads all the controllers and finally an error handler.
  routes: [ 
    "crud-auth",          // Authentication for all CRUD routes.
    "crud-queries",       // Query for schema object(s) on CRUD routes.
    "crud-methods",       // Set response and perform CRUD methods on all CRUD routes.
    "controller",         // Load all non-static controllers.
    "response",           // Handle returning non-error respones to a requestor.
    "error"               // Lastly load error handler(s) to send errors and catch any unhandled requests.
  ]
}

/** 
 * Config properties in this object will be include when
 * the server is running in the local enviorment mode.
 * Properties in this object will override properties in 
 * the configuration object.
 */
Config.prototype.local = { 
  crud: {
    auth: {                              // Authentication for each module's routes can be controlled.
      enabled: false                     // Disable crud authentication.
    }
  }
};

Config.prototype.development = {
  // Mongo DB database connection information.
  /*mongodb: {
    enabled: true,                                    // Enable use of the mongo DB database.
    useAuthentication: true,                          // Enable authentication on the database.
    username: 'development',                          // If authentication is enabled, the username to authenticate.
    password: 'abc123',                               // If authentication is enabled, the password to authenticate.
    host: 'localhost',                                // Host ip address of the database.
    port: '27017',                                    // Host port for the database.
    database: 'awesome_dev_database'                  // Database name.
  } */
};

Config.prototype.production = {
  // Mongo DB database connection information.
  /*mongodb: {
    enabled: true,                                    // Enable use of the mongo DB database.
    useAuthentication: true,                          // Enable authentication on the database.
    username: 'production',                           // If authentication is enabled, the username to authenticate.
    password: 'abc123',                               // If authentication is enabled, the password to authenticate.
    host: 'localhost',                                // Host ip address of the database.
    port: '27017',                                    // Host port for the database.
    database: 'awesome_database'                      // Database name.
  } */
};

// Export the configuration object.
module.exports = Config;