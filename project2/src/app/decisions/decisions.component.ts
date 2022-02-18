import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Decisions } from '../models/decisions';
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
  likedArray: any = [];
  dislikedArray: any =[];
  favoritesArray: any = [];
  oneMovieArray: any = [];
  url: string = "https://imdb-api.com/en/API/Top250Movies/k_06em724z/";
  // decisionBtn: boolean = true;
  visible: boolean = false;
  newRound: number = 0;
  decisions: Decisions = {
    id: 0,
    roundId: this.newRound,
    imdbId: "",
    title: "",
    choice: false,
    userId: 0
  }

  constructor(private decisionsService: DecisionsService, private http: HttpClient) { }

  ngOnInit(): void {
  }


  // populate with array of ten movie objects from Response body of API call to imdbapi 
  getMovies(movieArray: any[]) {
    this.visible = true   //make button disappear when clicked
    // this.decisionBtn = false
    this.movieArray = movieArray;
      // this.http.get(this.url).subscribe(data => {
      this.decisionsService.getMovies().subscribe(data => {
      this.movieArray = data;
      this.decisions.roundId = this.newRound++ //increment round everytime new list is called

      this.items = this.movieArray["items"] // returns items key in movieArray object
      this.randomizeList(this.items)

      // Hide get movies button after clicked
      let getMoviesBtn:any = document.getElementById("getMoviesBtn");
      getMoviesBtn.hidden=false;

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
  
    this.getIMDBTitles(this.tenMovies);
    this.makeDecision(this.tenMovies);
  }


  getIMDBTitles(Ids: any) {
    this.movieTitleArray = new Array(); //create an array to store just IDs
    for (var i = 0; i < 10; i++) { //loop through 10 movies
      let movieTitles = this.tenMovies[i].title
      
      //grab the title and push to array
      let list = this.movieTitleArray.push(movieTitles);
    }
  }

  makeDecision(Movie: any) {
    this.likedArray = new Array();
    if (this.tenMovies.length > 0) { //if movies are available, enable buttons for decisions
      let likeBtn: any = document.getElementById("likeBtn");
      let dislikeBtn: any = document.getElementById("dislikeBtn");
      
      likeBtn.addEventListener("click", () => {

       this.decisions = { //create new decisions object when deciding for each movie
        id: 1,
        roundId: this.newRound,
        imdbId: this.tenMovies[0].id,
        title: this.tenMovies[0].title,
        choice: false,
        userId:0
       }
      // postLiked() {
      //   let decisions = new Decisions(0, 0,"","",true, 0)
      //   this.postLiked(decisions).subscribe(
      //     (response: Decisions) => {
      //       this.decisions = response;
      //     }
      //   )
      // }
        this.decisions.choice = true
        // this.decisionsService.postLiked(this.decisions).subscribe({
        //   next:()=>{
        //     console.log("added like to db");
        //     console.log(this.decisions);
            
            
        //   },
        //   error:()=>{console.log("something went wrong");}
        // });

        
        // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();
        if (this.tenMovies.length == 0) {
          this.visible = false
          //this.decisionBtn = true
        }
        // grab that movie in the first index that was shifted out and put it into a liked movies array to hold it
        let nextMovie = this.likedArray.push(oneMovie);
       
        // Takes the shifted movie and puts it into a seperate array we call in the html to append it to the page.
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        console.log(this.decisions)
        // return true;
        this.addLiked()
      })
      dislikeBtn.addEventListener("click", () => {
         this.decisions = {
        id: 1,
        roundId: this.newRound,
        imdbId: this.tenMovies[0].id,
        title: this.tenMovies[0].title,
        choice: false,
        userId:0
      }
        this.decisions.choice = false
        this.decisionsService.postLiked(this.decisions)
         // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();
         if (this.tenMovies.length == 0) {
           this.visible = false
          //this.decisionBtn = true
        }
         // grab that movie in the first index that was shifted out and put it into a disliked movies array to hold it
        let nextMovie = this.dislikedArray.push(oneMovie);

        // Takes the shifted movie and puts it into a seperate array we call in the html to append it to the page.
        let appendedMovie = this.oneMovieArray.push(oneMovie);

        console.log(this.decisions)
        // return false;
        this.addLiked()

      })
    }
  }
addLiked(){
  this.decisionsService.postLiked(this.decisions).subscribe({
    next:()=>{
      console.log("added like to db");
      console.log(this.decisions);
      
      
    },
    error:()=>{console.log("something went wrong");}
  });
}
}