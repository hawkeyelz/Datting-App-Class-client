import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public accountService: AccountService,
    private router: Router,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/members');
        this.model = user;
      }
    });
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(
      (Response) => {
        this.router.navigateByUrl('/members');
      },
      (error) => {
        console.error(error);
        this.tostr.error(error.error);
      }
    );
  }
  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
