import { Injectable } from '@angular/core';

import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class JWTServiceService {

  constructor(private auth: AuthServiceService) { }

  /**
   * Checks to see if they have a valid auth token
   * @returns {boolean}
   */
  checkToken(): string {
    if (this.auth.getToken()) {
      return this.auth.getToken();
    } else {
      return '';
    }
  }
}
