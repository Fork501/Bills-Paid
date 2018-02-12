import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from '../models/account.model'

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

	account = new Account();

	totalAccounts = 0;

	constructor(private httpClient: HttpClient) {
		this.account.Name = "My account";
	}

  	ngOnInit() { }

	GetAccounts() {
		this.httpClient.get('/api/account').subscribe(
			data => {
				console.log("Data");
				console.log(data);
				this.totalAccounts = +data;
      		}
		);
	}

	SaveAccount() {
		this.httpClient.post('/api/account', this.account).subscribe(
			data => {
        		console.log(data);
      		}
		);
	}
}
