import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecisionsService } from '../services/decisions.service';


@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.css']
})
export class DecisionsComponent implements OnInit {

  url:string = "https://imdb-api.com/en/API/Top250Movies/k_19lmdqtz/";

  // randomize which indices from response we receive 

  movieArray: any = [];

  constructor(private decisionsService:DecisionsService, private http:HttpClient) { }

  ngOnInit(): void {
  }

 
// populate with array of ten movie objects from Response body of API call to imdbapi 
  getMovies(movieArray: any[]){
    this.movieArray = movieArray;

    this.http.get(this.url).subscribe(data=>{
      this.movieArray = data;

      var items: any = this.movieArray["items"] // returns items key in movieArray object
        this.randomizeList(items)
    })

  }

  //create a randomized list of 10 movies
 randomizeList(film:any) { 
   for (var i = film.length - 1; i > 0; i--) {  //loop through each movie
     
     //if(film.length < 10) try something like this
     var j = Math.floor(Math.random() * (i + 1)); //element from array is chosen
     var temp = film[i];  //element is picked
     film[i] = film[j];   //current element is swapped with random
     film[j] = temp;      //new element is picked
   }
   var tenMovies = film.slice(0, 10); //reduce randomized list to 10 movies
     console.log(tenMovies);

     for(var k= tenMovies.length -1; k>0; k--) {

      let likeBtn:any = document.getElementById("likeBtn");
        likeBtn.addEventListener("click", ()=>{
          console.log("button worked");
          console.log(tenMovies[k++].title);
          // let nextMovie = tenMovies[k++].shift()
          // console.log(nextMovie.title);
          
          // if(tenMovies.length >= 0){
            // let nextMovie:any=tenMovies["items"].shift();
            // console.log(nextMovie[k]);
            
            // console.log(JSON.stringify(nextMovie).concat(nextMovie));
          // }
        })
      }
  }
}
     


//  Grab next movie in tenmovies array and append info to modal.

//  nextMovie(film:any){
//   let likeBtn:any = document.getElementById("likeBtn");
//   likeBtn.addEventListener("click", ()=>{
//     // currentMovie.shift();
//     if(this.movieArray.items.length > 0){
//       // let currentMovie = [i];
//       let nextMovie:any=[tenMovies[i].shift()];
//       console.log(JSON.stringify(nextMovie).concat(nextMovie));
//     }
//  }


    
          
          
      //   })
        
      //   console.log(this.movieArray.items[12]);

      //   // return temp;
      

      
      
    

  


