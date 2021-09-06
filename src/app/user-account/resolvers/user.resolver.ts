import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

//// Services ////
import { UserService } from '../../home/services/user.service';
import { StoreService } from "src/app/core/services/store/store.service";

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService,
              private store: StoreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.getUser(this.store.getUserId());
  }
}