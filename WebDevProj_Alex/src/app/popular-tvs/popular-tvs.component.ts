import { Component, OnInit } from '@angular/core';
import {Popular} from '../popular';
import { DataService} from '../data.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
@Component({
  selector: 'app-popular-tvs',
  templateUrl: './popular-tvs.component.html',
  styleUrls: ['./popular-tvs.component.css']
})
export class PopularTvsComponent implements OnInit {
  popularT:Popular[]=[];
  poTImages:any[]=[];
  sixImages:string[]=[];
  sixId:any[]=[];
  ids:any[]=[]
  names:any[]=[];
  sixNames:any[]=[];
  type:string='tv';
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService,private observer:BreakpointObserver) { }

  ngOnInit() {
    this.dataService.getPopularTvs().subscribe((data:Popular[])=>{
      this.popularT=data;
      for(var i =0;i<this.popularT.length;i++){
        this.sixImages.push(data[i].poster_path);
        this.sixId.push(data[i].id)
        this.sixNames.push(data[i].name)
        if(this.sixImages.length==6){
          this.poTImages.push(this.sixImages)
          this.sixImages=[];
          this.ids.push(this.sixId);
          this.sixId=[];
          this.names.push(this.sixNames);
          this.sixNames=[];
        }
      }
      if(this.sixImages.length>0){
        this.poTImages.push(this.sixImages);
        this.ids.push(this.sixId)
        this.names.push(this.sixNames)
      }
    })
  }

}
