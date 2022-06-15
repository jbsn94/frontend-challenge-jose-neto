import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Stores
import { StoreModule } from '@ngrx/store';
import { countryReducer } from '../store/country/country.reducer';
import { holidayReducer } from 'src/store/holiday/holiday.reducer';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      country: countryReducer,
      holiday: holidayReducer
    }, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
