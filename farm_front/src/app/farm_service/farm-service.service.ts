import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farm } from '../farm-register/farm.model';

@Injectable({
  providedIn: 'root'
})

export class FarmServiceService {

  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { 

  }

  createFarm(farm: Farm){
    console.log(farm)
  }

}
