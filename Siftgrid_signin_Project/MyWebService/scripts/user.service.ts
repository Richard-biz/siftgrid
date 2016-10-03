﻿import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, HTTP_PROVIDERS } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    
    constructor(private http: Http) { }
    private usersUrl = 'http://localhost:8414/api/data';  // URL to web API

    getUsers(): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', });
        return this.http.get(this.usersUrl, headers)
            .map((res: Response) => res.json())
            .publishReplay(-1)
            .refCount()
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    //
    getUserById(id: string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.usersUrl}/${id}`, headers)
            .map((res: Response) => res.json())
            .publishReplay(-1)
            .refCount()
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    addUser(body: Object): Observable<any[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.usersUrl, body, options) // ...using post request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    // Update a comment
    updateUser(body: Object): Observable<any[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.usersUrl}/${body['id']}`, body, options) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }

    // Delete a comment
    removeUser(id: string): Observable<any[]> {
        return this.http.delete(`${this.usersUrl}/${id}`) // ...using put request
            .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
}

