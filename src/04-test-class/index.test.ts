import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(1);
    expect(() => account.withdraw(10)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(10)).toThrow('Insufficient funds: cannot withdraw more than 1');
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(0);
    expect(() => account1.transfer(100000000, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(10000000);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(0);
    account.deposit(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(10);
    const account2 = getBankAccount(5);
    account1.transfer(3, account2);
    expect(account1.getBalance()).toBe(7);
    expect(account2.getBalance()).toBe(8);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(1);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(2);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(2);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(10000000000);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
    await expect(account.synchronizeBalance()).rejects.toThrow('Synchronization failed');
  });
});
