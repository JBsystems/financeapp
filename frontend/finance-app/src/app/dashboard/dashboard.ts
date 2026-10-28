import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  template: `<div class="dashboard-container">
  <nav class="dashboard-nav">
    <div class="nav-brand">
      <h2>Personal Finance Tracker</h2>
    </div>
    <div class="nav-user">
      <span>Welcome back, {{ userName }}!</span>
      <a routerLink="/" class="btn-logout">Logout</a>
    </div>
  </nav>

  <div class="dashboard-content">
    <div class="dashboard-header">
      <h1> {{ userName }}, Finance Dashboard</h1>
      <p>Manage your money</p>
    </div>
      <!-- Accounts List Card -->
      <div class="dashboard-card">
        <h3>Accounts</h3>
        @if (accounts.length > 0) {
        <div class="accounts-list">
          @for (account of accounts; track account.accountId) {
          <div class="account-item">
            <div class="account-info">
              <span class="account-name">{{ account.nickname }}</span>
            </div>
            <div class="account-actions">
              <span class="account-balance">{{ account.balance | currency }}</span>
              <button class="btn-edit" (click)="editAccountModal(account.accountId!)" title="Edit Account">
                <i class="edit"></i> Edit
              </button>
              <button class="btn-delete" (click)="deleteAccountModal(account.accountId!)" title="Delete Account">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
          }
        </div>
        } @else {
        <p class="no-data">No accounts to show. Add your first of many accounts!</p>
        }
      </div>
      <!-- Add Account Button Card -->
      <div class="dashboard-card add-account-card">
        <h3>Add New Account</h3>
        <p>Simply add the balance of your bank accounts, credit cards, loans, investments, and other financial assets to track
        </p>
        <button class="btn-add-account" (click)="openAddAccountModal()">+ Add Account</button>
      </div>
    </div>
  </div>
<!-- Delete Confirmation Modal -->
@if (showDeleteModal) {
<div class="modal-overlay">
  <div class="modal-content">
    <h3>Delete Account</h3>
    <p>This action cannot be undone once deleted.</p>
    <div class="modal-actions">
      <button class="btn-confirm-delete" (click)="deleteAccount(accountToDeleteId!)">Delete</button>
      <button class="btn-cancel" (click)="showDeleteModal = false">Cancel</button>
    </div>
  </div>
</div>
}
  <!-- Edit Account -->
  @if (showEditModal) {
    <div class="modal-overlay">
      <div class="modal-content">
        <h3>Edit Account</h3>

        <label for="balance">Update Balance</label>
        <input type="text"
               id="balance"
               [(ngModel)]="formattedBalance"
               (input)="formatBalance($event)"
               class="form-control"
               placeholder="$0.00">

        <div class="modal-actions">
          <button class="btn-cancel" (click)="closeAddAccountModal()">Cancel</button>

          <button class="btn-edit"
                  (click)="editAccount(accountToEditId!, totalBalance)"
                  [disabled]="isLoading">
            @if (isLoading) { Updating... } @else { Update Account }
          </button>
        </div>

      </div>
    </div>
  }

<!-- Add Account Modal -->
@if (showAddModal && account) {
<div class="modal-overlay">
  <div class="modal-content">
    <h3>Add New Account</h3>
    <div class="form-group">
      <label for="accountType">Account Type</label>
      <select id="accountType" [(ngModel)]="account.accountType" class="form-control">
        <option value="" disabled selected>Select Account</option>
        @for (type of accountTypes; track type) {
        <option [value]="type">{{ type.replace('_', ' ') | titlecase }}</option>
        }
      </select>
    </div>

    @if (account.accountType) {
    <div class="form-group">
      <label for="nickname">Account Name</label>
      <input type="text" id="nickname" [(ngModel)]="account.nickname" class="form-control"
        placeholder="Cool Account Name">
    </div>
    <div class="form-group">
      <label for="balance">Current Balance</label>
      <input type="text" id="balance" [ngModel]="formattedBalance" (input)="formatBalance($event)" class="form-control"
        placeholder="$0.00">
    </div>

    @if (showDueDay(account.accountType)) {
    <div class="form-group conditional">
      <label for="dueDay">Due Day</label>
      <input type="number" id="dueDay" [(ngModel)]="account.dueDay" class="form-control" placeholder="Day (1-31)"
        min="1" max="31">
      <small class="text-muted">Day of the month payment is due</small>
    </div>
    }

    @if (showInterestAccountFields(account.accountType)) {
    <div class="form-group conditional">
      <label for="interestRate">Interest Rate (%)</label>
      <input type="number" id="interestRate" [(ngModel)]="account.interestRate" class="form-control" placeholder="0.00">
    </div>
    <div class="form-group conditional">
      <label for="minimumPayment">Minimum Payment</label>
      <input type="text" id="minimumPayment" [ngModel]="formattedMinPayment" (input)="formatMinPayment($event)"
        class="form-control" placeholder="$0.00">
      <small class="text-muted">Minimum monthly payment</small>
    </div>
    }
    <div class="modal-actions">
      <button class="btn-cancel" (click)="closeAddAccountModal()">Cancel</button>
      <button class="btn-confirm-add" (click)="addAccount(account!)" [disabled]="isLoading || !account.accountType">
        @if (isLoading) { Saving... } @else { Save Account }
      </button>
    </div>
    } @else {
    <div class="modal-actions">
      <button class="btn-cancel" (click)="closeAddAccountModal()">Cancel</button>
    </div>
    }
  </div>
</div>
}`,
  styles: [`.dashboard-container {
    min-height: 100vh;
    background-color: #050505;
    background-image: radial-gradient(circle at 10% 10%, rgba(30, 30, 30, 0.4) 0%, transparent 40%);
    font-family: 'Inter', sans-serif;
    color: white;
  }

  .dashboard-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 2rem;
    background: rgba(5, 5, 5, 0.8);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .nav-brand h2 {
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    font-family: 'Outfit', sans-serif;
    letter-spacing: -0.02em;
  }

  .nav-user {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-user span {
    color: #a0a0a0;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .btn-logout {
    background: rgba(220, 38, 38, 0.1);
    color: #ef4444;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid rgba(220, 38, 38, 0.2);
    transition: all 0.3s ease;
  }

  .btn-logout:hover {
    background: rgba(220, 38, 38, 0.2);
    transform: translateY(-1px);
  }

  .dashboard-content {
    padding: 2.5rem 2rem;
    max-width: 1300px;
    margin: 0 auto;
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dashboard-header {
    margin-bottom: 3rem;
  }

  .dashboard-header h1 {
    color: #ffffff;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.02em;
  }

  .dashboard-header p {
    color: #888;
    font-size: 1.1rem;
  }

  .dashboard-card {
    background: rgba(20, 20, 20, 0.6);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }

  /* Subtle gradient glow on hover */
  .dashboard-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .dashboard-card:hover::after {
    opacity: 1;
  }

  .dashboard-card h3 {
    color: #a0a0a0;
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .transaction span:first-child {
    color: #ccc;
    font-weight: 500;
  }

  .transaction span:last-child {
    font-weight: 600;
    font-family: 'Outfit', sans-serif;
  }

  @media (max-width: 768px) {
    .dashboard-nav {
      padding: 1rem;
    }

    .dashboard-content {
      padding: 1.5rem 1rem;
    }

    .dashboard-header h1 {
      font-size: 2rem;
    }
  }

  select#accountType.form-control {
    width: 100%;
    background-color: #1a1a1a;
    color: #ffffff;
    border: 1px solid #2e2e2e;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: border-color 0.15s ease;
  }

  select#accountType.form-control:focus {
    outline: none;
    border-color: #555555;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05);
  }

  /* Add Account Button */
  .btn-add-account {
    background: #1a1a1a;
    color: #fff;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    width: 25%;
    transition: background 0s ease, transform 0.1s ease, box-shadow 0.2s ease;
  }

  .btn-add-account:hover {
    background: #262626;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .btn-add-account:active {
    transform: scale(0.98);
  }

  .add-account-card p {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  /* No data message */
  .no-data {
    color: #666;
    font-size: 0.95rem;
    padding: 1rem 0;
  }

  /* Account Items */
  .accounts-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .account-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateX(4px);
  }

  .account-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .account-name {
    color: #fff;
    font-weight: 600;
    font-size: 1rem;
  }

  .account-balance {
    color: #4ade80;
    margin-right: 5px;
    font-weight: 700;
    font-size: 1.1rem;
    font-family: 'Outfit', sans-serif;
  }

  .account-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .btn-edit {
    background: transparent;
    border: 0 solid black;
    color: floralwhite;
    padding: 0.25rem 0.75rem;
    margin-right: -20px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.8rem;
  }

  .btn-delete {
    background: transparent;
    border: 0 solid black;
    color: floralwhite;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.8rem;
  }

  .btn-delete:hover {
    background: grey;
    color: white;
  }

  /* Animations */
  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .form-group.conditional {
    animation: fadeInSlide 0.3s ease-out forwards;
  }

  .text-muted {
    display: block;
    font-size: 0.8rem;
    color: #888;
    margin-top: 0.35rem;
    font-style: italic;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal-content {
    background: #1a1a1a;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0);
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  .btn-cancel {
    background: transparent;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  /* Motion for the button */
  .btn-cancel::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: 0.5s;
  }

  .btn-cancel:hover {
    transform: translateY(-2px);
  }

  .btn-cancel:hover::after {
    left: 100%;
  }

  .btn-cancel:active {
    transform: translateY(0);
  }

  .btn-confirm-delete {
    background: darkred;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
  }

  /* Form Styles */
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: grey;
    font-size: 0.9rem;
  }

  .form-control {
    width: 100%;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-family: inherit;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .form-control:focus {
    border-color: darkred;
  }

  .form-control option {
    background: #1a1a1a;
    color: white;
  }

  .btn-confirm-add {
    background: transparent;
    border: none;
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  .btn-confirm-add:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px black;
  }

  .btn-confirm-add:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }`]
})
export class DashboardComponent {
  accounts: Account[] = [];
  totalBalance: number = 0;
  userName: string = '';
  private userId: number = 0;
  showAddModal: boolean = false;
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;
  accountToDeleteId: number | null = null;
  accountToEditId: number | null = null;

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
          this.toastr.success('Account added');
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
    const dueDayTypes = ['MORTGAGE', 'RENT', 'CREDIT_CARD', 'PERSONAL_LOAN', 'CAR_LOAN', 'AFFIRM', 'AFTER_PAY', 'KLARNA', 'SCHOOL_LOAN'];
    return dueDayTypes.includes(type);
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.loadAccounts();
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

