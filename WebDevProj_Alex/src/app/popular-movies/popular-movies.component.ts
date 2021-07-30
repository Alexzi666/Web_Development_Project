import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Popular } from '../popular';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css'],

})
export class PopularMoviesComponent implements OnInit {
  popularM:Popular[]=[];
  poImages:any[]=[];
  sixImages:string[]=[];
  ids: any[]=[];
  sixId:string[]=[];
  type:string='movie';
  names:any[]=[];
  sixNames:string[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');

  constructor(private dataService:DataService,private observer: BreakpointObserver) { }

  ngOnInit(){
    this.dataService.getPopulars().subscribe((data:Popular[])=>{
      this.popularM=data;
      for(var i =0;i<this.popularM.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixId.push(data[i].id)
        this.sixNames.push(data[i].name)
        if(this.sixImages.length==6){
          this.poImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixId)
          this.sixId=[];
          this.names.push(this.sixNames)
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.poImages.push(this.sixImages);
        this.ids.push(this.sixId)
        this.names.push(this.sixNames)
      }
    })
    
    
  }
  

}
