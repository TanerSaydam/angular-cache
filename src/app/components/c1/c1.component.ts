import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.css']
})
export class C1Component implements OnInit {

  constructor(
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    let api = "https://localhost:7276/api/Values";
    this._http.get<any>(api).subscribe({
      next: (res)=> console.log(res),
      error: (err)=> console.log(err)
    })
  }
}
