import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*Custom Files*/
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
//import firebase services
import { AuthService } from '../firebaseauth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers:[AuthService],
  declarations: [LoginComponent]
})
export class LoginModule { }
