import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/service/country/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { set } from 'src/store/country/country.actions';
import { ICountry } from 'src/interface/country';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countries: ICountry[] = [];
  dataSource: ICountry[] = [];
  columns: string[] = ['code', 'name'];
  length: number = 0;
  page: number = 0;
  pageSize: number = 20;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  loading = true;

  constructor(
    private countryService: CountryService,
    private snackBar: MatSnackBar,
    private store: Store<{country: ICountry[]}>,
    private router: Router
  ) {
    this.store.select('country')
    .subscribe((countries) => {
      this.countries = countries;
      this.length = this.countries.length;
      this.dataSource = this.countries.slice(this.page * this.pageSize, this.pageSize * (this.page + 1));
    });
  }

  ngOnInit(): void {
    this.countryService.list()
    .subscribe({
      next: ({ countries }) => {
        this.store.dispatch(set({ countries }));
      },
      complete: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
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
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.dataSource = this.countries.slice(this.page * this.pageSize, this.pageSize * (this.page + 1));
  }

}
