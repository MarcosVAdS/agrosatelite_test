import { Component, OnInit } from '@angular/core';
import { Farm } from '../farm_service/farm.model';
import { FarmServiceService } from '../farm_service/farm-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  farmList: Farm[] = []

  displayedColumns: string[] = ['name', 'state', 'municipality', 'area']

  constructor(private farmService: FarmServiceService, private route: Router ) { }

  ngOnInit(): void {
    this.farmService.readFarm().subscribe(farmList => {
      this.farmList = farmList
    })
  }
  
  farmDetails(row){
    this.route.navigate([`farm/details/${row.id}`])
  }
}
