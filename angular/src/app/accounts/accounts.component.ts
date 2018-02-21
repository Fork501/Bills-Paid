import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Account } from '../models/account.model'
import { AccountEditComponent } from './account-edit/account-edit.component'

import { ConfirmationBox } from '../confirmation-box/confirmation-box.service'
import { ConfirmationDialogComponent } from '../confirmation-box/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	entryComponents: [ AccountEditComponent ]
})
export class AccountsComponent implements OnInit {

	account = new Account();
	accounts = new MatTableDataSource();
	displayedColumns = [ 'Name', 'Options' ];
	totalAccounts = 0;

	constructor(
		private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) {
		this.GetAccounts();
	}

	ngOnInit() { }

	DeleteAccount(account : Account) {
		this.confirmationBox.ShowConfirmation(`Are you sure you want to delete account ${account.Name}?`).subscribe(data => {
			if(data)
				this.httpClient.delete('/api/account/' + account._id.$oid).subscribe(
					data => {
						this.GetAccountsAndShowSuccess();
					}
				);
		});
	}

	GetAccounts() {
		this.httpClient.get<Account>('/api/account').subscribe(
			data => {
				let results: Account[] = [];
				for(var i in data){
					results.push(JSON.parse(data[i]));
				}

				this.accounts.data = results;
				this.GetAccountsCount();
			}
		);
	}

	GetAccountsCount() {
		this.httpClient.get('/api/account/count').subscribe(
			data => {
				this.totalAccounts = +data;
			}
		);
	}

	OpenAccountEdit(account) {
		this.dialog.open(AccountEditComponent, { height: '300 px', data: { data: account } }).afterClosed().subscribe(
			data => {
				if(data)
				{
					this.GetAccountsAndShowSuccess();
				}
		});
	}

	OpenAccountNew() {
		this.dialog.open(AccountEditComponent, { height: '300 px', data: { data: null } }).afterClosed().subscribe(
			data => {
				if(data)
				{
					this.GetAccountsAndShowSuccess();
				}
		});
	}

	GetAccountsAndShowSuccess() {
		this.GetAccounts();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}
}