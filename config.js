const path = require('path');
require('dotenv')
    .config(
path.resolve(__dirname,'development.env')
    );


const config ={
    NODE_ENV : process.env.NODE_ENV ||'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3400
    
}
module.exports = config