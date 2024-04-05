
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Student} from "../../model/student";
import {StudentService} from "../../services/Student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  studentGroup!:FormGroup;
  invalidFullName: String
  id!:number;
  myStudent: Student =new Student(0,"","","","", "");
  constructor(private formBuilder:FormBuilder,
            private  serviceStudent: StudentService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
     // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
     if (this.id !=-1){
     this.serviceStudent.getStudent(this.id).subscribe(
       response =>  {
         this.myStudent =  response,
           this.studentGroup.get("student.userName").patchValue(response.fullName),
           this.studentGroup.get("student.age").patchValue(response.age),
           this.studentGroup.get("student.address").patchValue(response.address),
           this.studentGroup.get("student.phone").patchValue(response.phone),
           this.studentGroup.get("student.gender").patchValue(response.gender)
       }

     )
     }

    this.studentGroup = this.formBuilder.group({
      student: this.formBuilder.group({
        userName:[''],
        age:[''],
        address:[''],
        phone:[''],
        gender:['MALE'],

      })
  })
}
   getUserName(){
    return this.studentGroup.get("student")?.value.userName;
   }
   getAge(){
    return this.studentGroup.get("student")?.value.age;
  }   getAddress(){
    return this.studentGroup.get("student")?.value.address;
  }   getPhone(){
    return this.studentGroup.get("student")?.value.phone;
  }   getGender(){
    return this.studentGroup.get("student")?.value.gender;
  }
  Done() {
    const stu=new Student(this.id,this.getUserName(), this.getGender(), this.getAge(), this.getPhone(), this.getAddress());
      if (this.id ==0){
        this.serviceStudent.addStudent(stu).subscribe(
          response => {
            this.router.navigateByUrl('students')
          },
          error => {
            this.invalidFullName= "Fullname is already Exist"
            this.showMessage()
          }
        )
      }  else {
        this.serviceStudent.editStudent(stu, this.id).subscribe(
          response => {
            this.router.navigateByUrl('students')
          }
        )
      }
  }
  showMessage(){
    setTimeout(() => {
      this.invalidFullName =""
    },3000)
  }

}
















// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';
// import { StudentService } from '../../services/Student.service';
//
// @Component({
//   selector: 'app-options',
//   templateUrl: './options.component.html',
//   styleUrl: './options.component.css'
// })
// export class OptionsComponent implements OnInit{
//
//   logInFormGroup!: FormGroup;
//
//   studentService!: StudentService;
//
//
//    constructor(private formBuilder:FormBuilder,
//     studentService: StudentService,
//     private route:Router){}
//
//   ngOnInit(): void {
//    this.logInFormGroup = this.formBuilder.group({
//     admin: this.formBuilder.group({
//
//     })
//    });
//   }
//   onSubmit(formValue: any){
//     console.log(formValue)
//   }
// }
