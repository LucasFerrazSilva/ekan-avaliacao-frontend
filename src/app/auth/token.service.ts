import { Injectable } from '@angular/core';

const STORAGE_TOKEN_KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem(STORAGE_TOKEN_KEY);
  }

  setToken(token: string): undefined {
    sessionStorage.setItem(STORAGE_TOKEN_KEY, token);
  }

  removeToken(): undefined {
    sessionStorage.removeItem(STORAGE_TOKEN_KEY);
  }

}
