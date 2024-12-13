const { count } = require('console');
const express=require('express');
const fs = require('fs');
let app=express();


let movies = JSON.parse(fs.readFileSync('data/movies.json','utf-8'));

//Get -api/movies
app.get('/api/v1/movies',(req,res)=>{
    res.status(200).json({
        status:'success',
        count:movies.length,
        data:{
            movies:movies
        }
    });
});

//Handling get request with route parameter.
app.get('/api/v1/movies/:id/', (req, res) => { //:id is a route parameter and they are stored in form of string.
    const id = req.params.id * 1; //converting string to number
    let movie = movies.find(el => el.id === id);
    if (!movie) {
        return res.status(404).json({
            status: 'fail',
            message: 'Movies with id '+id+' not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            movie: movie
        }
    });
}); 

//Post -api/movies

//midleware :add data to the request object
app.use(express.json());


app.post('/api/v1/movies',(req,res)=>{
    const newId=movies[movies.length-1].id+1;
    const newMovies=Object.assign({id:newId},req.body);
    movies.push(newMovies);
    fs.writeFile('data/movies.json',JSON.stringify(movies),err=>{ //stringify is used to convert the object into string
        res.status(201).json({
            status:'success',
            data:{
                movies:newMovies
            }
        });
    });
}); 

const port=3000;
app.listen(port,()=>{
    console.log(`App running on port ${port}...`);
});
