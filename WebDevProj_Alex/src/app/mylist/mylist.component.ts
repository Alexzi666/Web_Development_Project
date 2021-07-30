import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {DataService} from '../data.service';
import {Details} from '../details';
import { Injectable } from '@angular/core';
import { isConstructSignatureDeclaration } from 'typescript';
import {BreakpointObserver} from '@angular/cdk/layout';
@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
@Injectable({
  providedIn: 'root'
})


export class MylistComponent implements OnInit {
  alldetails:any[]=[];
  id:any;
  type:any;
  localStorage: Storage;
  isEmpty:boolean=true;
  readyToshow:any[]=[];
  count:number=0;
  six:any[]=[];
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private localService:LocalStorageService,
    private service:DataService, private observer:BreakpointObserver) {
      this.localStorage = window.localStorage;
      
     }
     

  ngOnInit() {
    this.readyToshow=JSON.parse(this.localStorage.getItem('mylist1')||'[]').reverse()
    console.log(this.readyToshow)
    if(this.readyToshow.length>0) {
      this.isEmpty=false;
    }
    this.readyToshow.forEach((value:{name:string,poster_path:string,id:string,type:string})=>{
      
      this.six.push(value);
      if(this.six.length==6){
        this.alldetails.push(this.six);
        this.six=[];
      }
    })
    if(this.six.length>0){
      this.alldetails.push(this.six);
    }

  }

}
