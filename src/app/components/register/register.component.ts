 import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
 import {Spacevalidator} from "../../model/spacevalidator";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  logInFormGroup!: FormGroup;
  invalidMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private route: Router) { }

  ngOnInit(): void {
    this.logInFormGroup = this.formBuilder.group({
      admin: this.formBuilder.group({
        userName: new FormControl('',[Validators.required,Validators.minLength(5),Spacevalidator.noOnlyWithSpace]),
        password: new FormControl('',[Validators.required,Validators.minLength(5), Spacevalidator.noOnlyWithSpace])
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
      // @ts-ignore
      const result = this.loginService.login(this.logInFormGroup.get('admin').value.userName,this.logInFormGroup.get('admin').value.password)
      if(result == true){
        this.route.navigateByUrl('students');
      } else {
        this.invalidMessage = 'Invalid UserName and Password';
        this.showMessage()
      }
    }

  }
  showMessage(){
    setTimeout(() => {
      this.invalidMessage = ""
    },3000)
  }
}
