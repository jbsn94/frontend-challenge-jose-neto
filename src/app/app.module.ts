import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Stores
import { StoreModule } from '@ngrx/store';
import { countryReducer } from '../store/country/country.reducer';
import { holidayReducer } from 'src/store/holiday/holiday.reducer';
import { sessionReducer } from 'src/store/auth/session.reducer';

//Http Module
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      country: countryReducer,
      holiday: holidayReducer,
      session: sessionReducer
    }, {}),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
