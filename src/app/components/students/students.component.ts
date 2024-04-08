import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import {ActivatedRoute} from "@angular/router";
import {StudentService} from "../../services/Student.service";


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students: Student[]=[];
  message!: String;
  page?: number=1;
  size?:number=3;
  // @ts-ignore
  numElement: number ;
  fullname: string= "";


  constructor(private studentService: StudentService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      const result = this.route.snapshot.paramMap.has("name");
      if (result== true){
        this.fullname = this.route.snapshot.paramMap.get("name");
        this.getStudentsByName()
      } else {
        this.getStudents();
      }
    })
  }


  getStudents(){
    this.studentService.getStudents(this.page-1, this.size).subscribe(
      data => this.students = data
    );
  }

  getElementsStudents() {
    return this.studentService.getStudentsSize().subscribe(
      data => this.numElement = data
    );
  }

  getElementsStudentsByName() {
    return this.studentService.getStudentSizeByName(this.fullname).subscribe(
      data => this.numElement = data
    );
  }

  getStudentsByName() {
    this.studentService.getStudentByName(this.fullname,this.page-1,this.size).subscribe(
      data =>this.students = data
    );
  }
  removeStudent(id: number){
    const index = this.students.findIndex(student => student.id == id);
    this.studentService.removeStudent(id).subscribe(
      response => {
        this.students.splice(index,1),
          this.message = `success delete id ${id}`,
          this.showMessage()
      }
    );
  }
  showMessage(){
    setTimeout(() => {
      this.message = ""
    },3000)
  }


  done() {
    const result = this.route.snapshot.paramMap.has("name");
    if (result == true) {
      // @ts-ignore
      this.getStudentsByName()
    } else {
      this.getStudents();
    }
  }
}
