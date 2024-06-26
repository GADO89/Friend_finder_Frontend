import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication.service";

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBaseAuthServiceService implements HttpInterceptor{

  constructor(private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.getAuthentication() && this.auth.getToken()){
      request= request.clone({
        setHeaders:{
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(request);
  }
}







// let userName = `gadoo`;
// let password = `gadoo`;
// let basicAuthHeaderString = `Basic ` + window.btoa(userName + `:` + password);
