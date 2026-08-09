import { Component, ChangeDetectorRef, NgZone, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  accounts: Account[] = [];
  totalBalance: number = 0;
  userName: string = '';
  private userId: number = 0;
  showAddModal: boolean = false;
  showDeleteModal: boolean = false;
  accountToDeleteId: number | null = null;
  accountForm!: FormGroup;
  submitted = false;

  account: Account | null = null;
  isLoading: boolean = false;
  formattedBalance: string = '';
  formattedMinPayment: string = '';
  accountTypes: string[] = [
    'CHECKING', 'SAVINGS', 'MORTGAGE', 'RENT', 'CREDIT_CARD', 'AFFIRM', 'AFTER_PAY',
    'KLARNA', 'PERSONAL_LOAN', 'SCHOOL_LOAN', 'CAR_LOAN'
  ];

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    const user = this.authService.currentUser;
    console.log('Current User Dashboard:', user);
    if (user) {
      this.userName = user.firstName;
      this.userId = user.userId ?? 0;
      this.loadAccounts();
    }
  }

  loadAccounts() {
    this.accountService.getAllAccountsByUser(this.userId).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.totalBalance = this.accounts.reduce((total, account) => total + account.balance, 0);
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading accounts:', error);
        this.toastr.error('Failed to load accounts', 'Error');
      }
    });
  }

  validateAccount(account: Account): boolean {
    if (!account.accountType) {
      this.toastr.error('Account type is required');
      return false;
    }

    if (this.showInterestAccountFields(account.accountType)) {
      if (account.dueDay && (account.dueDay < 1 || account.dueDay > 31)) {
        this.toastr.error('Due day must be between 1 and 31');
        return false;
      }
    }

    if (this.showDueDay(account.accountType)) {
      if (account.dueDay && (account.dueDay < 1 || account.dueDay > 31)) {
        this.toastr.error('Choose a due day between 1 & 31');
        return false;
      }
    }
    return true;
  }

  addAccount(account: Account) {
    if (!this.validateAccount(account)) return;
    if (this.isLoading) return;
    this.isLoading = true;
    this.closeAddAccountModal();

    this.accountService.createAccount(account).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          console.log(response);
          this.isLoading = false;
          this.toastr.success('Account added successfully');
          this.loadAccounts();
          this.cdr.detectChanges();
        });
      },
      error: (error: HttpErrorResponse) => {
        this.ngZone.run(() => {
          console.error('Error adding account: ', error);
          this.isLoading = false;
          this.toastr.error('Failed to add account', 'Error');
          this.cdr.detectChanges();
        });
      }
    });
  }

  private interestAccounts = ['CREDIT_CARD', 'PERSONAL_LOAN', 'CAR_LOAN', 'AFFIRM', 'AFTER_PAY', 'KLARNA', 'SCHOOL_LOAN'];

  openAddAccountModal() {
    this.account = {
      userId: this.userId,
      accountType: '' as Account['accountType'],
      balance: 0,
      amount: 0,
      nickname: ''
    } as Account;
    this.formattedBalance = '';
    this.formattedMinPayment = '';
    this.showAddModal = true;
  }

  closeAddAccountModal() {
    this.showAddModal = false;
    this.account = null;
    this.formattedBalance = '';
    this.formattedMinPayment = '';
    this.isLoading = false;
  }

  showInterestAccountFields(type: string): boolean {
    return this.interestAccounts.includes(type);
  }

  showDueDay(type: string): boolean {
    const dueDayTypes = ['MORTGAGE', 'RENT'];
    return dueDayTypes.includes(type);
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.loadAccounts();
        this.toastr.success('Account deleted successfully', 'Success');
      },
      error: (error: any) => {
        console.error('Error deleting account:', error);
        this.toastr.error('Failed to delete account', 'Error');
      }
    });
  }

  deleteAccountModal(accountId: number) {
    this.accountToDeleteId = accountId;
    this.showDeleteModal = true;
  }

  formatBalance(event: Event) {
    const input = event.target as HTMLInputElement;
    const data = input.value;
    const { formatted, raw } = this.moneyFormatting(data);
    this.formattedBalance = formatted;
    input.value = formatted;
    if (this.account) {
      this.account.balance = raw;
      this.account.amount = raw;
    }
  }

  formatMinPayment(event: Event) {
    const input = event.target as HTMLInputElement;
    const data = input.value;
    const { formatted, raw } = this.moneyFormatting(data);
    this.formattedMinPayment = formatted;
    input.value = formatted;
    if (this.account) this.account.minimumPayment = raw;
  }

  private moneyFormatting(input: string): { formatted: string, raw: number } {
    let value = input.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }

    if (!value || value === '.') {
      return {
        formatted: value === '.' ? '$0.' : '',
        raw: 0
      };
    }

    let integerPart = parts[0] || '0';
    let decimalPart = parts.length > 1 ? parts[1].substring(0, 2) : null;

    integerPart = integerPart.replace(/^0+(?=\d)/, '');
    if (integerPart === '') integerPart = '0';

    const commaInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formatted = '$' + commaInteger;
    if (decimalPart !== null) {
      formatted += '.' + decimalPart;
    }

    return {
      formatted: formatted,
      raw: parseFloat(value) || 0
    };
  }
}
