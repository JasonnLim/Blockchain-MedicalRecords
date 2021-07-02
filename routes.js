const routes = require('next-routes')();

//Generate URL of individual campaigns page and create new campaign page
routes
    .add('/record/:address','/details');

module.exports = routes;