  editAccount(accountId: number, balance: number) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.closeEditAccountModal();


    this.accountService.editAccount(this.userId, accountId, balance).subscribe({
      next: () => {
        this.ngZone.run(() => {
          console.log("user account updated");
          this.isLoading = false;
          this.toastr.success('Account Updated');
          this.loadAccounts()
          this.cdr.detectChanges();
        });
      },
      error: (error: HttpErrorResponse) => {
        this.ngZone.run(() => {
          console.error('Error updating account: ', error);
          this.isLoading = false;
          this.toastr.error('Failed to update account', 'Error');
          this.cdr.detectChanges();
        });
      }
    });
  }

  editAccountModal(accountId: number) {
    this.accountToEditId = accountId;
    this.account = {
      userId: this.userId,
      balance: 0,
    } as Account;
    this.formattedBalance = '';
    this.formattedMinPayment = '';
    this.showEditModal = true;
  }

  closeEditAccountModal() {
    this.showAddModal = false;
    this.account = null;
    this.formattedBalance = '';
    this.isLoading = false;
  }

  formatBalance(event: Event) {
    const input = event.target as HTMLInputElement;
    const data = input.value;
    const { formatted, raw } = this.moneyFormatting(data);
    this.formattedBalance = formatted;
    input.value = formatted;
    if (this.account) {
      this.account.balance = raw;
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
