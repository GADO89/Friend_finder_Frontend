import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor() { }

  login(userName: string,password: string){
    if(userName== 'gggggg' && password=='123456'){
      sessionStorage.setItem("isRegister",userName);
      return true;
    }
    return false;
  }

  isLogin(){
    return !(sessionStorage.getItem("isRegister") == null);
  }

  logOut(){
    sessionStorage.removeItem("isRegister");
  }
}
