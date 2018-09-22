import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Account } from '../../models/account.model'
import { Settings } from '../../app.settings'

@Component({
	selector: 'app-account-edit',
	templateUrl: './account-edit.component.html',
	styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

	@ViewChild(NgForm) form;

	account: Account;
	accountActive: boolean;
	accountAmount: number;
	accountDayOfMonth: number;
	accountName: string;

	constructor(public dialogRef: MatDialogRef<AccountEditComponent>, @Inject(MAT_DIALOG_DATA) data: any, private httpClient: HttpClient) {
		if(data && data.data) {
			this.account = data.data;
			this.accountName = this.account.Name;
			this.accountDayOfMonth = this.account.DayOfMonth;
			this.accountActive = this.account.Active;
			this.accountAmount = this.account.Amount;
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
		this.account.Amount = this.accountAmount;

		if(this.account != null && this.account._id != null && this.account._id.$oid != null && this.account._id.$oid != '')
		{
			this.account.Active = this.accountActive;
			this.httpClient.put(Settings.API_BASE + '/api/account/' + this.account._id.$oid, this.account).subscribe(
				data => {
					this.dialogRef.close(true);
				}
			);
		}
		else
		{
			this.account.Active = true;
			this.httpClient.post(Settings.API_BASE + '/api/account', this.account).subscribe(
				data => {
					this.dialogRef.close(true);
				}
			);
		}
	}
}