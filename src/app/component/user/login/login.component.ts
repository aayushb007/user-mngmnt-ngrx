import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from 'express';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  er!: string;
  constructor(private userService: UserService, private router: Router,private store: Store) { }
 
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      // this.router.navigate(['/all-tasks'])

    }
    this.initForm()
  }

  private initForm() {
    let email = '';
    let password = '';
    this.loginForm = new FormGroup({
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required),

    })
    console.log(this.loginForm);

  }
  onSubmit() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    console.log('yo', email, password);
    this.userService.login(email, password).subscribe(res => {
      const token = res.token;
      const user = res.user
      localStorage.setItem('token', token);
      localStorage.setItem('name', user.name);
      localStorage.setItem('id', user.email);
      // this.router.navigate(['/all-tasks'])

    },
      err => {
        console.log('Error', err.error);
        this.er = err.error.error;
      });

    // this.store.dispatch(login({ email, password }));

  }
}
