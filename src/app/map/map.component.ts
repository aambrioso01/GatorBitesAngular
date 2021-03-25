import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Map, divIcon, marker, geoJSON, latLng, tileLayer, Browser, Layer, GeoJSON, Icon, LayerGroup, Control, LatLngExpression, LatLng } from 'leaflet';
import * as L from 'leaflet';
import 'leaflet-bing-layer';
import 'leaflet.locatecontrol';
import { locatecontrol, locationfound, locate } from 'leaflet.locatecontrol'
import { GeoJsonTypes, Feature, FeatureCollection, GeoJsonObject } from 'geojson';
import * as geojson from 'geojson';

import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DepFlags } from '@angular/compiler/src/core';
import { SelectionService } from '../selection.service';
import { ApiService } from '../api.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { OverviewComponent } from '../overview/overview.component';

//import { debug } from 'node:console';


const BING_KEY = 'AgmwdPOAELwcyd_a30Y6Xq9qD_1YS11OuStJ0YDv1VeDNrG3fECPG7PkIYJtAKEw';
var vm;
var selectedLocationID;
var message;
var l;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    ApiService, SelectionService 
  ]
})
export class MapComponent implements OnInit, AfterViewInit {

  @Output() messageEvent = new EventEmitter<String>();
  @Output() idEvent = new EventEmitter<boolean>();
  json;
  
  constructor(private http: HttpClient, private service: SelectionService) { }

  

  map: Map;
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
  message:string;

  setMarkerOnLocation()
  {
    
  }

  reloadGeoJSONLayer(map: Map)
  {
    
    this.map = map;

    this.http.get("assets/dining.json").subscribe((json: any) => {
      console.log(json);
      this.json = json;
      var myLayer = L.geoJSON(this.json);
      

      const anIcon = divIcon({
        className: 'mapIcon'
      });

      myLayer = geoJSON(this.json, {
        pointToLayer: function (feature, latlng) {
          var mark = marker(latlng, { icon: feature.properties.CUSTOM_ICON ? new Icon({ iconUrl: 'assets/' + feature.properties.CUSTOM_ICON, iconSize: [30, 30] }) : anIcon });
          if (feature.properties.CUSTOM_POPUP) {
            mark.bindPopup(feature.properties.CUSTOM_POPUP);
            mark.on('click', markerOnClick);
          }

          function markerOnClick(e) {
            message = feature.properties.ID;     
            vm.messageEvent.emit(message);           
            //console.log("Selected ID on map:" + message);
          }
          return mark;
        }
      })
      myLayer.addTo(this.map);
    });
  }


  ngOnInit(): void {
    vm = this;
    
    this.http.get('assets/boundaries.json')
      .subscribe((data) => this.loadBoundaries(data))

  }

  ngAfterViewInit(): void {
    this.map.invalidateSize();
  }

  onMapReady(map: Map) {

    this.map = map;

    this.http.get("assets/dining.json").subscribe((json: any) => {
      console.log(json);
      this.json = json;
      var myLayer = L.geoJSON(this.json);
      
      const anIcon = divIcon({
        className: 'mapIcon'
      }); 

      myLayer = geoJSON(this.json, {
        pointToLayer: function (feature, latlng) {
          var mark = marker(latlng, { icon: feature.properties.CUSTOM_ICON ? new Icon({ iconUrl: 'assets/' + feature.properties.CUSTOM_ICON, iconSize: [30, 30] }) : anIcon });
          if (feature.properties.CUSTOM_POPUP) {
            mark.bindPopup(feature.properties.CUSTOM_POPUP);
            mark.on('click', markerOnClick);
            
          }

          function markerOnClick(e) {
            //sets location ID when marker is clicked
            message = feature.properties.ID;
            
            vm.messageEvent.emit(message);
            //console.log("Selected ID on map:" + message);
          }
          return mark;
        }
      })
      myLayer.addTo(this.map);

    });


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
    var building_labels = tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Building_Labels/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    //landscape labels
    var landscape_labels = tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Landscape_Labels/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'gis.ufl.edu'
    });

    //street labels -> 404 error
    var street_labels = tileLayer('https://tiles.arcgis.com/tiles/IiuFUnlkob76Az9k/arcgis/rest/services/Street_Labels/MapServer/tile/{z}/{y}/{x}', {
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


    var locator = new (L as any).Control.Locate(
      {
        keepCurrentZoomLevel: true
      }
    );

    //locator.initialZoomLevel(false);
    locator.addTo(this.map);

  }

  options = {
    layers: [],
    center: [29.644533, -82.351683],
    minZoom: 15,
    zoom: 15,
  };

  style(feature) {
    return {
      fillColor: '#2196F3',
      weight: 0,
      opacity: 1,
      color: '#2196F3',
      dashArray: '3',
      fillOpacity: 0.0
    };
  }

  hoveredStyle(feature) {
    return {
      weight: 5,
      color: '#0D47A1',
      dashArray: '',
      fillOpacity: 0.2
    };
  }

  loadBoundaries(data): void {
    this.boundariesLayer = geoJSON(data, {
      style: this.style,
      onEachFeature: function onEachFeature(feature, layer) {
        layer.on({
          mouseover: function highlightFeature(e) {
            var layer = e.target;
            layer.setStyle(vm.hoveredStyle());
            if (!Browser.ie && !Browser.opera && !Browser.edge) {
              layer.bringToFront();
            }
          },
          mouseout: function resetHighlight(e) {
            var layer = e.target;
            layer.setStyle(vm.style());
            if (!Browser.ie && !Browser.opera && !Browser.edge) {
              layer.bringToFront();
            }
          },
          click: function zoomToFeature(e) {
            var layer = e.target;
            vm.zone.run(() => { vm.openBuildingDialog(layer); });
          }
        });
      }
    })
    this.boundariesLayer.addTo(this.map);
  }

}


