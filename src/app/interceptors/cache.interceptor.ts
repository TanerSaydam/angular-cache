import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { TimerService } from '../services/timer.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private _cache: CacheService,
    private _timer: TimerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

 
    this._timer.startTimer();    
    
    let difTime = this._timer.getTime();
    if (difTime < 0) {
      this._timer.resetTimer();
      this._cache.clearCacheWithUrl(request.url);
    }


    if (request.method == "GET") {
      let cache = this._cache.get(request.url);

      if (cache) {
        return of(cache)
      }

      return next.handle(request).pipe(
        tap((event)=> {
          if (event instanceof HttpResponse) {
            this._cache.put(request.url, event)
          }
        })
      )
    }else
      return next.handle(request);
  }
}
