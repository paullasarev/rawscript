var pkginfo = require('./package.json');

var info = {
  title: pkginfo.name,
  description: pkginfo.description,
  version: pkginfo.version,
};
//babel-node node_modules/swagger-jsdoc/bin/
module.exports = {
  // info: {
  //   // API informations (required)
  //   title: 'Hello World', // Title (required)
  //   version: '1.0.0', // Version (required)
  //   description: 'A sample API', // Description (optional)
  // },
  info,
  //host, // Host (optional)
  basePath: '/', // Base path (optional)
  apis: ['src/**/*.js'],
};
