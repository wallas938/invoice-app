import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { AuthService } from '../../services/auth/auth.service';

//// Services ////
import { StoreService } from '../../services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: StoreService,
              private authService: AuthService,
              private cacheService: CacheService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Ajouter logique de redirection en cas de non authentification
    let canActivateValue!: boolean | UrlTree;
    this.store.isConnected$
                .pipe(
                  tap((status: boolean) => {
                    canActivateValue = status ? true : this.router.createUrlTree(['/home']);
                  })).subscribe();
    return of(canActivateValue);
  }

}
