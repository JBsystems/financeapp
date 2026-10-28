import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private apiUrl = 'http://localhost:8080/api/v1/accounts';

    constructor(private http: HttpClient) { }

    createAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrl, account);
    }

    getAllAccountsByUser(userId: number): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.apiUrl}/user/${userId}`);
    }

    deleteAccount(accountId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${accountId}`);
    }

    editAccount(userId: number, accountId: number, balance:number): Observable<any> {
      return this.http.patch(`${this.apiUrl}/user/${userId}/${accountId}`, balance);
    }
}
