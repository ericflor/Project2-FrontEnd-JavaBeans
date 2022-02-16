import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  url:string = "https://imdb-api.com/en/API/SearchMovie/k_06em724z/";
  movie: any;
  searchName: string = '';

  constructor(private favoriteService:FavoritesService, private http:HttpClient) { }

  ngOnInit(): void {
    
    
    
  }

  searchFavs(search:string){

    this.searchName = search;

    this.http.get(this.url + search).subscribe(data=>{
      
      this.movie = data as any;
      console.log(this.movie);
    });
  }

  addFav1(){
    
    this.favoriteService.postFavs(this.movie.results[0].title).subscribe({
      next:()=>{
        console.log("added a new fav!");
        console.log(this.movie.results[0].title);
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[0].title)}
    });
  }

  addFav2(){
    
    this.favoriteService.postFavs(this.movie.results[1].title).subscribe({
      next:()=>{
        console.log("added a new fav!");
        console.log(this.movie.results[1].title);
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[1].title)}
    });
  }

  addFav3(){
    
    this.favoriteService.postFavs(this.movie.results[2].title).subscribe({
      next:()=>{
        console.log("added a new fav!");
        console.log(this.movie.results[2].title);
        
      },
      error:()=>{console.log("something went wrong faving your movie: " + this.movie.results[2].title)}
    });
  }

}
