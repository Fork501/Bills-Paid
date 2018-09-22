import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';

import { Paycheck } from '../models/paycheck.model'
import { PaycheckEditComponent } from './paycheck-edit/paycheck-edit.component'

import { ConfirmationBox } from '../confirmation-box/confirmation-box.service'
import { ResponseMessage } from '../models/response-message';
import { Settings } from '../app.settings'

@Component({
	selector: 'app-paychecks',
	templateUrl: './paychecks.component.html',
	styleUrls: ['./paychecks.component.css']
})
export class PaychecksComponent implements OnInit {

	paycheck = new Paycheck();
	paychecks = new MatTableDataSource();
	displayedColumns = [ 'Options', 'Date', 'Amount' ];
	totalPaychecks = 0;

	@BlockUI('paychecksTable') paychecksTableBlock : NgBlockUI;

	constructor(
		private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) {
		this.GetPaychecks();
	}

	ngOnInit() { }

	DeletePaycheck(paycheck : Paycheck) {
		this.confirmationBox.ShowConfirmation(`Are you sure you want to delete paycheck for ${paycheck.Date}?`).subscribe(data => {
			if(data)
				this.httpClient.delete(Settings.API_BASE + '/api/paycheck/' + paycheck._id.$oid).subscribe(
					(data : ResponseMessage) => {
						if(!data.Success)
							this.ShowFailureMessage(data.Message);
						else
							this.GetPaychecksAndShowSuccess();
					}
				);
		});
	}

	GetPaychecks() {
		this.paychecksTableBlock.start();
		this.httpClient.get<Paycheck>(Settings.API_BASE + '/api/paycheck').subscribe(
			data => {
				let results: Paycheck[] = [];
				for(var i in data)
					results.push(JSON.parse(data[i]));

				this.paychecks.data = results;
				this.GetPaychecksCount();
				this.paychecksTableBlock.stop();
			}
		);
	}

	GetPaychecksAndShowSuccess() {
		this.GetPaychecks();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}

	GetPaychecksCount() {
		this.totalPaychecks = 0;

		for(var a in this.paychecks.data)
		{
			this.totalPaychecks += 1;
		}
	}

	GetDollarString(money) {
		return "$" + <string>parseFloat(money).toFixed(2)
	}

	OpenPaycheckEdit(paycheck) {
		this.dialog.open(PaycheckEditComponent, { height: '300 px', data: { data: paycheck } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetPaychecksAndShowSuccess();
		});
	}

	OpenPaycheckNew() {
		this.dialog.open(PaycheckEditComponent, { height: '300 px', data: { data: null } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetPaychecksAndShowSuccess();
		});
	}

	ShowFailureMessage(msg) {
		this.snackbar.open(`Request Failed: ${msg}`, null, { duration: 2000 });
	}
}