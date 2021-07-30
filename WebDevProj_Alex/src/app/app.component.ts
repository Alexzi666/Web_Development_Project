import { Component } from '@angular/core';
import {OnInit } from '@angular/core';
import {DataService} from './data.service';
import {Trending} from './trending';
import {FormsModule} from '@angular/forms';
import {Observable, OperatorFunction} from 'rxjs';
import {Search} from './search';
import {Router} from '@angular/router';
import { debounceTime, distinctUntilChanged, map,switchMap, catchError  } from 'rxjs/operators';
import { KeyValuePipe } from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  title = 'AlexWebDevProj';
  lookups:Search[]=[]
  model: string="";
  clickedItem?:Search;
  searchText= this.model;
  names:string[]=[];
  type?:string;
  id?:string;
  selected?:Search;
  mobile = this.observer.isMatched('(max-width: 500px)');
  desktop= this.observer.isMatched('(min-width: 501px)');
  constructor(private dataService:DataService,public router: Router,
    private observer: BreakpointObserver) { }
  
  ngOnInit(){
    console.log('mobile:',this.mobile)
    console.log(this.desktop)
    this.dataService.getSearch('game')
   .subscribe((data:Search[])=>{
     this.lookups=data;
     for(var i =0;i<this.lookups.length;i++){
       this.names.push(data[i].name)
     }
   });
  }
  search = (text$: Observable<string>) => {
    return text$.pipe(      
        debounceTime(200), 
        distinctUntilChanged(),
        switchMap( (searchText) =>  this.dataService.getSearch(searchText)),            
    );                 
  }
  
  inputFormatBandListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }

  selectedItem(item:any,input:any){
    item.preventDefault();
    this.selected=item.item
    this.id=this.selected?.id;
    this.type=this.selected?.media_type;
    this.router.navigate(['/watch',this.type,this.id])
    input.value='';
  }

  
}

