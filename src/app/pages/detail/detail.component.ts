import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ICountry, ICountryStoreState } from 'src/interface/country';
import { IHolidayStoreState } from 'src/interface/holiday';
import { CountrySelector, HolidaySelector } from 'src/app/store/selectors';
import { HolidayActions } from 'src/app/store/actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country: ICountry | null = null;
  code: string;
  dataSource = this.store.select(HolidaySelector.holidays());
  columns: string[] = ['name', 'local_name', 'date', 'regions', 'types'];
  loading = this.store.select(HolidaySelector.loading());
  date = new Date()
  constructor(
    private store: Store<{country: ICountryStoreState, holiday: IHolidayStoreState}>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { 
    this.code = this.route.snapshot.params['code'];
  }

  ngOnInit(): void {
    this.store.select(CountrySelector.find(this.code))
    .subscribe((country) => {
      if (country) {
        this.country = country;
      }
    });

    this.store.dispatch(HolidayActions.load({code: this.code, year: this.date.getFullYear()}));

    this.store.select(HolidaySelector.error())
    .subscribe((error) => {
      if (error) {
        this.snackBar.open('We could not load the list of the countries.', 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5 * 1000
        });
      }
    })
  }

  changed() {
    this.store.dispatch(HolidayActions.load({code: this.code, year: this.date.getFullYear()}));
  }

  back() {
    this.router.navigate(['/']);
  }

}
