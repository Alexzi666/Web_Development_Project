import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TrendingCarouselComponent } from './trending-carousel/trending-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContinueWatchComponent } from './continue-watch/continue-watch.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';
import { PopularTvsComponent } from './popular-tvs/popular-tvs.component';
import { TopTvsComponent } from './top-tvs/top-tvs.component';
import { TrendingTvsComponent } from './trending-tvs/trending-tvs.component';
import { MylistComponent } from './mylist/mylist.component';
import { DetailsComponent } from './details/details.component';
import { RecommendMoviesComponent } from './recommend-movies/recommend-movies.component';
import { SimilarMoviesComponent } from './similar-movies/similar-movies.component';
import { SimilarTvsComponent } from './similar-tvs/similar-tvs.component';
import { RecommendTvsComponent } from './recommend-tvs/recommend-tvs.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    AppComponent,
    TrendingCarouselComponent,
    ContinueWatchComponent,
    PopularMoviesComponent,
    TopMoviesComponent,
    NowPlayingComponent,
    PopularTvsComponent,
    TopTvsComponent,
    TrendingTvsComponent,
    MylistComponent,
    DetailsComponent,
    RecommendMoviesComponent,
    SimilarMoviesComponent,
    SimilarTvsComponent,
    RecommendTvsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    YouTubePlayerModule,
    LayoutModule,
    //[NgbPaginationModule, NgbAlertModule],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
