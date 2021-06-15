import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { Farm } from '../farm_service/farm.model';

@Component({
  selector: 'app-farm-register',
  templateUrl: './farm-register.component.html',
  styleUrls: ['./farm-register.component.scss']
})

export class FarmRegisterComponent implements OnInit {

  farm: Farm = {
    name: '',
    geometry: 'polygon',
    area: 0,
    centroid: 0,
    municipality: '',
    state: '',
    is_active: false,
    owner: 1
  }

  constructor(private farmService:  FarmServiceService, private route: Router ) { }

  ngOnInit() {

  }

  submitForm(): void {
    console.log(this.farm)
    this.farmService.createFarm(this.farm).subscribe(()=>{
      this.farmService.createdMessage(`Created farm named: ${this.farm.name}`)
      this.route.navigate(['/farm'])
    })
  }

}
