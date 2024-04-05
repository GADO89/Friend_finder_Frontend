import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OptionsComponent } from './components/options/options.component';
import { StudentsComponent } from './components/students/students.component';
import {RegisterComponent} from "./components/register/register.component";
import { ContentComponent } from './components/content/content.component';
import {RouteActivatedService} from "./services/route-activated-service.service";
import {LoginActivatedService} from "./services/login-activated-service.service";

const routes: Routes=[

  {path: 'register', component: RegisterComponent,canActivate: [LoginActivatedService]},
  {path: 'content', component: ContentComponent, canActivate: [LoginActivatedService]},
  {path: 'control', component: OptionsComponent,canActivate: [RouteActivatedService]},
  {path: 'control/:id', component: OptionsComponent,canActivate: [RouteActivatedService]},
  {path: 'students', component: StudentsComponent,canActivate: [RouteActivatedService]},
  {path: 'students/:name', component: StudentsComponent,canActivate: [RouteActivatedService]},
  {path: '', component: StudentsComponent,canActivate: [RouteActivatedService]},
  {path: '**', component: StudentsComponent,canActivate: [RouteActivatedService]},


];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    StudentsComponent,
    StudentsComponent,
    OptionsComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
