import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm_service/farm.model';
import { FarmServiceService } from '../farm_service/farm-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  farmList: Farm[] = []

  displayedColumns = ['name', 'state', 'municipality', 'area']

  constructor(private farmService: FarmServiceService ) { }

  ngOnInit(): void {
    console.log("list")
    this.farmService.readFarm().subscribe(farmList => {
      this.farmList = farmList
      console.log(this.farmList)
    })
  }
}
