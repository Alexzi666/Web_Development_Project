import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';import {DataService} from '../data.service';
import {Trending} from '../trending';
import {Observable, OperatorFunction,} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css']
})
export class SimilarMoviesComponent implements OnInit {
  type:any;
  id:any;
  sixSimage:any[]=[];
  sImages:any[]=[];
  sData:Trending[]=[];
  isMovie?:boolean;
  names:any[]=[];
  ids:any[]=[];
  sixNames:any=[];
  sixIds:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:DataService,
    private observer: BreakpointObserver,
    
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
  }

  ngOnInit() {
    this.type=this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.type=='movie'){
      this.isMovie=true;
      this.service.getMsimilar(this.id).subscribe((data:Trending[])=>{
        this.sData=data;
        for(var i =0;i<data.length;i++){
          this.sixSimage.push(data[i].poster_path);
          this.sixNames.push(data[i].name);
          this.sixIds.push(data[i].id)
          if(this.sixSimage.length==6){
            this.sImages.push(this.sixSimage)
            this.sixSimage=[]
            this.names.push(this.sixNames)
            this.sixNames=[]
            this.ids.push(this.sixIds)
            this.sixIds=[];
          }
          
        }
        if(this.sixSimage.length>0){
          this.sImages.push(this.sixSimage)
          this.names.push(this.sixNames)
          this.ids.push(this.sixIds)
        }
        
      })
    }else{
      this.isMovie=false;
      this.service.getTsimilar(this.id).subscribe((data:Trending[])=>{
        this.sData=data;
        for(var i =0;i<data.length;i++){
          this.sixSimage.push(data[i].poster_path);
          this.sixNames.push(data[i].name)
          this.sixIds.push(data[i].id)
          if(this.sixSimage.length==6){
            this.sImages.push(this.sixSimage)
            this.sixSimage=[]
            this.names.push(this.sixNames)
            this.sixNames=[]
            this.ids.push(this.sixIds)
            this.sixIds=[];
          }
          
        }
        if(this.sixSimage.length>0){
          this.sImages.push(this.sixSimage)
          this.names.push(this.sixNames)
          this.ids.push(this.sixIds)
        }
      })
    }
  }

}
