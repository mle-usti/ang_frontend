import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showMenu = false;
  isDarkTheme: boolean = false;
  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true:false;
  }
  storeThemeSelection() {
    localStorage.setItem("theme", this.isDarkTheme?"Dark":"Light")
  }
  
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}
