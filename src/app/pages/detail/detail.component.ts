import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HolidayService } from 'src/app/service/holiday/holiday.service';
import { ICountry, ICountryStoreState } from 'src/interface/country';
import { IHoliday } from 'src/interface/holiday';
import { findCountry } from 'src/store/selectors/country.selector';
import { HolidayActions } from 'src/store/actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country: ICountry | null = null;
  code: string;
  holidays: IHoliday[] = [];
  dataSource: IHoliday[] = [];
  columns: string[] = ['name', 'local_name', 'date', 'regions', 'types'];
  loading = true;
  date = new Date()
  constructor(
    private store: Store<{country: ICountryStoreState, holiday: IHoliday[]}>,
    private route: ActivatedRoute,
    private router: Router,
    private holidayService: HolidayService,
    private snackBar: MatSnackBar,
  ) { 
    this.code = this.route.snapshot.params['code'];
  }

  ngOnInit(): void {
    this.store.select(findCountry(this.code)).subscribe((country) => {
      if (country) {
        this.country = country;
      }
    });

    this.store.select('holiday')
    .subscribe((holidays) => {
      this.dataSource = holidays;
    });

    this.load();
  }

  load() {
    this.loading = true;
    this.holidayService.list(this.code, this.date.getFullYear())
    .subscribe({
      next: ({ holidays }) => {
        this.store.dispatch(HolidayActions.set({ holidays }));
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
    })
  }

  changed() {
    this.load();
  }

  back() {
    this.router.navigate(['/']);
  }

}
