import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loggedInError: boolean = false;
  errorLogin: string = '';

  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    private gurad: AuthGuardService,
    public fb: FormBuilder,
    public theme: AppComponent
  ) { 
    this.form = this.fb.group({
    username: ['MZaidA', Validators.required],
    password:['abc123', Validators.required]
  });
}

  ngOnInit(): void {

  }

  login(){
    let b = this.form.value
    const body = `username=${b.username}&password=${b.password}`
    this._api.postTypeRequest('auth/login/', body).pipe().subscribe({
      next: (res:any) => 
      {
        console.log(res)
        if(res.access_token){
          this._auth.setDataInLocalStorage('token', res.access_token)
          this._auth.setDataInLocalStorage('timeout',res.timeout)
          this._auth.setDataInLocalStorage('timeout_s',res.timeout*60)
          this.router.navigate(['/profile'])
          this.loggedInError = false;
          this._auth.isLoggedIn = true;
          this._auth.setDataInLocalStorage('loggedin',this._auth.isLoggedIn)

        }
      },
      error: (e) => {
        // console.log(e.error);
        this.loggedInError = true;
        this.errorLogin = e.error.detail
      }
    });
  }
  
}

/* 
(res: any) => {
      console.log(res)
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
        this.router.navigate(['profile'])
      }
    }, err => {
      console.log(err)
    }
 */