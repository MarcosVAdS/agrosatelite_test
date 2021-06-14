import { Component, OnInit } from '@angular/core';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { Farm } from './farm.model';

@Component({
  selector: 'app-farm-register',
  templateUrl: './farm-register.component.html',
  styleUrls: ['./farm-register.component.scss']
})

export class FarmRegisterComponent implements OnInit {

  farm: Farm = {
    farm_name: '',
    farm_owner:'',
    cpf_owner: '',
    total_area: 0 
  }

  constructor(private farmService:  FarmServiceService ) { }

  ngOnInit() {

  }

  submitForm(): void {
    this.farmService.createFarm(this.farm)
  }

}
