import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

//import { debug } from 'node:console';


const BING_KEY = 'AgmwdPOAELwcyd_a30Y6Xq9qD_1YS11OuStJ0YDv1VeDNrG3fECPG7PkIYJtAKEw';
var vm;
var selectedLocationID;
var message;
var flag: boolean = false;



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<String>();
  json;
  
  constructor(private http: HttpClient) { }

  sendData(data: any[])
  {
    console.log('i am from map componennt');
    console.log(data);
  }

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


  //even with nothing in here, this code still has to be here for overview to update with id?
  sendMessage() 
  {
    
  }


  ngOnInit(): void {
    vm = this;

    this.http.get('assets/boundaries.json')
      .subscribe((data) => this.loadBoundaries(data))

  }

  onMapReady(map: Map) {

    

    this.http.get("assets/dining.json").subscribe((json: any) => {
      console.log(json);
      this.json = json;
      var myLayer = L.geoJSON(this.json);

      const anIcon = divIcon({
        //html: '<span class="fa-stack"><i class="fas fa-circle fa-stack-2x" style="color: #' + '795548' + ';"></i><i class="fal fa-stack-1x white-text ' + 'fas fa-utensils' + '"></i></span>',
        //iconSize: [20, 20],
        className: 'mapIcon'
      });

      

      myLayer = geoJSON(this.json, {
        pointToLayer: function (feature, latlng) {
          var mark = marker(latlng, { icon: feature.properties.CUSTOM_ICON ? new Icon({ iconUrl: 'assets/' + feature.properties.CUSTOM_ICON, iconSize: [30, 30] }) : anIcon });
          if (feature.properties.CUSTOM_POPUP) {
            mark.bindPopup(feature.properties.CUSTOM_POPUP);
            mark.on('click', markerOnClick);
            //mark.on('click', sendMessage);
            //selectedLocationID = feature.properties.ID;
            //message = selectedLocationID;
            //console.log(selectedLocationID);
          }

          

          function markerOnClick(e) {
            //sets location ID when marker is clicked
            selectedLocationID = feature.properties.ID;
            
            
            message = selectedLocationID;
            vm.messageEvent.emit(message);
            
            //flag = true;
            //this.messageEvent.emit(message);
            //emits string ID to parent component (app)
            //this.childToParent.emit(selectedLocationID);
            console.log("Selected ID on map:" + selectedLocationID);
          }

          

          return mark;
        }
      })

      myLayer.addTo(this.map);

      

    });



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

    // var myLayer = L.geoJSON().addTo(map);
    // myLayer.addData(diningGeoJSON);




  }

  options = {
    layers: [
      //background basemap
      // tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=BUTtr6UHPeSdE3hiLamg', {
      //             attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      // }),

      //campus basemap



    ],
    center: [29.644533, -82.351683],
    minZoom: 15,
    zoom: 15,

  };

  // private onStateChangeEvent = (event: any) => {
    
  //   this.messageEvent.emit(selectedLocationID); 
  //   console.log("reached here: " + selectedLocationID);
  // }

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
    // if (this.id != null) {
    //   var obj = { "item": { "BLDG": this.id } };
    //   this.handleSearchResults(obj);
    // }

    // if (this.sched != null) {
    //   this.showSchedule();
    // }
  }




}


