import { Component, OnInit } from '@angular/core';
import { Location } from '../location';
import { Map, divIcon, marker, geoJSON, latLng, tileLayer, Browser, Layer, GeoJSON, Icon, LayerGroup, Control, LatLngExpression, LatLng } from 'leaflet';



//const BING_KEY = 'AgmwdPOAELwcyd_a30Y6Xq9qD_1YS11OuStJ0YDv1VeDNrG3fECPG7PkIYJtAKEw';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  location: Location = {
    id: 1,
    name: 'Broward Dining'
  };

  private map: Map;

  constructor() { }

  ngOnInit(): void {
  }

  onMapReady(map: Map) {
    this.map = map;

    //var gatorDiningMarker = marker([29.641569, -82.346252]).addTo(map);

    
  }

  options = {
    layers: [
        //background basemap
        tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=BUTtr6UHPeSdE3hiLamg', {
                    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }),

        //campus basemap
        tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/UF_Color_Basemap_Tiles_No_Text/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'gis.ufl.edu'
        }),

        //building labels
        tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Building_Labels/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'gis.ufl.edu'
        }),

        //landscape labels
        tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Landscape_Labels/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'gis.ufl.edu'
        }),
        marker([29.641569, -82.346252])

        /*street labels -> 404 error
        tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Street_Labels/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'gis.ufl.edu'
        }),
        */
        

    ],
    center: [29.6436, -82.3549],
    minZoom: 15,
    zoom: 15,
    
  };

}
