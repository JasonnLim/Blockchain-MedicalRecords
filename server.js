const { createServer } = require('http');
const next = require('next');

//This is needed for Next-routes to work
//Next-routes is used to route user to specified URL's

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log('Ready on localhost:3000');
    });
});