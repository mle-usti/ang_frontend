import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean = false;
    timer: number = 0;
    constructor(private router: Router) {
        
    }

    getUserDetails() {
        const userJson = localStorage.getItem('userInfo');
        return userJson ? JSON.parse(userJson) : null;
    }
    
    setDataInLocalStorage(variableName:any, data: any) {
        localStorage.setItem(variableName, data);
    }


    getToken() {
        return localStorage.getItem('token');
    }

    getTimeOut():string{
        return localStorage.getItem('timeout') || '{}';
    }
    getTimeOutS():string{
        return localStorage.getItem('timeout_s') || '{}';
    }
    getLogin() {
        return localStorage.getItem("loggedin");
    }
    clearStorage(value:string) {
        localStorage.removeItem(value);
    }
    StartTimer(time:number){
        time = time
        if (this.getLogin() == "false") {
          time = 0
          this.clearStorage("timeout_s")
          return
        }
        else
        {
          
          setTimeout(x => 
            {
              if(time>0){
                time -= 1;
                this.setDataInLocalStorage("timeout_s",time)
                this.StartTimer(time);
              }
              else
              {
                this.clearStorage("timeout_s")
                this.logout()
              }
            }, 1000);
          }
      }
      logout() {
        this.clearStorage("token")
        this.clearStorage("timeout")
        this.clearStorage("timeout_s")
        this.isLoggedIn = false;
        this.setDataInLocalStorage("loggedin", this.isLoggedIn)
        this.router.navigate(['/login'])
    }
}
