import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecisionsService } from '../services/decisions.service';


@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.css']
})
export class DecisionsComponent implements OnInit {

  movieImg: string = "";
  movieTitle: string = "";
  movieId: string = "";
  imdbRating: string = "";
  movieArray: any = []; // randomize which indices from response we receive 
  items: any;
  tenMovies: any;
  movieTitleArray: any;
<<<<<<< HEAD
  oneMovieArray: any=[];
  favoritesArray: any=[];
  url:string = "https://imdb-api.com/en/API/Top250Movies/k_06em724z/";
=======
  likedArray: any = [];
  dislikedArray: any =[];
  favoritesArray: any = [];
  oneMovieArray: any = [];
  url: string = "https://imdb-api.com/en/API/Top250Movies/k_06em724z/";
>>>>>>> main



  constructor(private decisionsService: DecisionsService, private http: HttpClient) { }

  ngOnInit(): void {

  }


  // populate with array of ten movie objects from Response body of API call to imdbapi 
  getMovies(movieArray: any[]) {
    this.movieArray = movieArray;
<<<<<<< HEAD
    
    this.http.get(this.url).subscribe(data=>{
    this.movieArray = data;
    this.items = this.movieArray["items"] // returns items key in movieArray object
    this.randomizeList(this.items)
=======

    this.http.get(this.url).subscribe(data => {
      this.movieArray = data;

      this.items = this.movieArray["items"] // returns items key in movieArray object

      //console.log(items)
      this.randomizeList(this.items)
>>>>>>> main
    })
  }

  //create a randomized list of 10 movies
  randomizeList(film: any) {
    for (var i = film.length - 1; i > 0; i--) {  //loop through each movie

      var j = Math.floor(Math.random() * (i + 1)); //element from array is chosen
      var temp = film[i];  //element is picked
      film[i] = film[j];   //current element is swapped with random
      film[j] = temp;      //new element is picked
<<<<<<< HEAD
    }
    this.tenMovies = film.slice(0, 10); //reduce randomized list to 10 movies
    console.log(this.tenMovies)
    this.getIMDBIds(this.tenMovies);
=======


    }
    this.tenMovies = film.slice(0, 10); //reduce randomized list to 10 movies
    console.log(this.tenMovies);
    this.getIMDBTitles(this.tenMovies);
>>>>>>> main
    this.getOneMovie(this.tenMovies);
    // this.addToFavorites(this.tenMovies);
  }


<<<<<<< HEAD
  getIMDBIds(Ids:any){
    this.movieTitleArray = new Array(); //create an array to store just IDs
   for (var i = 0; i < 10; i++){ //loop through 10 movies
    var movieTitles = this.tenMovies[i].title
   
    let list = this.movieTitleArray.push(movieTitles);
   }
   //console.log(this.movieTitleArray)
 }
  
 getOneMovie(Movie:any){
  this.oneMovieArray = new Array();
    if(this.tenMovies.length>0){
      let likeBtn:any = document.getElementById("likeBtn");
      let dislikeBtn: any = document.getElementById("dislikeBtn");
      
      likeBtn.addEventListener("click", ()=>{ 
        this.oneMovieArray = []
        let oneMovie = this.tenMovies.shift();  
        console.log(oneMovie);
        let nextMovie = this.oneMovieArray.push(oneMovie);
          
      })
      dislikeBtn.addEventListener("click", ()=>{
          
        this.oneMovieArray = []
        let oneMovie = this.tenMovies.shift();
      
        //console.log(oneMovie);
        let nextMovie = this.oneMovieArray.push(oneMovie);
        
      })
    }
  }


 addToFavorites(Movie:any){
  this.favoritesArray = new Array();
  if(this.tenMovies.length>0){
    let favBtn: any = document.getElementById("favBtn");
    favBtn.addEventListener("click", () =>{
    
    this.favoritesArray = [];
    let currentMovie = this.oneMovieArray[0].title;
    let favoriteMovie = this.favoritesArray.push(currentMovie);
    console.log(favoriteMovie);
    
    })
  } 
  }
}
=======
  getIMDBTitles(Ids: any) {
    this.movieTitleArray = new Array(); //create an array to store just IDs
    for (var i = 0; i < 10; i++) { //loop through 10 movies
      var movieTitles = this.tenMovies[i].title
      //grab the id and push to array
      let list = this.movieTitleArray.push(movieTitles);
    }
    console.log(this.movieTitleArray)
  }

  getOneMovie(Movie: any) {
    this.likedArray = new Array();
    if (this.tenMovies.length > 0) {
      let likeBtn: any = document.getElementById("likeBtn");
      let dislikeBtn: any = document.getElementById("dislikeBtn");

      likeBtn.addEventListener("click", () => {

        // this.likedArray = []
        let oneMovie = this.tenMovies.shift();

        console.log(oneMovie);

        let nextMovie = this.likedArray.push(oneMovie);
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        // console.log(nextMovie);
        
        console.log(this.likedArray);
        console.log(this.tenMovies);
        

      })
      dislikeBtn.addEventListener("click", () => {

        // this.dislikedArray = []
        let oneMovie = this.tenMovies.shift();

        console.log(oneMovie);
        let nextMovie = this.dislikedArray.push(oneMovie);
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        console.log(this.dislikedArray);
        console.log(this.tenMovies)




      })
    }
  }


  //  addToFavorites(Movie:any){
  //   this.favoritesArray = new Array();
  //   if(this.tenMovies.length>0){
  //     let favBtn: any = document.getElementById("favBtn");
  //   favBtn.addEventListener("click", () =>{

  //     this.favoritesArray = [];
  //     let currentMovie = this.dislikedArray[0].title;
  //     let favoriteMovie = this.favoritesArray.push(currentMovie);
  //     console.log(favoriteMovie);

  //   })
  //   }

  // }
}










>>>>>>> main
