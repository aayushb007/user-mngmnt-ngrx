import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCreateEditComponent } from './user-create-edit/user-create-edit.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    UserDetailsComponent,
    UserCreateEditComponent,
    LoginComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
