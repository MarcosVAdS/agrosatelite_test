import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Farm } from './farm.model';

@Injectable({
  providedIn: 'root'
})

export class FarmServiceService {

  baseUrl = 'http://localhost:3001/farm/'

  constructor(private snackBar: MatSnackBar, private http: HttpClient ) { 

  }

  createdMessage(msg: string): void {
    this.snackBar.open(msg, 'close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  createFarm(farm: Farm): Observable<Farm>{
    return this.http.post<Farm>(this.baseUrl, farm)
  }

  readFarm(): Observable<Farm[]>{
    return this.http.get<Farm[]>(this.baseUrl)
  }

  getFarmDetails(id: string): Observable<Farm>{
    return this.http.get<Farm>(this.baseUrl + id)
  }

  updateFarm(id: string, farm: Farm): Observable<Farm>{
    return this.http.put<any>(this.baseUrl + id, farm) 
  }

  deleteFarm(id: string){
    return this.http.delete(this.baseUrl + id)
  }

}
