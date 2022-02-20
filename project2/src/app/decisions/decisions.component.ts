import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, forkJoin } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SharedService } from '../event-emitter.service';
import { Decisions } from '../models/decisions';
import { User } from '../models/user';
import { DecisionsService } from '../services/decisions.service';
import { FavoritesService } from '../services/favorites.service';


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
  };
  thisRound: Decisions[] = [];
  user: User = new User()
  toggle = true;
  status = 'Favorite';


  constructor(
    private router: Router, 
    private decisionsService: DecisionsService, 
    private http: HttpClient, 
    private favoriteService: FavoritesService,
    private sharedService: SharedService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    //check to see if user is logged in 
    this.http.get<User>(environment.serverURL + "user/current", { withCredentials: true }).subscribe({
      next: response => {
        if (response.group == null) { //if valid credentials, stay on page
          this.router.navigate([`user`]);
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

    }
    else {
      this.decisionsService.getRoundMovies(++this.newRound).subscribe({
        next: data => {
          this.thisRound = data
          console.log(this.thisRound);

          let results: Observable<Decisions>[] = [];
          for (let i = 0; i < this.thisRound.length; i++) {
            // console.log("getting to loop");
            console.log(this.thisRound[i].imdbId);

            results.push(this.decisionsService.getOneMovie(this.thisRound[i].imdbId))

            // this.decisionsService.getOneMovie(this.thisRound[i].imdbId)
            // .subscribe(
            //   data => {
            //     console.log(data);

            //     this.tenMovies[i] = data;
            //     console.log(this.tenMovies);


            //   }
            // )
          } forkJoin(results).subscribe({
            next: data => {
              console.log(data);
              console.log(results);
              
              this.tenMovies = data
              if (this.tenMovies.length == 10) {
                console.log(this.tenMovies);

                this.getIMDBTitles(this.tenMovies);
                this.makeDecision(this.tenMovies);
              }
              // this.tenMovies.push(data)

              console.log(this.tenMovies);

            }, error: () => {

            }, complete: () => {

            }


          })
        }, error: () => {

        }, complete: () => {
          console.log(this.tenMovies);
          // setTimeout(() => { 
          //   this.getIMDBTitles(this.tenMovies);
          //   this.makeDecision(this.tenMovies); }, 2000);
          // console.log(this.tenMovies);

        }
      })
    }

    // else {
    //   this.decisionsService.getRoundMovies(++this.newRound).subscribe({
    //     next: data => {
    //       console.log(data);
    //       this.thisRound = data


    //     }, error: () => {

    //     }, complete: () => {
    //       let results: Observable<any>[] = [];
    //       for (let i = 0; i < this.thisRound.length; i++) {
    //         // console.log("getting to loop");
    //         results.push(this.decisionsService.getOneMovie(this.thisRound[i].imdbId))
    //       }
    //       console.log(results);

    // forkJoin([results]).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.tenMovies = data
    //     // this.tenMovies.push(data)

    //     console.log(this.tenMovies);

    //   }, error: () => {

    //   }, complete: () => {
    //     this.getIMDBTitles(this.tenMovies);
    //     this.makeDecision(this.tenMovies);
    //   }


    // })

    //     }
    //   })
    // }





    // Hide get movies button after clicked
    // let getMoviesBtn:any = document.getElementById("getMoviesBtn");
    // getMoviesBtn.hidden=false;

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


    for (let i = this.tenMovies.length - 1; i >= 0; i--) {
      let movie = new Decisions({
        imdbId: this.tenMovies[i].id,
        roundId: this.newRound
      })
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
    console.log("getting to function");
    console.log(Ids);


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
        console.log("button works");
        
        this.decisions = new Decisions({
          id: 0,
          roundId: this.newRound,
          imdbId: this.tenMovies[0].id,
          title: this.tenMovies[0].title,
          choice: false,
          // userId: 0
        }) //create new decisions object when deciding for each movie
          
        

        this.decisions.choice = true
        // Empties one movie array to make it easier to just append the first index of this array each time in html
        this.oneMovieArray = [];

        // takes first index in tenmovies array, takes it out of the array and returns it
        let oneMovie = this.tenMovies.shift();
        if (this.tenMovies.length == 0) {
          this.visible = false
          this.decisionsService.getWinner().subscribe(data => {
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
        console.log("button works");

        this.decisions = new Decisions({
          id: 0,
          roundId: this.newRound,
          imdbId: this.tenMovies[0].id,
          title: this.tenMovies[0].title,
          choice: false,
          // userId: 0
        }) //create new decisions object when deciding for each movie
        this.decisions.choice = false
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
  isLiked(Movie: any) {
    for (var i = this.likedArray.length - 1; i = 0; i++) {
      if (this.likedArray[i] == this.tenMovies.shift()) {
        console.log(this.likedArray);
        console.log(this.tenMovies.shift());
        return true;
      } else {
        console.log("returned false");

        return false;
      }
    }return true;
  }
  addLiked() {
    this.decisionsService.postLiked(this.decisions).subscribe({
      next: () => {
        console.log("added like to db");
        console.log(this.decisions);
      },
      error: () => { console.log("something went wrong"); }
    });
  }

  getWinner(){
    this.decisionsService.getWinner().subscribe(data => {
      console.log("Got from service")
      console.log(data);
      
      if (data == "No winner yet!") {
        alert("No winner yet! Check back soon!")
      }
      this.decisionsService.getOneMovie(data).subscribe(data => {
        console.log("in get one movie")
        console.log(data)
        this.tenMovies = []
        this.tenMovies.push(data)
        console.log(this.tenMovies[0])
        console.log(data);

      })

    })
  }

  addFav(){
    this.favoriteService.postFavs(this.tenMovies[0].title).subscribe({
      next:(response)=>{
        this.cookieService.set("upNext_user", JSON.stringify(response.body));
        this.user = JSON.parse(this.cookieService.get("upNext_user"));
        this.sharedService.sendClickEvent();
        console.log(this.tenMovies[0])
        this.toggle = !this.toggle;
        this.status = this.toggle ? 'Favorite' : 'Favorited';

      }
    });
  }
}
