import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Paycheck } from '../../models/paycheck.model'
import { Settings } from '../../app.settings'

@Component({
	selector: 'app-paycheck-edit',
	templateUrl: './paycheck-edit.component.html',
	styleUrls: ['./paycheck-edit.component.css']
})
export class PaycheckEditComponent implements OnInit {

	@ViewChild(NgForm) form;

	paycheck: Paycheck;
	paycheckAmount: number;
	paycheckDate: Date;

	constructor(public dialogRef: MatDialogRef<PaycheckEditComponent>, @Inject(MAT_DIALOG_DATA) data: any, private httpClient: HttpClient) {
		if(data && data.data) {
			this.paycheck = data.data;
			this.paycheckDate = this.paycheck.Date;
			this.paycheckAmount = this.paycheck.Amount;
		}
		else
			this.paycheck = new Paycheck();
	}

	ngOnInit() {}

	SavePaycheck() {
		if(!this.form.valid)
			return;

		if(!this.paycheck)
			this.paycheck = new Paycheck();

		this.paycheck.Date = this.paycheckDate;
		this.paycheck.Amount = this.paycheckAmount;

		if(this.paycheck != null && this.paycheck._id != null && this.paycheck._id.$oid != null && this.paycheck._id.$oid != '')
		{
			this.httpClient.put(Settings.API_BASE + '/api/paycheck/' + this.paycheck._id.$oid, this.paycheck).subscribe(
				data => {
					this.dialogRef.close(true);
				}
			);
		}
		else
		{
			this.httpClient.post(Settings.API_BASE + '/api/paycheck', this.paycheck).subscribe(
				data => {
					this.dialogRef.close(true);
				}
			);
		}
	}
}