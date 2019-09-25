import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  //baseUrl: string = "http://192.168.51.120:5000/api/";
  // baseUrl : string = "";
  baseUrl : string = "http://testbb.us-east-1.elasticbeanstalk.com/api/"
  //baseUrl : string = "/api/"
  constructor(private http: HttpClient) {
  }


  getRestData(url: string): Observable<any> {
    // const username: string = this.sessionStorage.retrieve('username');
    let headers = new HttpHeaders();
    // headers =headers.append('username', username);
    return this.http.get(this.baseUrl +url, { headers: headers, responseType: 'text', observe: 'response', withCredentials: false });
  }

  postRestData(url: string, body: any): Observable<any> {
    // const username: string = this.sessionStorage.retrieve('username');
    let headers = new HttpHeaders();
    // headers =headers.append('username', username);
    return this.http.post(this.baseUrl +url, body, { headers: headers, responseType: 'text', observe: 'response', withCredentials: false });

  }
  createUrl(url: string) {
    return this.baseUrl + url;
  }
}
