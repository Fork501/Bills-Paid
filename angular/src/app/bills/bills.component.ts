import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationBox } from '../confirmation-box/confirmation-box.service';
import { BillsEditComponent } from './bills-edit/bills-edit.component';
import { Account } from '../models/account.model'
import { BillMonth } from '../models/billMonth.model';
import { Settings } from '../app.settings'
import { UpcomingBills } from '../models/upcomingBills';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

	accounts: Account[] = [];
	billMonth: BillMonth = new BillMonth();
	displayedColumnsPaid = [ 'Options', 'Account', 'Date', 'Amount' ];
	displayedColumnsUpcoming = [ 'Options', 'Account', 'DueDate', 'Amount' ];
	queryDate = new Date();
	totalBillsPaid = 0;
	totalBillsUpcoming = 0;
	upcomingBills: UpcomingBills = new UpcomingBills();

	@BlockUI('billsTable') billsTableBlock : NgBlockUI;

	constructor(private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) { }

  	ngOnInit() {
		this.ResetBillsList();
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
				this.httpClient.delete(Settings.API_BASE + '/api/bills/' + bill._id.$oid).subscribe(
					data => {
						this.GetBillsAndShowSuccess();
					}
				);
		});
	}

	GetBills() {
		this.billsTableBlock.start();
		let url = Settings.API_BASE + `/api/bills/${this.GetFormattedDate()}`;
		this.httpClient.get<string>(url).subscribe(
			data => {
				this.billMonth = JSON.parse(data) as BillMonth;

				if(!this.billMonth)
					this.billMonth = new BillMonth();

				if(this.billMonth.Bills)
					this.totalBillsPaid = this.billMonth.Bills.length;
				else
					this.totalBillsPaid = 0;

				this.billsTableBlock.stop();
			}
		);
	}

	GetBillsAndShowSuccess() {
		this.ResetBillsList();
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

	GetUpcomingBillDueDate(dayOfMonth) {
		var d = new Date();
		var newDateString = (d.getMonth() + 1) + '/' + dayOfMonth + '/' + d.getFullYear();
		return new Date(newDateString).toLocaleDateString("en-US", { timeZone: 'UTC' })
	}

	GetUpcomingBills() {
		let url = Settings.API_BASE + `/api/bills/upcoming`;
		this.httpClient.get<string>(url).subscribe(
			data => {
				this.upcomingBills = JSON.parse(data) as UpcomingBills;

				if(this.upcomingBills)
					this.totalBillsUpcoming = this.upcomingBills.Accounts.length;
				else
					this.totalBillsUpcoming = 0;
			}
		);
	}

	OpenBillEdit(bill) {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: bill } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}

	OpenBillEditForUpcoming(accountId, amount) {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { accountId: accountId, amount: amount, queryDate: new Date() } }).beforeClose().subscribe(
			data => {
				if(data)
					this.ResetBillsList();
		});
	}

	OpenBillNew() {
		var queryDate = new Date(this.queryDate.getFullYear(), this.queryDate.getMonth(), 1);
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: null, queryDate: queryDate } }).beforeClose().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}

	ResetBillsList() {
		this.GetBills();
		this.GetUpcomingBills();
	}
}