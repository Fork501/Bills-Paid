import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from '../models/message.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationBox } from '../confirmation-box/confirmation-box.service';
import { BillsEditComponent } from './bills-edit/bills-edit.component';
import { Bill } from '../models/bill.model';
import { BillMonth } from '../models/billMonth.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

	billMonth: BillMonth = new BillMonth();
	displayedColumns = [ 'Account', 'Date', 'Amount', 'Options' ];
	queryDate = new Date();
	totalBills = 0;

	@BlockUI('billsTable') billsTableBlock : NgBlockUI;

	constructor(private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) { }

  	ngOnInit() {
		this.GetBills();
  	}

	DateAdd(months) {
		this.queryDate = new Date(this.queryDate.setMonth(this.queryDate.getMonth() + months));
		this.GetBills();
	}

	DeleteBill(bill) {
		let dateString = this.GetDateStringFromAPIDateObject(bill.Date);
		this.confirmationBox.ShowConfirmation(
			`Are you sure you want to delete bill for ${bill.AccountName} on ${dateString}?`
		).subscribe(data => {
			if(data)
				this.httpClient.delete('/api/bills/' + bill._id.$oid).subscribe(
					data => {
						this.GetBillsAndShowSuccess();
					}
				);
		});
	}

	GetBills() {
		this.billsTableBlock.start();
		let url = `/api/bills/${this.GetFormattedDate()}`;
		this.httpClient.get<string>(url).subscribe(
			data => {
				this.billMonth = JSON.parse(data) as BillMonth;

				if(!this.billMonth)
					this.billMonth = new BillMonth();

				if(this.billMonth.Bills)
					this.totalBills = this.billMonth.Bills.length;

				this.billsTableBlock.stop();
			}
		);
	}

	GetBillsAndShowSuccess() {
		this.GetBills();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}

	GetDateStringFromAPIDateObject(dateToParse) {
		if(dateToParse && dateToParse.$date)
		{
			let dateToReturn = new Date(dateToParse.$date).toLocaleDateString("en-US", { timeZone: 'UTC' });
			return dateToReturn;
		}
	}

	GetDollarString(money) {
		return "$" + <string>parseFloat(money).toFixed(2)
	}

	GetHeaderDateString () {
		return this.queryDate.toLocaleString('en-us', { month: 'long', year: 'numeric', timeZone: 'UTC' });
	}

	GetFormattedDate () {
		let dt = this.queryDate;
		let year = dt.toLocaleString('en-us', {
			year: 'numeric'
		});
		let month = dt.toLocaleString('en-us', {
			month: 'numeric'
		});

		return `${year}-${month}-1`;
	}

	OpenBillEdit(bill) {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: bill, queryDate: this.queryDate } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}

	OpenBillNew() {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: null, queryDate: this.queryDate } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}
}