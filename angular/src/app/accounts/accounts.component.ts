import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

import { Account } from '../models/account.model'

@Component({
	selector: 'app-accounts',
	templateUrl: './accounts.component.html',
	styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

	account = new Account();
	accounts = new MatTableDataSource();
	displayedColumns = ['Name'];
	totalAccounts = 0;

	constructor(private httpClient: HttpClient) {
		this.GetAccounts();
	}

	ngOnInit() { }

	GetAccounts() {
		this.httpClient.get<Account>('/api/account').subscribe(
			data => {
				var resluts = [];
				for(var i in data){
					resluts.push(JSON.parse(data[i]));
				}

				this.accounts.data = resluts;
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

	SaveAccount() {
		this.httpClient.post('/api/account', this.account).subscribe(
			data => {
				this.GetAccounts();
			}
		);
	}
}
