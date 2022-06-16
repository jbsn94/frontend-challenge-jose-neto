import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HolidayService } from 'src/app/service/holiday/holiday.service';
import { ICountry } from 'src/interface/country';
import { IHoliday } from 'src/interface/holiday';
import { findCountry } from 'src/store/country/country.selector';
import { set } from 'src/store/holiday/holiday.actions';
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
  length: number = 0;
  page: number = 0;
  pageSize: number = 20;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  loading = true;
  date = new Date()
  constructor(
    private store: Store<{country: ICountry[], holiday: IHoliday[]}>,
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
        this.store.dispatch(set({ holidays }));
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
