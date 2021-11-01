import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user =>{
      if (user){
        this.model = user;
      }
    });
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (Response) => {},
      (error) => {
        console.error(error);
      }
    );
  }
  logOut() {
    this.accountService.logout();
  }
}
