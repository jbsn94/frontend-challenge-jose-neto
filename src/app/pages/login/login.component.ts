import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISession } from 'src/interface/session';
import { set } from 'src/store/actions/session.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private store: Store<{session: ISession}>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit () {
    this.store.dispatch(set({isAuthenticated: true}));
    this.router.navigate(['/']);
  }

}
