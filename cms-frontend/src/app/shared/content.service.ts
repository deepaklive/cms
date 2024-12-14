import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.baseUrl +'/content/';

  constructor(private http: HttpClient) {}

  getContent(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteContent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }

  // Method to call the backend API to create content
  createContent(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // Assuming token is stored in localStorage
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // Method to call the backend API to edit content
  editContent(contentId: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // Assuming token is stored in localStorage
    });

    return this.http.put(this.apiUrl + `${contentId}/`, formData, { headers });
  }
}
