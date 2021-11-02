import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterState,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private acountService: AccountService,
    private tostr: ToastrService
  ) {}
  canActivate(rout: ActivatedRouteSnapshot): Observable<boolean> {
    return this.acountService.currentUser$.pipe(
      map((usr) => {
        if (usr) return true;
        let routUrl = '';
        for(const [key, value] of Object.entries(rout)){
          routUrl =  (value && value.url)? value.url : '';
        }
        this.tostr.error(`PLease register to access ${routUrl}`);

        return false;
      })
    );
  }
}
