import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm_service/farm.model';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  farmList: Farm[] = []

  displayedColumns = ['name', 'state', 'municipality', 'area']

  constructor(private farmService: FarmServiceService, private route: Router ) { }

  ngOnInit(): void {
    console.log("list")
    this.farmService.readFarm().subscribe(farmList => {
      this.farmList = farmList
      console.log(this.farmList)
    })
  }

  farmDetails(row){
    this.route.navigate([`farm/details/${row.id}`])
  }
}
