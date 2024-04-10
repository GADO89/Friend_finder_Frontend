import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router, Routes} from '@angular/router';
import validate = WebAssembly.validate;
import {Spacevalidator} from '../../model/spacevalidator';
import {AuthenticationService} from "../../services/authentication.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  logInFormGroup: FormGroup;
  invalidMessage: string;

  constructor(private formBuilder: FormBuilder,
              //private loginService: LoginService,
              private auth: AuthenticationService,
              private route: Router) { }

  ngOnInit(): void {
    this.logInFormGroup = this.formBuilder.group({
      admin: this.formBuilder.group({
        userName: new FormControl('',[Validators.required,Validators.minLength(5),Spacevalidator.noOnlyWithSpace]),
        password: new FormControl('',[Validators.required,Validators.minLength(5)])
      })
    })
  }

  get userName(){
    return this.logInFormGroup.get('admin.userName')
  }
  get password(){
    return this.logInFormGroup.get('admin.password')
  }
  OnSubmit() {
    if(this.logInFormGroup.invalid){
      this.logInFormGroup.markAllAsTouched();
    } else {
      /*const result = this.loginService.login(this.logInFormGroup.get('admin').value.userName,this.logInFormGroup.get('admin').value.password)
      if(result == true){
        this.route.navigateByUrl('students');
      } else {
        this.invalidMessage = 'Invalid UserName and Password';
        this.showMessage()
      }
       */
      this.auth.executeAuthentication(this.logInFormGroup.get('admin').value.userName,this.logInFormGroup.get('admin').value.password)
        .subscribe(
          data => {
            // @ts-ignore
            console.log(data.message)
            this.route.navigateByUrl('students');
          }, error => {
            this.invalidMessage = 'Invalid UserName and Password';
            this.showMessage()
          }
        )
    }

  }
  showMessage(){
    setTimeout(() => {
      this.invalidMessage = ""
    },3000)
  }
}
