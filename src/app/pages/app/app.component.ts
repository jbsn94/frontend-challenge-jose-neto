import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISession } from 'src/interface/session';
import { set } from 'src/store/session/session.actions';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<{session: ISession}>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  logOut() {
    this.store.dispatch(set({isAuthenticated: false}));
    this.router.navigate(['/login']);
  }

}
