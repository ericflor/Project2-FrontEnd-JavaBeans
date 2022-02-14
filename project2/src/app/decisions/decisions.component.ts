import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecisionsService } from '../services/decisions.service';


@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.css']
})
export class DecisionsComponent implements OnInit {

  url:string = "https://imdb-api.com/en/API/Top250Movies/k_muze8ch7/";

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

      //console.log(items)
        this.randomizeList(items)
    })

  }

  //create a randomized list of 10 movies
 randomizeList(film:any) { 
   for (var i = film.length - 1; i > 0; i--) {  //loop through each movie
     
     var j = Math.floor(Math.random() * (i + 1)); //element from array is chosen
     var temp = film[i];  //element is picked
     film[i] = film[j];   //current element is swapped with random
     film[j] = temp;      //new element is picked
     //console.log(film[i].id);
     
   }
   var tenMovies = film.slice(0, 10); //reduce randomized list to 10 movies
   //console.log(tenMovies);

 var moiveIdArray = new Array(); //create an array to store just IDs
   for (var i = 0; i < 10; i++){ //loop through 10 movies
     var movieIds = tenMovies[i].id
     //grab the id and push to array
    var list = moiveIdArray.push(movieIds);
  
   }
   console.log(moiveIdArray)
 }
    
  
}
