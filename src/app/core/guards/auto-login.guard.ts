import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/shared/services/cache/cache.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  constructor(private router: Router,
    private cacheService: CacheService,
    private authService: AuthService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Ajouter logique de redirection en cas de non authentification

    if (this.cacheService.getToken() && (+this.cacheService.getTokenExp()! > +Date.now())) {
      this.authService.setUserConnectionStatus(true);
      this.authService.setExpiredTokenStatus(false);
      this.router.navigate(['/user-account']);
      return false;
    } else if (this.cacheService.getToken() && (+Date.now() > +this.cacheService.getTokenExp()!)) {
      this.authService.setExpiredTokenStatus(true);
      this.authService.setUserConnectionStatus(false);
      return true;
    }
    this.authService.setUserConnectionStatus(false);
    return true;
  }

}
