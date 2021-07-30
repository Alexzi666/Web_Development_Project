import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {MylistComponent} from './mylist/mylist.component';
import {NowPlayingComponent} from './now-playing/now-playing.component';
import {DetailsComponent} from './details/details.component';
const routes: Routes = [
  {path:'',component:NowPlayingComponent},
  {path:'mylist',component:MylistComponent},
  {path: 'watch/:type/:id', component : DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
