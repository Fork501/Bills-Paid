import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
	constructor(private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) { }

	billMonth: BillMonth = new BillMonth();
	totalBills = 0;

	displayedColumns = [ 'Account', 'Date', 'Amount', 'Options' ];

  	ngOnInit() {
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
		this.httpClient.get<string>('/api/bills/2018-02-01').subscribe(
			data => {
				this.billMonth = JSON.parse(data) as BillMonth;

				if(!this.billMonth)
					this.billMonth = new BillMonth();

				if(this.billMonth.Bills)
					this.totalBills = this.billMonth.Bills.length;
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

	GetHeaderDateString (dateToParse) {
		if(dateToParse && dateToParse.$date)
		{
			let date = new Date(dateToParse.$date);
    		let formattedHeader = date.toLocaleString('en-us', { month: 'long', year: 'numeric', timeZone: 'UTC' });
			return formattedHeader;
		}
	}

	OpenBillEdit(bill) {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: bill } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}

	OpenBillNew() {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: null } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}
}