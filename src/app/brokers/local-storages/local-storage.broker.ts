import { EventEmitter, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { UserCredentials } from 'src/app/models/user-credentials/user-credential.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageBroker {
  private claims = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/';
  tokenKey = 'authToken';
  userAuthenticated: EventEmitter<boolean> = new EventEmitter<boolean>();

  public readUserCredential(): UserCredentials {
    return this.mapUserCredentials();
  }

  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  public storeToken(token: string): string {
    localStorage.setItem(this.tokenKey, token);
    this.userAuthenticated.emit(true);
    return token;
  }

  public logout(): void {
    this.userAuthenticated.emit(false);
    localStorage.removeItem(this.tokenKey);
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token != null) {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate < new Date();
    }
    return true;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  private decodeToken(): string | null {
    let authToken = localStorage.getItem(this.tokenKey);

    return jwtDecode(authToken!);
  }

  private mapUserCredentials() {
    const authToken = localStorage.getItem(this.tokenKey);
    const decodedToken: any = jwtDecode(authToken!);
    return {
      Id: decodedToken[this.claims + 'nameidentifier'],
      FirstName: decodedToken[this.claims + 'name'],
      Email: decodedToken[this.claims + 'emailaddress'],
      Role: decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ],
      TeamId: decodedToken['teamId'],
    };
  }
}
