import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  name_user: string = '';
  timer: number = 0;
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
  ) { }

  ngOnInit(): void {
    try
    {
      this.profile()
      this.timer = parseInt(this._auth.getTimeOutS());
      
      
    }
    catch (e) {
      console.log(e);
    }

  }

  profile(){
  
    this._api.getTypeRequest('users/me/').pipe(
      finalize(()=>{
        console.log('Request Completed');
      })
    ).subscribe({
      next: (res:any) => {
        console.log(res);
        this.name_user = res.full_name
        this._auth.StartTimer(this.timer)
      },
      error: (e) => {
        console.log(e)
      } 
    });
  }
  logout() {
    this._auth.logout()
  }
  // logout() {
  //     this._auth.clearStorage("token")
  //     this._auth.clearStorage("timeout")
  //     this._auth.clearStorage("timeout_s")
  //     this._auth.isLoggedIn = false;
  //     this._auth.setDataInLocalStorage("loggedin", this._auth.isLoggedIn)
  //     this.router.navigate(['/login'])
  // }
  
  // StartTimer(){
  //   if (this._auth.getLogin() == "false") {
  //     this.timer = 0
  //     this._auth.clearStorage("timeout_s")
  //     return
  //   }
  //   else
  //   {
      
  //     setTimeout(x => 
  //       {
  //         if(this.timer>0){
  //           this.timer -= 1;
  //           this._auth.setDataInLocalStorage("timeout_s",this.timer)
  //           this.StartTimer();
  //         }
  //         else
  //         {
  //           this._auth.clearStorage("timeout_s")
  //           this.logout()
  //         }
  //       }, 1000);
  //     }
  // }
}