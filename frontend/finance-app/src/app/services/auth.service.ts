import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, LoginRequest } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';
    private currentUserSubject: BehaviorSubject<User | null>;
    private readonly isBrowser: boolean;

    public currentUser$: Observable<User | null>;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        // Only access sessionStorage in browser, not during SSR
        const storedUser = this.isBrowser
            ? JSON.parse(sessionStorage.getItem('currentUser') || 'null')
            : null;

        this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/v1/users`, user);
    }

    public get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    login(credentials: LoginRequest): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/auth/login`, credentials).pipe(
            map(user => {
                if (this.isBrowser) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.currentUserSubject.next(user);
                return user;
            })
        );
    }
}
