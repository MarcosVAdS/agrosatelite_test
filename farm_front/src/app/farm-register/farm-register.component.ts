import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle } from '@common/geolib'
import { FarmServiceService } from '../farm_service/farm-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farm } from '../farm_service/farm.model';
import { Owner } from '../owner_service/owner.model';
import { OwnerService } from '../owner_service/owner.service';


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

  owners: Owner [] = []
  private _map!: BasemapComponent

  constructor(private farmService: FarmServiceService, private route: Router,
    private _mapService: MapService, private snackBar: MatSnackBar, private ownerService: OwnerService ) {
    this._map = this._mapService.map
  }

  createdMessage(msg: string): void {
    this.snackBar.open(msg, 'close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  draw(type: 'Circle') {
    if (!this._map) return
    this._map.includeAddon(new DrawAddon({
      identifier: 'geometry_map',
      drawType: type,
      callback: geometry => {
        const geo = new GeoJSON().writeGeometryObject(geometry) as any
        var area = geometry.getArea()

        this.handleNewGeometry(geo)

        this.farm.area = area

        this.createdMessage(`Total area: ${area}`)
      }
    }))
  }

  handleNewGeometry(geometry: any) {
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    console.log('New geometry', geometry)
  }

  ngOnInit() {
    this.ownerService.readOwners().subscribe(owners => {
      this.owners = owners
    })
  }

  submitForm(): void {
    if(this.farm.area != 0 && this.farm.name != ''){
      this.farmService.createFarm(this.farm).subscribe(() => {
        this.farmService.createdMessage(`Created farm named: ${this.farm.name}`)
        this.route.navigate(['/farm'])
      })
    } else if(this.farm.area == 0) {
      this.createdMessage("You can't save a farm without delimit area")
    } else if(this.farm.name == ''){
      this.createdMessage("You can't save a farm without a name")
    }
  }
}
