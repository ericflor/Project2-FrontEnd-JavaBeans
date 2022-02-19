import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Decisions } from '../models/decisions';
import { User } from '../models/user';
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
 // poster: any = "./imgs/project2-user-flow.jpg";
  movieTitleArray: any;
  likedArray: any = [];
  dislikedArray: any = [];
  favoritesArray: any = [];
  oneMovieArray: any = [];
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
  user: User = new User()

  constructor(private router: Router, private decisionsService: DecisionsService, private http: HttpClient) { }

  ngOnInit(): void {
<<<<<<< HEAD

    this.http.get<User>(environment.serverURL + "user/current", { withCredentials: true }).subscribe({
      next: response => {
        if (response.group == null) {
          this.router.navigate([`user`]);
=======
    //check to see if user is logged in 
    this.http.get<User>(environment.serverURL + "user/current", {withCredentials: true}).subscribe({
      next: response=>{
        if(response.group==null){ //if valid credentials, stay on page
          this.router.navigate([`user`]); 
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56
        }
        this.user = response
      },
      error: () => {
        console.log("here")
        this.router.navigate([`login`]); //if invalid login credentials, redirect to login page
      }
    })

  }

  // populate with array of ten movie objects from Response body of API call to imdbapi 
  getMovies(movieArray: any[]) {
    this.visible = true   //make button disappear when clicked
    // this.decisionBtn = false
    this.movieArray = movieArray;
    // this.http.get(this.url).subscribe(data => {
    if (this.user.roleId == 2) {
      this.decisionsService.getMovies().subscribe(data => {
        this.movieArray = data;
        this.decisions.roundId = this.newRound++ //increment round everytime new list is called

        this.items = this.movieArray["items"] // returns items key in movieArray object
        this.randomizeList(this.items);
      }
      )
    } else {
      this.decisionsService.getRoundMovies(this.newRound++).subscribe(data => {

        for (let i = 0; i > data.length; i++) {
          this.decisionsService.getOneMovie(data[i]).subscribe(data => {
            this.movieArray.push(data)
          })
        }
<<<<<<< HEAD
      })
    }


    // Hide get movies button after clicked
    let getMoviesBtn: any = document.getElementById("getMoviesBtn");
    getMoviesBtn.hidden = false;

=======
          )}else{
            this.decisionsService.getRoundMovies(this.newRound++).subscribe(data =>{
              
              for(let i=0; i>data.length; i++){
                this.decisionsService.getOneMovie(data[i]).subscribe(data =>{
                  this.tenMovies.push(data)
                })
              }
              this.getIMDBTitles(this.tenMovies);
              this.makeDecision(this.tenMovies);
            })
          }
    

      // Hide get movies button after clicked
      // let getMoviesBtn:any = document.getElementById("getMoviesBtn");
      // getMoviesBtn.hidden=false;
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56

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


    for (i = this.tenMovies.length - 1; i > 0; i--) {
      let movie = new Decisions({ imdbId: this.tenMovies[i].id })
      this.decisionsService.postLiked(movie).subscribe({
        next: () => {
          console.log(movie);
          // console.log(this.decisions);


        },
        error: () => { console.log("something went wrong"); }
      });
    }
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

<<<<<<< HEAD
        this.decisions = { //create new decisions object when deciding for each movie
          id: 1,
          roundId: this.newRound,
          imdbId: this.tenMovies[0].id,
          title: this.tenMovies[0].title,
          choice: false,
          userId: 0
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


=======
       this.decisions = { //create new decisions object when deciding for each movie
        id: 1,
        roundId: this.newRound,
        imdbId: this.tenMovies[0].id,
        title: this.tenMovies[0].title,
        choice: false,
        userId:0
       }
     
        this.decisions.choice = true        
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56
        // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();
        if (this.tenMovies.length == 0) {
          this.visible = false
          this.decisionsService.getWinner(this.decisions.roundId).subscribe(data => {
            if (data == "No winner yet!") {
              alert("No winner yet! Check back soon!")
            }
            this.decisionsService.getOneMovie(data).subscribe(data => {
               this.tenMovies[0] = data 
             })

          })
          //this.decisionBtn = true
        }
        // grab that movie in the first index that was shifted out and put it into a liked movies array to hold it
        let nextMovie = this.likedArray.push(oneMovie);

        // Takes the shifted movie and puts it into a seperate array we call in the html to append it to the page.
        let appendedMovie = this.oneMovieArray.push(oneMovie);
        console.log(this.decisions)
        this.addLiked()
      })
      dislikeBtn.addEventListener("click", () => {
        this.decisions = {
          id: 1,
          roundId: this.newRound,
          imdbId: this.tenMovies[0].id,
          title: this.tenMovies[0].title,
          choice: false,
          userId: 0
        }
        this.decisions.choice = false
<<<<<<< HEAD
        this.decisionsService.postLiked(this.decisions)
        // Empties one movie array to make it easier to just append the first index of this array each time in html
=======
         // Empties one movie array to make it easier to just append the first index of this array each time in html
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();
        if (this.tenMovies.length == 0) {
<<<<<<< HEAD
          this.visible = false
=======
           
           this.visible = false
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56
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
<<<<<<< HEAD
  addLiked() {
    this.decisionsService.postLiked(this.decisions).subscribe({
      next: () => {
        console.log("added like to db");
        console.log(this.decisions);


      },
      error: () => { console.log("something went wrong"); }
    });
  }
=======
addLiked(){
  this.decisionsService.postLiked(this.decisions).subscribe({
    next:()=>{
      console.log("added like to db");
      console.log(this.decisions);    
    },
    error:()=>{console.log("something went wrong");}
  });
}
>>>>>>> 132c3e35f97f8fc7318fe9a43e3fbc739f955e56
}