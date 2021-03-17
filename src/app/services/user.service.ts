import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/account';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private http : HttpClient) {}

    getAll(): Observable<any> {
        return this.http.get(baseUrl);
    }

    get(id): Observable<any> {
        return this.http.get(`${baseUrl}/${id}`);
    }

    create(data): Observable<any> {
        return this.http.post(baseUrl, data);
    }

    update(id, data): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, data);
    }

    delete(id): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(baseUrl);
    }

    findByTitle(title): Observable<any> {
        return this.http.get(`${baseUrl}?title=${title}`);
    }
}