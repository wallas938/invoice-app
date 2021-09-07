import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private domSanitizer: DomSanitizer) { }

  generateSrcSafeUrl(data: any): string | null {
    return this.domSanitizer.sanitize(SecurityContext.URL, data);
  }
}
