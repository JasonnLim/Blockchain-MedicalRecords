const routes = require('next-routes')();

//Route to specified page
routes
    .add('/record/:address','/details')
    .add('/doctor/:address','/details-doctor');

module.exports = routes;
