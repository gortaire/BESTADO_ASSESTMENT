import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { NgForOf } from '@angular/common';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'App Razas de Perros (by Giorgio)';
  breeds:any = {};
  selectedBreed = null;

  constructor(private http: Http){
  }

  ngOnInit(): void {
    this.http
    .get('https://dog.ceo/api/breeds/list')
    .map(
      (res:Response) => res.json()
    )
    .subscribe(
      data => {
        console.log(data);
        this.breeds = data.message;
      }
    );
  }

  getBreedDetail(breed:string){
    return this.http
    .get('https://dog.ceo/api/breed/'+breed+'/images')
    .map((res:Response) => res.json())
    .subscribe(data => {
      console.log(data);
      this.selectedBreed = data.message;
    });
  }

  onSelect(breed:string){
    this.getBreedDetail(breed);
  }

}
