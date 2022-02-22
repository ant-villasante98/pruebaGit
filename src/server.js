const express = require('express');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config');


var app = express();
app.set('port', (process.env.PORT || 3500));
app.use(express.urlencoded({extended: true}))
app.use(express.static('./'));

const wpc = webpack(webpackConfig());
    
app.use(webpackDevMiddleware(wpc));


app.get('/',(req, res, next) => {
    res.send('hola');
    next()
})
app.use((req, res, next, err) => {
    console.error(err)
    
})
 
app.listen(app.get('port'), () => {
    console.log('Servidor en linea')
    console.log('ESCUCHANDO POR EL PUERTO:',app.get('port'))
})