import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';import {DataService} from '../data.service';
import {Trending} from '../trending';
import {Observable, OperatorFunction,} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-recommend-tvs',
  templateUrl: './recommend-tvs.component.html',
  styleUrls: ['./recommend-tvs.component.css']
})
export class RecommendTvsComponent implements OnInit {

  type:any;
  id:any;
  sixRimage:any[]=[];
  rImages:any[]=[];
  rData:Trending[]=[];
  isTv?:boolean;
  ids:any[]=[];
  sixIds:any[]=[];
  names:any[]=[];
  sixNames:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:DataService,
    private observer:BreakpointObserver,
    
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
  }

  ngOnInit() {
    this.type=this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.type=='movie'){
      this.isTv=false;
      this.service.getMrecommend(this.id).subscribe((data:Trending[])=>{
        this.rData=data;
        for(var i =0;i<data.length;i++){
          this.sixRimage.push(data[i].poster_path);
          this.sixNames.push(data[i].name)
          this.sixIds.push(data[i].id)
          if(this.sixRimage.length==6){
            this.rImages.push(this.sixRimage)
            this.sixRimage=[]
            this.names.push(this.sixNames)
            this.sixNames=[];
            this.ids.push(this.sixIds)
            this.sixIds=[];
          }
          
        }
        if(this.sixRimage.length>0){
          this.rImages.push(this.sixRimage)
          this.ids.push(this.sixIds)
          this.names.push(this.sixNames)
        }
        
      })
    }else{
      this.isTv=true;
      this.service.getTrecommend(this.id).subscribe((data:Trending[])=>{
        this.rData=data;
        for(var i =0;i<data.length;i++){
          this.sixRimage.push(data[i].poster_path);
          this.sixNames.push(data[i].name);
          // this.sixcharacter.push(data[i].character);
          this.sixIds.push(data[i].id)
          if(this.sixRimage.length==6){
            this.rImages.push(this.sixRimage)
            this.sixRimage=[]
            this.ids.push(this.sixIds)
            this.sixIds=[];
            this.names.push(this.sixNames)
            this.sixNames=[];
          }
          
        }
        if(this.sixRimage.length>0){
          this.rImages.push(this.sixRimage)
          this.ids.push(this.sixIds)
          this.names.push(this.sixNames)
        }
      })
    }
  }


}
