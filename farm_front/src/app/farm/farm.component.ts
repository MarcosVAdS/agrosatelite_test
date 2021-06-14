import { Component, OnInit } from '@angular/core';
import { DrawAddon } from '@common/draw';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../map.service';
import { BasemapComponent } from '../basemap/basemap.component';
import { GeoJsonFeatureAddon } from '@common/feature';
import { pointClickStyle, GeoJsonFeature } from '@common/geolib'

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this._map = this._mapService.map
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
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
          } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
          }
          this.handleNewGeometry(geo)

          alert(output)
        }
      }))
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
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
    this._geometries.push(geometry)
  }


  ngOnDestroy() {
    //this._map.removeByPrefix('geometry')
  }
}