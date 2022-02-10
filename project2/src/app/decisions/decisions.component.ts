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
      console.log(this.movieArray);
      
    })

  }

}
