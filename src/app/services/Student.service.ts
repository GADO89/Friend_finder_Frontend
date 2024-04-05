import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Student } from '../model/student';
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private urlStudents = 'http://localhost:8080/system/students';
  constructor(private httpStudent: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpStudent.get<Student[]>(this.urlStudents).pipe(
      map(response => response)
    );
  }
  removeStudent(id: number){
    //return this.httpStudent.delete(this.urlStudents + "?id=" + id)
    return this.httpStudent.delete(this.urlStudents + `?id=${id}`)
  }
  addStudent(student: Student){
    return this.httpStudent.post(this.urlStudents,student);
  }
  getStudent(id: number): Observable<Student>{
    return this.httpStudent.get<Student>(`http://localhost:8080/system/student?id=${id}`).pipe(
      map(response => response)
    );
  }

  editStudent(student: Student, id:number ){
    return this.httpStudent.put(this.urlStudents + `?id=${id}`, student);
  }
  getStudentByName(name:String):Observable<Student[]>{
    return this.httpStudent.get<Student[]>(this.urlStudents + `/searchname?fullName=${name}`).pipe(
      map(response => response)
    );
  }


}
// interface GetResponseStudent {
//   _embedded: {
//     students: Student[]
//   }
// }




