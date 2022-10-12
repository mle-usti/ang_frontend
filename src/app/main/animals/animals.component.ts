import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  animals: Array<any> = []
  animalsPerPage: any ;
  panelOpenState = false;
  
  // pages: number = this.animals.length/this.animalsPerPage
  constructor(private _api : ApiService) { }

  ngOnInit(): void {
    this.animalsData()
    // console.log(this.pages);
    
  }
  animalsData() {
    this._api.getTypeRequest('users/me/animals').pipe(
      finalize(()=>{
        console.log('Request Completed');
      })
    ).subscribe({
      next: (res:any) => {
        console.log(res);
        this.animals =res
        this.animalsPerPage = this.animals.slice(0,6)
        console.log(this.animals);
        
      },
      error: (e) => {
        console.log(e)
      } 
    });
  }
  onPageChange(event:PageEvent){
    const startIdx = event.pageIndex * event.pageSize
    let endIdx = startIdx + event.pageSize
    if (endIdx > this.animals.length) {
      endIdx = this.animals.length
    }
    this.animalsPerPage = this.animals.slice(startIdx, endIdx)
  }

}
