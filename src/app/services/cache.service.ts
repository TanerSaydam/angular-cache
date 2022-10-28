import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  caches: any = {}
  constructor() { }

  get(url: string): HttpResponse<any> | undefined{
    return this.caches[url];
  }

  put(url: string, response: HttpResponse<any>): void{
    this.caches[url] = response;
  }

  clearCacheWithUrl(url: string): void{
    this.caches[url] = undefined;
  }

  clearCache(): void{
    this.caches = {}
  }
}
