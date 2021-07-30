import { Component, OnInit } from '@angular/core';
import { Trending } from '../trending';
import {DataService} from '../data.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-trending-carousel',
  templateUrl: './trending-carousel.component.html',
  styleUrls: ['./trending-carousel.component.css']
})
export class TrendingCarouselComponent implements OnInit {
  trendingM:Trending[]=[];
  trendingImages:any[]=[];
  sixImages:string[]=[]
  type:string="movie";
  sixIds:any[]=[];
  ids:any[]=[];
  names:any[]=[];
  sixNames:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService,private observer:BreakpointObserver) { }

  ngOnInit() {
    this.dataService.getTrending().subscribe((data:Trending[])=>{
      this.trendingM=data;
      for(var i =0;i<this.trendingM.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixIds.push(data[i].id);
        this.sixNames.push(data[i].name)
        if(this.sixImages.length==6){
          this.trendingImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixIds)
          this.sixIds=[];
          this.names.push(this.sixNames)
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.trendingImages.push(this.sixImages);
        this.ids.push(this.sixIds);
        this.names.push(this.sixNames)
      }
    })
  }

}
