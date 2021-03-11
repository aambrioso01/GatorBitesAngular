import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OverviewComponent } from './overview/overview.component';
import { OverviewDetailComponent } from './overview-detail/overview-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OverviewComponent,
    OverviewDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
