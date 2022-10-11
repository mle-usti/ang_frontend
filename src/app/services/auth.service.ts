import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn: boolean = false;
    constructor() {
        console.log(this.getTimeOut());
        
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
}