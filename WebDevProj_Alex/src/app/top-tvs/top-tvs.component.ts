import { Component, OnInit } from '@angular/core';
import {topRated} from '../top';
import { DataService} from '../data.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-top-tvs',
  templateUrl: './top-tvs.component.html',
  styleUrls: ['./top-tvs.component.css']
})
export class TopTvsComponent implements OnInit {
  topT:topRated[]=[];
  topTImages:any[]=[];
  sixImages:string[]=[];
  type:string='tv';
  ids:any[]=[];
  sixIds:any[]=[];
  names:any[]=[];
  sixNames:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService,private observer:BreakpointObserver) { }

  ngOnInit(){
    this.dataService.getTopRatedTvs().subscribe((data:topRated[])=>{
      this.topT=data;
      for(var i =0;i<this.topT.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixIds.push(data[i].id);
        this.sixNames.push(data[i].name);
        if(this.sixImages.length==6){
          this.topTImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixIds)
          this.sixIds=[];
          this.names.push(this.sixNames)
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.topTImages.push(this.sixImages);
        this.ids.push(this.sixIds);
        this.names.push(this.sixNames)
      }
    })
  }

}
