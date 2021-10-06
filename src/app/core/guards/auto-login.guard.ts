import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { AuthService } from '../services/auth/auth.service';
import { StoreService } from '../services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  constructor(private router: Router,
              private cacheService: CacheService,
              private authService: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Ajouter logique de redirection en cas de non authentification
    if (this.cacheService.getToken()) {
      this.authService.setUserConnectionStatus(true)
      this.router.navigate(['/user-account']);
      return false;
    }
    return true;
  }

}
