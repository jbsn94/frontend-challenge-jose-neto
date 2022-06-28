import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Stores
import { StoreModule } from '@ngrx/store';
import { countryReducer } from './store/reducers/country.reducer';
import { holidayReducer } from 'src/app/store/reducers/holiday.reducer';
import { sessionReducer } from 'src/app/store/reducers/session.reducer';

//Http Module
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptor } from './interceptor/api/api.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from 'src/app/store/effects/country.effects';

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
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      CountryEffects
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
