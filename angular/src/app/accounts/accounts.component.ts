import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Account } from '../models/account.model'
import { AccountEditComponent } from './account-edit/account-edit.component'

import { ConfirmationBox } from '../confirmation-box/confirmation-box.service'
import { ResponseMessage } from '../models/response-message';
import { Settings } from '../app.settings'

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css'],
	entryComponents: [ AccountEditComponent ]
})
export class AccountsComponent implements OnInit {

	account = new Account();
	accounts = new MatTableDataSource();
	displayedColumns = [ 'Options', 'Name', 'Amount', 'DayOfMonth' ];
	totalAccountsActive = 0;
	totalAccountsInactive = 0;

	@BlockUI('accountsTable') accountsTableBlock : NgBlockUI;

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
				this.httpClient.delete(Settings.API_BASE + '/api/account/' + account._id.$oid).subscribe(
					(data : ResponseMessage) => {
						if(!data.Success)
							this.ShowFailureMessage(data.Message);
						else
							this.GetAccountsAndShowSuccess();
					}
				);
		});
	}

	GetAccounts() {
		this.accountsTableBlock.start();
		this.httpClient.get<Account>(Settings.API_BASE + '/api/account').subscribe(
			data => {
				let results: Account[] = [];
				for(var i in data)
					results.push(JSON.parse(data[i]));

				this.accounts.data = results;
				this.GetAccountsCount();
				this.accountsTableBlock.stop();
			}
		);
	}

	GetAccountsAndShowSuccess() {
		this.GetAccounts();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}

	GetAccountsCount() {
		this.totalAccountsActive = this.totalAccountsInactive = 0;

		for(var a in this.accounts.data)
		{
			if((<Account>this.accounts.data[a]).Active)
				this.totalAccountsActive += 1;
			else
				this.totalAccountsInactive += 1;
		}
	}

	GetDollarString(money) {
		return "$" + <string>parseFloat(money).toFixed(2)
	}

	OpenAccountEdit(account) {
		this.dialog.open(AccountEditComponent, { height: '300 px', data: { data: account } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetAccountsAndShowSuccess();
		});
	}

	OpenAccountNew() {
		this.dialog.open(AccountEditComponent, { height: '300 px', data: { data: null } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetAccountsAndShowSuccess();
		});
	}

	ShowFailureMessage(msg) {
		this.snackbar.open(`Request Failed: ${msg}`, null, { duration: 2000 });
	}
}