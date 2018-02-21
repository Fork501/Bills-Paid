import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-bills-edit',
	templateUrl: './bills-edit.component.html',
	styleUrls: ['./bills-edit.component.css']
})
export class BillsEditComponent implements OnInit {

	@ViewChild(NgForm) form;

	accounts: Account[] = [];

	constructor(private httpClient: HttpClient) { }

	ngOnInit() {
		this.GetAccounts();
	}

	GetAccounts() {
		this.httpClient.get<Account>('/api/account').subscribe(
			data => {
				let results: Account[] = [];
				for(var i in data)
					results.push(JSON.parse(data[i]));

				this.accounts = results;
			}
		);
	}

	SaveBill() {
		if(!this.form.valid)
			console.log('Unable to save');
		else
			console.log('Should have saved');
	}
}