import { Component } from '@angular/core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showMenu = false;
  isDarkTheme: boolean = true;
  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true:false;
  }
  storeThemeSelection() {
    localStorage.setItem("theme", this.isDarkTheme?"Dark":"Light")
  }
  
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
  faMoon = faMoon;
  faSun = faSun;
}
