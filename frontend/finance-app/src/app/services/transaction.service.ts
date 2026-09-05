import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/v1/transactions';

  constructor(private http: HttpClient) { }

  // getTransactionByTransactionId(transactionId: number): Observable<Transaction> {
    // return this.http.get<Transaction>(`${this.apiUrl}/transaction/${transactionId}`);
  // }

  // transfer(transactionId: number): Observable<Transaction> {
    // return this.http.post<Transaction>(this.apiUrl, transactionId);
  // }

}
