import { Component, OnInit } from '@angular/core';
import {Trending} from '../trending';
import { DataService} from '../data.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-trending-tvs',
  templateUrl: './trending-tvs.component.html',
  styleUrls: ['./trending-tvs.component.css']
})
export class TrendingTvsComponent implements OnInit {

  trendingT:Trending[]=[];
  trendingTImages:any[]=[];
  sixImages:string[]=[];
  type:string="tv";
  sixIds:any[]=[];
  ids:any[]=[];
  names:any[]=[];
  sixNames:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService, private observer:BreakpointObserver) { }

  ngOnInit() {
    this.dataService.getTrendingTvs().subscribe((data:Trending[])=>{
      this.trendingT=data;
      for(var i =0;i<this.trendingT.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixIds.push(data[i].id);
        this.sixNames.push(data[i].name)
        if(this.sixImages.length==6){
          this.trendingTImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixIds)
          this.sixIds=[];
          this.names.push(this.sixNames)
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.trendingTImages.push(this.sixImages);
        this.ids.push(this.sixIds);
        this.names.push(this.sixNames)
      }
    })
  }

}
