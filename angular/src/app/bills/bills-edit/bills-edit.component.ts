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
	billAccountId: string;
	billAmount: number;
	billDate: Date;
	billId: MongoId;

	minDate: Date;
	maxDate: Date;
	
	constructor(
		public dialogRef: MatDialogRef<AccountEditComponent>,
		@Inject(MAT_DIALOG_DATA) data: any,
		@Inject(MAT_DIALOG_DATA) queryDate: any,
		private httpClient: HttpClient
	) {
		if(data && data.data) {
			this.bill = data.data;
			this.billAccountId = this.bill.AccountId.$oid;
			this.billAmount = this.bill.Amount;
			this.billDate = this.GetDateFromAPIDateObject(this.bill.Date);
			this.billId = this.bill._id;

			this.GetMinAndMax();
		}
		else
		{
			this.bill = new Bill();
			this.bill.AccountId = new MongoId();
			let dt = queryDate.queryDate;
			this.billDate = new Date(dt.getFullYear(), dt.getMonth(), 1);
		}
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
		return dateToParse;
	}

	GetMinAndMax() {
		this.minDate = new Date(this.billDate.getFullYear(), this.billDate.getMonth(), 1);
		this.maxDate = new Date(this.billDate.getFullYear(), this.billDate.getMonth() + 1, 0);
	}

	SaveBill() {
		if(!this.form.valid)
			return;

		let billToSave = new Bill();
		billToSave._id = this.billId;
		billToSave.AccountId = new MongoId();
		billToSave.AccountId.$oid = this.billAccountId;
		billToSave.Amount = this.billAmount;
		billToSave.Date = new Date(this.billDate);

		if(!billToSave._id)
		{
			this.httpClient.post('/api/bills', billToSave).subscribe(
				data => {
					this.dialogRef.close(true);				
				}
			);
		}
		else
		{
			this.httpClient.put('/api/bills/' + billToSave._id.$oid, billToSave).subscribe(
				data => {
					this.dialogRef.close(true);				
				}
			);
		}
	}
}