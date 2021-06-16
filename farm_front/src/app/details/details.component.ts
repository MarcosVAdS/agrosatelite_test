import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Url } from 'url';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { Farm } from '../farm_service/farm.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  farm: Farm = {
    name: '',
    geometry: '',
    area: 0,
    centroid: 0,
    municipality: '',
    state: '',
    is_active: false,
    owner: 1
  }

  url: string = window.location.href
  id = this.url.split("/")

  constructor( private farmService:  FarmServiceService, private route: Router ) { }

  ngOnInit(): void {
    this.farmService.getFarmDetails(this.id[this.id.length - 1]).subscribe(farm =>{
      console.log(farm)
      this.farm = farm
    })
  }

}
