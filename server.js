const dotenv=require('dotenv');
dotenv.config({path:'./config.env'}); //This should be above app variable

const app = require('./10.Creating_Route_Modules');
console.log(app.get('env'));
console.log(process.env);

const port = process.env.PORT ;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
