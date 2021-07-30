import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';import {DataService} from '../data.service';
import {Trending} from '../trending';
import {Observable, OperatorFunction,} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout'
@Component({
  selector: 'app-recommend-movies',
  templateUrl: './recommend-movies.component.html',
  styleUrls: ['./recommend-movies.component.css']
})
export class RecommendMoviesComponent implements OnInit {
  type:any;
  id:any;
  sixRimage:any[]=[];
  rImages:any[]=[];
  rData:Trending[]=[];
  ids:any[]=[];
  sixIds:any[]=[];
  isMovie?:boolean;
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
      this.isMovie=true;
      this.service.getMrecommend(this.id).subscribe((data:Trending[])=>{
        this.rData=data;
        for(var i =0;i<data.length;i++){
          this.sixRimage.push(data[i].poster_path);
          this.sixIds.push(data[i].id);
          this.sixNames.push(data[i].name)
          // this.sixcname.push(data[i].name);
          // this.sixcharacter.push(data[i].character);
          // this.sixcid.push(data[i].id)
          if(this.sixRimage.length==6){
            this.rImages.push(this.sixRimage)
            this.sixRimage=[]
            this.ids.push(this.sixIds)
            this.sixIds=[]
            this.names.push(this.sixNames)
            this.sixNames=[]
            // this.cname.push(this.sixcname)
            // this.sixcname=[]
            // this.character.push(this.sixcharacter)
            // this.sixcharacter=[];
            // this.cid.push(this.sixcid)
            // this.sixcharacter=[];
          }
          
        }
        if(this.sixRimage.length>0){
          this.rImages.push(this.sixRimage)
          this.ids.push(this.sixIds)
          this.names.push(this.sixNames)
          // this.cname.push(this.sixcname)
          // this.character.push(this.sixcharacter)
          // this.cid.push(this.sixcid)
        }
        
      })
    }else{
      this.isMovie=false;
      this.service.getTrecommend(this.id).subscribe((data:Trending[])=>{
        this.rData=data;
        for(var i =0;i<data.length;i++){
          this.sixRimage.push(data[i].poster_path);
          this.sixIds.push(data[i].id);
          this.sixNames.push(data[i].name)
          // this.sixcname.push(data[i].name);
          // this.sixcharacter.push(data[i].character);
          // this.sixcid.push(data[i].id)
          if(this.sixRimage.length==6){
            this.rImages.push(this.sixRimage)
            this.sixRimage=[]
            this.ids.push(this.sixIds)
            this.sixIds=[]
            this.names.push(this.sixNames)
            this.sixNames=[]
            // this.cname.push(this.sixcname)
            // this.sixcname=[]
            // this.character.push(this.sixcharacter)
            // this.sixcharacter=[];
            // this.cid.push(this.sixcid)
            // this.sixcharacter=[];
          }
          
        }
        if(this.sixRimage.length>0){
          this.rImages.push(this.sixRimage)
          this.ids.push(this.sixIds)
          this.names.push(this.sixNames)
          // this.cname.push(this.sixcname)
          // this.character.push(this.sixcharacter)
          // this.cid.push(this.sixcid)
        }
      })
    }
  }


}
