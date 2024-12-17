const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'}); //This should be above app variable

const app = require('./10.Creating_Route_Modules');
console.log(app.get('env'));
console.log(process.env);

//for local connection
// mongoose.connect(process.env.LOCAL_CONN_STR, {
//     useNewUrlParser: true
// }).then((conn) => {
//     // console.log(conn);
//     console.log('DB connection successful!')
// }); 

// for cloud connection
mongoose.connect(process.env.CONN_STR, {  
    useNewUrlParser:true
}).then((conn) => {
    // console.log(conn);
    console.log('DB connection successful!')
}).catch((err) => {
    console.log(err);
    console.log('Error connecting to DB');
}); 

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Movie name is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration is required']
    },
    rating: {
        type: Number,
        default: 1.0
    }
});

const Movie = mongoose.model('movie', movieSchema);

const testMovies = new Movie({
    name: 'Avengers Endgame',
    description: 'A wonder full movie by Marvel',
    duration: 180,
    rating: 9.8
});

 testMovies.save()
 .then((doc) => {
    console.log(doc);
 })
 .catch((err) => {
    console.log("Error occured: "+err);
 });
 


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
