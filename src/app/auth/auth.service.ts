import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from './credentials.interface';
import { environment } from 'src/environments/environment';
import { Token } from './token.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import jwt_decode from 'jwt-decode'
import { User } from './user.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.hasToken())
      this.decodeAndNotify();
  }

  login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(API_URL + '/login', credentials)
          .pipe(
            tap(res => this.handleSuccessLogin(res))
          );
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  private handleSuccessLogin(res: Token) {
    const token = res.token;
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken() as string;
    let user: User = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
  }

}
