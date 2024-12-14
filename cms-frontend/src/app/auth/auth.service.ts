import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }

  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  clearToken(): void {
    sessionStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  changePassword(old_password: string, new_password: string) {
    const data = { old_password, new_password };
    return this.http.post(`${this.apiUrl}change_password/`, data);
  }
}
