import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  url:string = "https://imdb-api.com/en/API/SearchMovie/k_muze8ch7/inception";
  movies: any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    console.log("alkdf");
    this.http.get(this.url).subscribe(data=>{
      console.log(data);
      
      this.movies = data as any;
      
    });
    console.log(this.movies);
  }

}
