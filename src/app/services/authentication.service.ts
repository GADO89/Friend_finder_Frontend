import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private httpStudent: HttpClient) { }

  executeAuthentication(username: string,password: any): Observable<String>{
    let basicAuthHeaderString = `Basic ` + window.btoa(username + `:` + password);

    let header= new Headers({
    
        Authorization: basicAuthHeaderString
    
    })
    
    return this.httpStudent.get<String>(`http://localhost:8080/basicAuth`).pipe(
      map(
        response =>{
          sessionStorage.setItem('isRegister', username);
          return response;
        }
      )
    )
    
  }
}
