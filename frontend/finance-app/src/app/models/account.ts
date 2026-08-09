export interface Account {
    accountId: number;
    userId: number;
    balance: number;
    amount: number;
    accountType: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'AFFIRM' | 'AFTER_PAY' | 'KLARNA' | 'PERSONAL_LOAN' | 'SCHOOL_LOAN' | 'INVESTMENT' | 'CAR_LOAN' | 'MORTGAGE' | 'RENT';
    nickname?: string;
    interestRate?: number;
    minimumPayment?: number;
    dueDay?: number;
}
