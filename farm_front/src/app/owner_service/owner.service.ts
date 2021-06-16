import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Owner } from './owner.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  baseUrl = 'http://localhost:3001/owner/'

  constructor( private snackBar: MatSnackBar, private http: HttpClient ) { }
  
  createdMessage(msg: string): void {
    this.snackBar.open(msg, 'close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  createOwner(owner: Owner): Observable<Owner>{
    return this.http.post<Owner>(this.baseUrl, owner)
  }

  readOwners(): Observable<Owner[]>{
    return this.http.get<Owner[]>(this.baseUrl)
  }

  getOwnerDetails(id: string): Observable<Owner>{
    return this.http.get<Owner>(this.baseUrl + id)
  }

  updateOwner(id: string, farm: Owner): Observable<Owner>{
    return this.http.put<any>(this.baseUrl + id, farm) 
  }

  deleteOwner(id: string){
    return this.http.delete(this.baseUrl + id)
  }
}
