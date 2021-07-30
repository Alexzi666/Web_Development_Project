import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {NowPlay} from './nowPlay';
import { Popular } from './popular';
import { from, Observable, throwError } from 'rxjs';
import {topRated} from './top';
import {Trending} from './trending';
import {Search} from './search';
import {Video} from './video';
import {Details} from './details';
import {Cast} from './cast';
import {CastD} from './castd';
import {SocialId} from './socialId';
import {Review} from './review';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // }
  private nowPlayingUrl = 'https://jjww8900.wl.r.appspot.com/nowPlaying';
  private popularUrl='https://jjww8900.wl.r.appspot.com/populars';
  private topRatedUrl='https://jjww8900.wl.r.appspot.com/toprated';
  private trendingUrl='https://jjww8900.wl.r.appspot.com/trending';
  private popularTvsUrl='https://jjww8900.wl.r.appspot.com/popularTvs';
  private trendingTvsUrl='https://jjww8900.wl.r.appspot.com/trendingTvs';
  private topRatedTvsUrl='https://jjww8900.wl.r.appspot.com/topratedTvs';
  private searchUrl='https://jjww8900.wl.r.appspot.com/search';
  private videoUrl ='https://jjww8900.wl.r.appspot.com/videos';
  private mdetailsUrl="https://jjww8900.wl.r.appspot.com/mdetails";
  private tdetailsUrl="https://jjww8900.wl.r.appspot.com/tdetails";
  private mCastUrl='https://jjww8900.wl.r.appspot.com/mcast';
  private tCastUrl='https://jjww8900.wl.r.appspot.com/tcast';
  private castDetailsUrl='https://jjww8900.wl.r.appspot.com/castDetails';
  private externalUrl='https://jjww8900.wl.r.appspot.com/external';
  private mReviewsUrl='https://jjww8900.wl.r.appspot.com/mreviews';
  private tReviewsUrl='https://jjww8900.wl.r.appspot.com/treviews';
  private mRecommendUrl='https://jjww8900.wl.r.appspot.com/mRecommend';
  private tRecommendUrl='https://jjww8900.wl.r.appspot.com/tRecommend';
  private msimilarUrl='https://jjww8900.wl.r.appspot.com/msimilar';
  private tsimilarUrl='https://jjww8900.wl.r.appspot.com/tsimilar';
  getNowPlaying():Observable<NowPlay[]> {
    return this.http.get<NowPlay[]>(this.nowPlayingUrl)
  }
  getPopulars():Observable<Popular[]>{
    return this.http.get<Popular[]>(this.popularUrl)
  }
  getTops():Observable<topRated[]>{
    return this.http.get<topRated[]>(this.topRatedUrl)
  }
  getTrending():Observable<Trending[]>{
    return this.http.get<Trending[]>(this.trendingUrl)
  }
  getPopularTvs():Observable<Popular[]>{
    return this.http.get<Popular[]>(this.popularTvsUrl)
  }
  getTrendingTvs():Observable<Trending[]>{
    return this.http.get<Trending[]>(this.trendingTvsUrl)
  }
  getTopRatedTvs():Observable<topRated[]>{
    return this.http.get<topRated[]>(this.topRatedTvsUrl)
  }

  getSearch(search_query:string):Observable<Search[]>{
    return this.http.get<Search[]>(this.searchUrl,{
      params: new HttpParams().set('query', search_query)
  })
  }

  getVideo(type:string,id:string):Observable<Video>{
    return this.http.get<Video>(this.videoUrl,{
      params: new HttpParams().set('type',type).set('id',id)
  })
  }

  getMovieDetails(id:string):Observable<Details>{
    return this.http.get<Details>(this.mdetailsUrl,{
      params:new HttpParams().set('id',id)
    })
  }

  getTvDetails(id:string):Observable<Details>{
    return this.http.get<Details>(this.tdetailsUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getMovieCast(id:string):Observable<Cast[]>{
    return this.http.get<Cast[]>(this.mCastUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getTvCast(id:string):Observable<Cast[]>{
    return this.http.get<Cast[]>(this.tCastUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getCastDetails(id:string):Observable<CastD>{
    return this.http.get<CastD>(this.castDetailsUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getSocial(id:string):Observable<SocialId>{
    return this.http.get<SocialId>(this.externalUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getMreviews(id:string):Observable<Review[]>{
    return this.http.get<Review[]>(this.mReviewsUrl,{
      params:new HttpParams().set('id',id)
    })
  }

  getTreviews(id:string):Observable<Review[]>{
    return this.http.get<Review[]>(this.tReviewsUrl,{
      params:new HttpParams().set('id',id)
    })
  }

  getMrecommend(id:string):Observable<Trending[]>{
    return this.http.get<Trending[]>(this.mRecommendUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getTrecommend(id:string):Observable<Trending[]>{
    return this.http.get<Trending[]>(this.tRecommendUrl,{
      params:new HttpParams().set('id',id)
    })
  }

  getMsimilar(id:string):Observable<Trending[]>{
    return this.http.get<Trending[]>(this.msimilarUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  getTsimilar(id:string):Observable<Trending[]>{
    return this.http.get<Trending[]>(this.tsimilarUrl,{
      params:new HttpParams().set('id',id)
    })
  }
  
}