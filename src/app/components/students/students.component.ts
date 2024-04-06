import { Component, OnInit } from '@angular/core';
import { Student } from '../../model/student';
import { StudentService } from '../../services/Student.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{

  students!: Student[];
  message!: String;
  page?: number=1;
  size?:number=1;
  numElement:number= 8;
  constructor(private studentService: StudentService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
      const result = this.route.snapshot.paramMap.has("name");
      if (result== true){
        const name = this.route.snapshot.paramMap.get("name");
        this.getStudentsByName(name)
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

   getStudentsByName(name: String) {
    this.studentService.getStudentByName(name).subscribe(
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
   this.getStudents()

  }
}
