import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Account } from '../../models/account.model'
import { Bill } from '../../models/bill.model'
import { MongoId } from '../../models/mongo-id.model';

@Component({
	selector: 'app-bills-edit',
	templateUrl: './bills-edit.component.html',
	styleUrls: ['./bills-edit.component.css']
})
export class BillsEditComponent implements OnInit {

	@ViewChild(NgForm) form;

	accounts: Account[] = [];
	bill: Bill;
	billAccountId: MongoId;
	billAmount: number;
	billDate: Date;

	constructor(private httpClient: HttpClient) { }

	ngOnInit() {
		this.GetAccounts();
		this.bill = new Bill();
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
			return;

		this.bill._id = this.billAccountId;
		this.bill.Amount = this.billAmount;
		this.bill.Date = this.billDate;

		this.httpClient.post('/api/bills', this.bill).subscribe(
			data => {
				console.log(data);
			}
		);
	}
}