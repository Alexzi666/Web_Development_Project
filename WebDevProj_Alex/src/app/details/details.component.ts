import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap,map } from 'rxjs/operators';
import {DataService} from '../data.service';
import {Observable, OperatorFunction,} from 'rxjs';
import {Video} from '../video';
import {Details} from '../details';
import {Cast} from '../cast';
import { convertToObject, forEachChild } from 'typescript';
import {CastD} from '../castd';
import {SocialId} from'../socialId';
import {Review} from '../review';
import {Trending} from '../trending';
import {LocalStorageService} from '../local-storage.service';
import { stringify } from '@angular/compiler/src/util';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {BreakpointObserver} from '@angular/cdk/layout'
import {NgbModal, ModalDismissReasons,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {TemplateRef} from '@angular/core';

// interface Alert {
//   type: string;
//   message: string;
// }
// const ALERTS: Alert[] = [{
//   type: 'success',
//   message: 'Added to Watchlist',
// }, {
//   type: 'success',
//   message: 'Removed from Watchlist',
// }]
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  old_mylist:any[]=[]
  allStatus:any[]=[];
  status?:boolean;
  localStorage: Storage;
  type:any;
  id:any;
  videoData :  any;
  videoID : any
  name:any;
  details:any;
  genres:any;
  spoken_languages:any;
  release_date:any;
  runtime:any;
  hour:any;
  min:any;
  overview:any;
  vote_average:any;
  tagline:any
  CastData:Cast[]=[];
  profile:any[]=[];
  cname:any[]=[];
  cid:any[]=[]
  character:any[]=[];
  sixprofile:any[]=[];
  sixcname:any[]=[];
  sixcid:any[]=[];
  sixcharacter:any[]=[];
  CastDetails:any;
  selectedCastID: string='';
  selectedCastImg?:string;
  selectedSocial?:SocialId;
  imdb?:string;
  twitter?:string;
  instagram?:string;
  facebook?:string;
  selected:boolean=false;
  reviews:Review[]=[];
  reviewLength:any;
  mylistIds:any[]=[];
  list_name:any;
  poster_path:any;

  hashtags:string[]=['USC','CS571','FightOn']
  shareContent:String="Watch ";
  //alerts: Alert[]=ALERTS;
  alert1:string="Added to Watchlist";
  alert2:string="Removed from Watchlist";
  aler1_boolean?:boolean;
  aler2_boolean?:boolean;
  close(alert: string) {
    alert='';
  }
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  closeResult='';
  clicked:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service:DataService,
    private localService:LocalStorageService,
    private observer:BreakpointObserver,
    private modalService: NgbModal,
    
  ) {
    this.localStorage = window.localStorage;
  }

  open(content: string | TemplateRef<any>='',id:string){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg',scrollable:true,centered:true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
      this.service.getCastDetails(id).subscribe((data:CastD)=>{
        this.CastDetails=data;
        this.selectedCastImg=this.CastDetails.profile;
        console.log(this.CastDetails)
      })
      this.service.getSocial(id).subscribe((data:SocialId)=>{
        this.selectedSocial=data;
        this.imdb=data.imdb_id;
        //console.log(this.imdb)
        this.twitter=data.twitter_id;
        this.facebook=data.facebook_id;
        this.instagram=data.instagram_id;
      })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  ngOnInit() {
    this.type=this.route.snapshot.paramMap.get('type');
    this.id = this.route.snapshot.paramMap.get('id');
    // var changeIndex = -1;
    // var currentStorage=JSON.parse(this.localStorage.getItem('mylist1')|| '[]')
    // currentStorage.forEach((element:{name:string,poster_path:string,id:string,type:string},index:any) => {
    //   if(element.id===this.id && element.type===this.type){
    //     this.status=true;
    //     changeIndex=index;
    //     if(changeIndex>0){
    //       currentStorage.splice(changeIndex,1);
    //       currentStorage.push(element);
    //       this.localStorage.setItem('mylist1',JSON.stringify(currentStorage))
    //     }
    //   }
    // })
    
    
    this.service.getVideo(this.type,this.id).subscribe((data:Video)=>{
      this.videoData=data;
      this.videoID=data.key;
    });
    if(this.type=='movie'){
        this.service.getMovieDetails(this.id).subscribe((data:Details)=>{
          this.details=data;
          this.name=data.name;
          this.shareContent=this.shareContent+this.name
          this.genres=data.genres.toString();
          this.spoken_languages=data.spoken_languages.toString();
          console.log(data.spoken_languages)
          this.release_date=data.release_date;
          this.runtime=data.runtime;
          this.hour=Math.trunc(this.runtime/60);
          this.min=this.runtime%60;
          this.overview=data.overview;
          this.vote_average=data.vote_average;
          this.tagline=data.tagline;
          this.poster_path=data.poster_path;
          var old_continue = JSON.parse(this.localStorage.getItem('continue')||'[]')
          var new_continue = {
          "id":this.id,
          "type":this.type,
          "name":this.name,
          "poster_path":this.poster_path,
          }
          let toRemoveIndex=-1;
          old_continue.forEach((element:{
            id:string,
            type:string,
            name:string,
            poster_path:string
          },index:any)=>{
            if(element.id==new_continue.id && element.type==new_continue.type){
              toRemoveIndex=index;
              console.log(index)
            }
          })
          console.log(toRemoveIndex)
          if(toRemoveIndex>=0){
            old_continue.splice(toRemoveIndex,1)
          }
          old_continue.push(new_continue);
          this.localStorage.setItem('continue',JSON.stringify(old_continue))
          var changeIndex = -1;
          var currentStorage=JSON.parse(this.localStorage.getItem('mylist1')|| '[]')
          currentStorage.forEach((element:{name:string,poster_path:string,id:string,type:string},index:any) => {
            if(element.id===this.id && element.type===this.type){
             this.status=true;
              changeIndex=index;
              console.log(changeIndex)
            if(changeIndex>=0){
              currentStorage.splice(changeIndex,1);
              currentStorage.push(element);
              this.localStorage.setItem('mylist1',JSON.stringify(currentStorage))
            }
          }
        })
      })
        
        this.service.getMreviews(this.id).subscribe((data:Review[])=>{
          this.reviews = data;
          this.reviewLength=data.length;
          
        })
        this.service.getMovieCast(this.id).subscribe((data:Cast[])=>{
          this.CastData=data;
          for(var i =0;i<data.length;i++){
            this.sixprofile.push(data[i].profile_path);
            this.sixcname.push(data[i].name);
            this.sixcharacter.push(data[i].character);
            this.sixcid.push(data[i].id)
            if(this.sixprofile.length==6){
              this.profile.push(this.sixprofile)
              this.sixprofile=[]
              this.cname.push(this.sixcname)
              this.sixcname=[]
              this.character.push(this.sixcharacter)
              this.sixcharacter=[];
              this.cid.push(this.sixcid)
              this.sixcharacter=[];
            }
            
          }
          if(this.sixprofile.length>0){
            this.profile.push(this.sixprofile)
            this.cname.push(this.sixcname)
            this.character.push(this.sixcharacter)
            this.cid.push(this.sixcid)
          }
        })
        
    }else{
      this.service.getTreviews(this.id).subscribe((data:Review[])=>{
        this.reviews = data;
        this.reviewLength=data.length;
      })
        this.service.getTvDetails(this.id).subscribe((data:Details)=>{
          this.details=data;
          this.name=data.name;
          this.shareContent=this.shareContent+this.name
          this.genres=data.genres.toString();
          this.spoken_languages=data.spoken_languages.toString();
          this.release_date=data.release_date;
          this.runtime=data.runtime;
          this.overview=data.overview;
          this.vote_average=data.vote_average;
          this.tagline=data.tagline;
          this.poster_path=data.poster_path;
          var old_continue = JSON.parse(this.localStorage.getItem('continue')||'[]')
          var new_continue = {
          "id":this.id,
          "type":this.type,
          "name":this.name,
           "poster_path":this.poster_path
          }
          let toRemoveIndex=-1;
          old_continue.forEach((element:{
            id:string,
            type:string,
            name:string,
            poster_path:string
          },index:any)=>{
            if(element.id==new_continue.id && element.type==new_continue.type){
              toRemoveIndex=index;
              console.log(index)
            }
          })
          console.log(toRemoveIndex)
          if(toRemoveIndex>=0){
            old_continue.splice(toRemoveIndex,1)
          }
          old_continue.push(new_continue);
          this.localStorage.setItem('continue',JSON.stringify(old_continue))
          var changeIndex = -1;
          var currentStorage=JSON.parse(this.localStorage.getItem('mylist1')|| '[]')
          currentStorage.forEach((element:{name:string,poster_path:string,id:string,type:string},index:any) => {
            if(element.id===this.id && element.type===this.type){
              this.status=true;
              changeIndex=index;
            if(changeIndex>=0){
              currentStorage.splice(changeIndex,1);
              currentStorage.push(element);
              this.localStorage.setItem('mylist1',JSON.stringify(currentStorage))
            }
          }
        })
        })
        this.service.getTvCast(this.id).subscribe((data:Cast[])=>{
          this.CastData=data;
          for(var i =0;i<data.length;i++){
            this.sixprofile.push(data[i].profile_path);
            this.sixcname.push(data[i].name);
            this.sixcharacter.push(data[i].character);
            this.sixcid.push(data[i].id)
            if(this.sixprofile.length==6){
              this.profile.push(this.sixprofile)
              this.sixprofile=[]
              this.cname.push(this.sixcname)
              this.sixcname=[]
              this.character.push(this.sixcharacter)
              this.sixcharacter=[];
              this.cid.push(this.sixcid)
              this.sixcid=[]
            }
            
          }
          if(this.sixprofile.length>0){
            this.profile.push(this.sixprofile)
            this.cname.push(this.sixcname)
            this.character.push(this.sixcharacter)
            this.cid.push(this.sixcid)
          }

        })
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
  
  
  closeCast(){
    this.CastDetails=undefined;
  } 

  addTo(){
     this.aler1_boolean=true;
     this.aler2_boolean=false;
     if(this.aler1_boolean){
      setTimeout(()=>{
        this.aler1_boolean=false;
      },5000)
    }
      this.status=true;
    if(this.type=="movie"){
      this.service.getMovieDetails(this.id).subscribe((data:Details)=>{
        this.list_name = data.name;
        this.poster_path = data.poster_path;
        var my_newlist={"name":this.list_name,"poster_path":this.poster_path,
        "id":this.id,"type":this.type};
         this.old_mylist= JSON.parse(this.localStorage.getItem('mylist1')||'[]');
     //console.log(this.localStorage.getItem('mylist'))
         console.log(this.old_mylist)
        this.old_mylist.push(my_newlist)
      this.localStorage.setItem('mylist1',JSON.stringify(this.old_mylist))
        })
      }else if (this.type=="tv"){
      this.service.getTvDetails(this.id).subscribe((data:Details)=>{
       this.list_name = data.name;
      this.poster_path = data.poster_path;
      var my_newlist={"name":this.list_name,"poster_path":this.poster_path,
      "id":this.id,"type":this.type};
      this.old_mylist= JSON.parse(this.localStorage.getItem('mylist1')||'[]');
      //console.log(this.localStorage.getItem('mylist'))
      console.log(this.old_mylist)
      this.old_mylist.push(my_newlist)
      this.localStorage.setItem('mylist1',JSON.stringify(this.old_mylist))
      })
    }
  }  
  removeFrom(){
    this.aler2_boolean=true;
    this.aler1_boolean=false;
    if(this.aler2_boolean){
      setTimeout(()=>{
        this.aler2_boolean=false;
      },5000)
    }
    this.status=false;
    var values=JSON.parse(this.localStorage.getItem('mylist1')||'[]');
    let removeIndex = values.indexOf({"name":this.list_name,"poster_path":this.poster_path,"id":this.id,"type":this.type})
    values.splice(removeIndex,1);
    this.localStorage.setItem('mylist1',JSON.stringify(values))
  }


}
