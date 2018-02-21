import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Account } from '../../models/account.model'

@Component({
	selector: 'app-account-edit',
	templateUrl: './account-edit.component.html',
	styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

	@ViewChild(NgForm) form;

	account: Account;
	accountActive: boolean;
	accountDayOfMonth: number;
	accountName: string;
	data: any;

	constructor(public dialogRef: MatDialogRef<AccountEditComponent>, @Inject(MAT_DIALOG_DATA) data: any, private httpClient: HttpClient) {
		if(data && data.data) {
			this.account = data.data;
			this.accountName = this.account.Name;
			this.accountDayOfMonth = this.account.DayOfMonth;
			this.accountActive = this.account.Active;
			this.data = data;
		}
		else
			this.account = new Account();
	}

	ngOnInit() {}

	SaveAccount() {
		if(!this.form.valid)
			return;

		if(!this.account)
			this.account = new Account();

		this.account.Name = this.accountName;
		this.account.DayOfMonth = this.accountDayOfMonth;

		if(this.account != null && this.account._id != null && this.account._id.$oid != null && this.account._id.$oid != '')
		{
			this.account.Active = this.accountActive;
			this.httpClient.put('/api/account/' + this.account._id.$oid, this.account).subscribe(
				data => { }
			);
		}
		else
		{
			this.account.Active = true;
			this.httpClient.post('/api/account', this.account).subscribe(
				data => { }
			);
		}

		this.dialogRef.close(true);
	}
}