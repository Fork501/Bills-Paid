import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Account } from '../models/account.model'
import { AccountEditComponent } from './account-edit/account-edit.component'

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

	constructor(private httpClient: HttpClient, public dialog: MatDialog, public snackbar: MatSnackBar) {
		this.GetAccounts();
	}

	ngOnInit() { }

	DeleteAccount(oid) {
		alert('Deleting ' + oid)
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
					this.GetAccounts();
					this.snackbar.open('Success!', null, { duration: 2000 });
				}
		});
	}

	OpenAccountNew() {
		this.dialog.open(AccountEditComponent, { height: '300 px', data: { data: null } }).afterClosed().subscribe(
			data => {
				if(data)
				{
					this.GetAccounts();
					this.snackbar.open('Success!', null, { duration: 2000 });
				}
		});
	}
}