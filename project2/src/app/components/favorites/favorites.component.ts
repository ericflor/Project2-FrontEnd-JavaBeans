import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  url:string = "https://imdb-api.com/en/API/SearchMovie/k_muze8ch7/";
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


}
