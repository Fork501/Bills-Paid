import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

import { Account } from '../../models/account.model'
import { Bill } from '../../models/bill.model'
import { MongoId } from '../../models/mongo-id.model';
import { AccountEditComponent } from '../../accounts/account-edit/account-edit.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
	billId: MongoId;

	constructor(public dialogRef: MatDialogRef<AccountEditComponent>, @Inject(MAT_DIALOG_DATA) data: any, private httpClient: HttpClient) {
		if(data && data.data) {
			console.log(data.data);
			this.bill = data.data;
			this.billAccountId = this.bill.AccountId;
			this.billAmount = this.bill.Amount;
			this.billDate = this.GetDateFromAPIDateObject(this.bill.Date);
			this.billId = this.bill._id;
		}
		else
			this.bill = new Bill();
	}

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

	GetDateFromAPIDateObject(dateToParse) : Date {
		if(dateToParse && dateToParse.$date)
		{
			var dateToReturn = new Date(dateToParse.$date).toLocaleDateString("en-US", { timeZone: 'UTC' });
			return new Date(dateToReturn);
		}
	}

	SaveBill() {
		if(!this.form.valid)
			return;

		this.bill.AccountId = this.billAccountId;
		this.bill.Amount = this.billAmount;
		this.bill.Date = this.billDate;
		this.bill._id = this.billId;

		this.httpClient.post('/api/bills', this.bill).subscribe(
			data => {
				this.dialogRef.close(true);				
			}
		);
	}
}