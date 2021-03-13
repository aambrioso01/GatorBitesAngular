import { Component, OnInit } from '@angular/core';
import { Map, divIcon, marker, geoJSON, latLng, tileLayer, Browser, Layer, GeoJSON, Icon, LayerGroup, Control, LatLngExpression, LatLng } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-bing-layer';
import 'leaflet.locatecontrol';
import { locatecontrol, locationfound, locate} from 'leaflet.locatecontrol'
import { GeoJsonTypes, Feature, GeoJsonObject } from 'geojson';

import { HttpClient } from '@angular/common/http';


const BING_KEY = 'AgmwdPOAELwcyd_a30Y6Xq9qD_1YS11OuStJ0YDv1VeDNrG3fECPG7PkIYJtAKEw';
var vm;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  constructor() { }

  private map: Map;
  private sub: any;
  public boundariesLayer: GeoJSON;
  public parkingLayer: GeoJSON;
  layerGroups;
  public searchText: any;
  searchFailed;
  id;
  sched;
  showClassSched = false;
  searchedBldg;
  searchedBldgName;

  ngOnInit(): void {



  }

  onMapReady(map: Map) {
    this.map = map;

    //var gatorDiningMarker = marker([29.641569, -82.346252]).addTo(map);

    

    var grey_basemap = (L as any).tileLayer.bing({
      bingMapsKey: BING_KEY,
      imagerySet: 'CanvasGray',
      maxZoom: 24,
      detectRetina: true,
      zIndex: -5
    });

    var campus_basemap = tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/UF_Color_Basemap_Tiles_No_Text/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    var basemap = new LayerGroup([grey_basemap, campus_basemap]);

    var aerial = (L as any).tileLayer.bing({
      bingMapsKey: BING_KEY,
      imagerySet: 'Aerial',
      maxZoom: 24,
      detectRetina: true,
      zIndex: -4
    });

    //building labels
    var building_labels =tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Building_Labels/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    //landscape labels
    var landscape_labels =tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Landscape_Labels/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    //street labels -> 404 error
    var street_labels =tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Street_Labels/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    var baseMaps = {
      "Street": basemap,
      "Aerial": aerial
    };

    var overlayMaps = {
      "Street Labels": street_labels,
      "Building Labels": building_labels,
      "Landscape Labels": landscape_labels
    };

    var layerControl = new Control.Layers(baseMaps, overlayMaps);
    layerControl.addTo(this.map);
    basemap.addTo(this.map);
    street_labels.addTo(this.map);
    building_labels.addTo(this.map);
    landscape_labels.addTo(this.map);


    var locator = new (L as any).Control.Locate();
    locator.addTo(this.map);


  }

  options = {
    layers: [
      //background basemap
      // tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=BUTtr6UHPeSdE3hiLamg', {
      //             attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      // }),

      //campus basemap


      



    ],
    center: [29.6436, -82.3549],
    minZoom: 15,
    zoom: 15,

  };



}
