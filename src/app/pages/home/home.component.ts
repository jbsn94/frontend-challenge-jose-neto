import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { CountryActions } from 'src/app/store/actions';
import { ICountryStoreState } from 'src/interface/country';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CountrySelector } from 'src/app/store/selectors';
import { paginator } from 'src/app/store/actions/country.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  columns: string[] = ['code', 'name'];
  length$ = this.store.select(CountrySelector.length());
  size$ = this.store.select(CountrySelector.size());
  pageSizeOptions: number[] = [5, 10, 20, 50];
  loading$ = this.store.select(CountrySelector.loading());
  countries$ = this.store.select(CountrySelector.countries());

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<{country: ICountryStoreState}>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    //Loading the data
    this.store.dispatch(CountryActions.load());

    //Checking for errors
    this.store.select(CountrySelector.error()).subscribe((error) => {
      if (error) {
        this.snackBar.open('We could not load the list of the countries.', 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5 * 1000
        });
      }
    });
  }

  goToDetail(code: string) {
    this.router.navigate([`/${code}`]);
  }

  paginatorChanged(event: PageEvent) {
    this.store.dispatch(paginator({ page: event.pageIndex, size: event.pageSize }));
  }

}
