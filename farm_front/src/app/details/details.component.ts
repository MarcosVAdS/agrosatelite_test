import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { OwnerService } from '../owner_service/owner.service';
import { Farm } from '../farm_service/farm.model';
import { Owner } from '../owner_service/owner.model';

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

  owners: Owner [] = []

  url: string = window.location.href
  id = this.url.split("/")

  constructor( private farmService:  FarmServiceService, private route: Router, private ownerService: OwnerService ) { }

  ngOnInit(): void {
    this.ownerService.readOwners().subscribe(owners => {
      this.owners = owners
    })
    
    this.farmService.getFarmDetails(this.id[this.id.length - 1]).subscribe(farm =>{
      this.farm = farm
    }, error => {
      if(error.status == 404){
        this.farmService.createdMessage(`Ops, we can't find this!`)
        this.route.navigate([''])
      }
    })
  }

  updateFarm(): void{
    this.farmService.updateFarm(this.id[this.id.length - 1], this.farm).subscribe(farm => {
      this.farmService.createdMessage(`Updated farm named: ${this.farm.name}`)
      this.route.navigate(['/farm'])
    })
  }

  deleteFarm(): void{
    this.farmService.deleteFarm(this.id[this.id.length - 1]).subscribe(farm =>{
      this.farmService.createdMessage(`Deleted farm named: ${this.farm.name}`)
      this.route.navigate([''])
    })
  }

}
