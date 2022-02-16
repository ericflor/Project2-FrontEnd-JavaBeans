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
  movieArray: any = []; // randomize which indices from response we receive 
  items: any;
  tenMovies: any;
  movieTitleArray: any;
  likedArray: any = [];
  dislikedArray: any =[];
  favoritesArray: any = [];
  oneMovieArray: any = [];
  url: string = "https://imdb-api.com/en/API/Top250Movies/k_06em724z/";



  constructor(private decisionsService: DecisionsService, private http: HttpClient) { }

  ngOnInit(): void {

  }


  // populate with array of ten movie objects from Response body of API call to imdbapi 
  getMovies(movieArray: any[]) {
    this.movieArray = movieArray;

    this.http.get(this.url).subscribe(data => {
      this.movieArray = data;

      this.items = this.movieArray["items"] // returns items key in movieArray object

      //console.log(items)
      this.randomizeList(this.items)
    })
  }

  //create a randomized list of 10 movies
  randomizeList(film: any) {
    for (var i = film.length - 1; i > 0; i--) {  //loop through each movie

      var j = Math.floor(Math.random() * (i + 1)); //element from array is chosen
      var temp = film[i];  //element is picked
      film[i] = film[j];   //current element is swapped with random
      film[j] = temp;      //new element is picked


    }
    this.tenMovies = film.slice(0, 10); //reduce randomized list to 10 movies
    console.log(this.tenMovies);
    this.getIMDBTitles(this.tenMovies);
    this.makeDecision(this.tenMovies);
    // this.addToFavorites(this.tenMovies);
  }


  getIMDBTitles(Ids: any) {
    this.movieTitleArray = new Array(); //create an array to store just IDs
    for (var i = 0; i < 10; i++) { //loop through 10 movies
      var movieTitles = this.tenMovies[i].title
      //grab the title and push to array
      let list = this.movieTitleArray.push(movieTitles);
    }
    console.log(this.movieTitleArray)
  }

  makeDecision(Movie: any) {
    this.likedArray = new Array();
    if (this.tenMovies.length > 0) {
      let likeBtn: any = document.getElementById("likeBtn");
      let dislikeBtn: any = document.getElementById("dislikeBtn");

      likeBtn.addEventListener("click", () => {

        // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();

        console.log(oneMovie);

        // grab that movie in the first index that was shifted out and put it into a liked movies array to hold it
        let nextMovie = this.likedArray.push(oneMovie);

        // Takes the shifted movie and puts it into a seperate array we call in the html to append it to the page.
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        console.log(this.oneMovieArray);

        // console.log(nextMovie);
        
        console.log(this.likedArray);
        console.log(this.tenMovies);
        
        return true;
      })
      dislikeBtn.addEventListener("click", () => {

         // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();

        console.log(oneMovie);

         // grab that movie in the first index that was shifted out and put it into a disliked movies array to hold it
        let nextMovie = this.dislikedArray.push(oneMovie);

        // Takes the shifted movie and puts it into a seperate array we call in the html to append it to the page.
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        console.log(this.oneMovieArray);
        
        console.log(this.dislikedArray);
        console.log(this.tenMovies)

        return false;


      })
    }
  }

  addLiked(){
    this.decisionsService.postLiked(this.likedArray).subscribe({
      next:()=>{
        console.log("added liked movies");
        console.log(this.likedArray);
        
      },
      error: () =>{console.log("something went wrong recording your liked movies.");
      }
    })
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










