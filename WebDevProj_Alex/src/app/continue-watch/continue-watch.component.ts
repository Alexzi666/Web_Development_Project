import { Component, Input,OnInit,ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NgbCarousel,NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-continue-watch',
  templateUrl: './continue-watch.component.html',
  styleUrls: ['./continue-watch.component.css'],
  providers: [NgbCarouselConfig]
})
export class ContinueWatchComponent implements OnInit {
  localStorage:Storage;
  readyToshow:any[]=[];
  six:any[]=[];
  all:any[]=[];
  all_mobile:any[]=[];
  isEmpty?:boolean;
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
 


  
  constructor(private observer: BreakpointObserver) {
    this.localStorage=window.localStorage;
  }
  public smallerThan(subj: any, num: number) {
    return subj < num;
  }
  ngOnInit(){
    console.log('mobile',this.mobile)
    this.readyToshow=JSON.parse(localStorage.getItem('continue')||'[]').reverse();
    if(this.readyToshow.length>0){
      this.isEmpty=false;
      
    }else{
      this.isEmpty=true;
    }
    if(this.readyToshow.length>24){
      this.readyToshow=this.readyToshow.slice(0,24);
    }
    this.readyToshow.forEach((element:{id:string,name:string,
    poster_path:string,type:string},index)=>{
      this.six.push(element);
      this.all_mobile.push(element);
      if(this.six.length==6){
        this.all.push(this.six);
        this.six=[]
      }
      if(index==this.readyToshow.length-1 && this.six.length>0){
        this.all.push(this.six)
      }
      console.log(this.all)
    })

    
  }

}
