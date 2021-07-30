import { Component, OnInit } from '@angular/core';
import { convertToParamMap } from '@angular/router';
import { DataService} from '../data.service';
import {topRated} from '../top'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {
  topRatedM:topRated[]=[];
  topImages:any[]=[];
  sixImages:string[]=[]
  ids:any[]=[];
  names:any[]=[]
  sixIds:any[]=[];
  sixNames:any[]=[]
  type:string="movie";
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService, private observer:BreakpointObserver) { }

  ngOnInit() {
    this.dataService.getTops().subscribe((data:topRated[])=>{
      this.topRatedM=data;
      for(var i =0;i<this.topRatedM.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixIds.push(data[i].id);
        this.sixNames.push(data[i].name);
        if(this.sixImages.length==6){
          this.topImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixIds)
          this.sixIds=[];
          this.names.push(this.sixNames)
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.topImages.push(this.sixImages);
        this.ids.push(this.sixIds);
        this.names.push(this.sixNames);
      }
    })
    
  }
  

}
