import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl; // Replace with your backend URL

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl + 'auth/', { username, password });
  }

  storeToken(username:string, token: string): void {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('authToken', token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  getUserName(): string | null {
    return sessionStorage.getItem('username');
  }

  clearToken(): void {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  changePassword(old_password: string, new_password: string) {
    const data = { old_password, new_password };
    return this.http.post(this.apiUrl + 'change_password/', data);
  }
}
