import { NodeWithI18n } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { NowPlay } from '../nowPlay';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { isConstructSignatureDeclaration } from 'typescript';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NowPlayingComponent implements OnInit {
  hover1?:boolean;
  hover2?:boolean;
  hover3?:boolean;
  hover4?:boolean;
  hover5?:boolean;
  type:string='movie';
  TrendingM : NowPlay[]=[];
  images : string[]=[];
  ids : bigint[]=[];
  names: string[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService: DataService,private observer: BreakpointObserver,public router: Router,) { }
  ngOnInit() {
      this.dataService.getNowPlaying().subscribe((data:NowPlay[])=>{
        this.TrendingM=data;
        for(var i =0;i<this.TrendingM.length;i++){
        this.images.push(data[i].backdrop_path);
        this.ids.push(data[i].id);
        this.names.push(data[i].name)}
      })


  }
  onHover1():void{
    this.hover1=true;
  }
  hoverOut1():void{
    this.hover1=false;
  }
  onHover2():void{
    this.hover2=true;
  }
  hoverOut2():void{
    this.hover2=false;
  }
  onHover3():void{
    this.hover3=true;
  }
  hoverOut3():void{
    this.hover3=false;
  }
  onHover4():void{
    this.hover4=true;
  }
  hoverOut4():void{
    this.hover4=false;
  }
  onHover5():void{
    this.hover5=true;
  }
  hoverOut5():void{
    this.hover5=false;
  }
  
}
