import { Component, OnInit, Injectable } from '@angular/core';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Farm } from '../farm_service/farm.model';
import * as globals from '../global/globals';

@Injectable({
  providedIn: 'root'
})

export class PolygonService {
  private _map!: BasemapComponent

  constructor( private snackBar: MatSnackBar, private _mapService: MapService ) { 
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
    if(!this._map) return
    this._map.includeAddon(new DrawAddon({
      identifier: 'geometry_map',
      drawType: type,
      callback: geometry => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          var area = geometry.getArea() //get area from geometry projected on plane
          var output;
          if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km';
          } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm';
          }
          this.handleNewGeometry(geo)
          
          this.createdMessage(output) 

          return output
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
}
