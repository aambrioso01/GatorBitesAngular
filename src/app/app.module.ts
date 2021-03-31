import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { OverviewComponent } from './overview/overview.component';
import { OverviewDetailComponent } from './overview-detail/overview-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { FilterPipe } from './filter.pipe';
import { SortPipe } from './sort.pipe';
import { SelectionService } from './selection.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    OverviewComponent,
    OverviewDetailComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [ApiService , SelectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
  

}
