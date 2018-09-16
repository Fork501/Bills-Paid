import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Message } from '../models/message.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationBox } from '../confirmation-box/confirmation-box.service';
import { BillsEditComponent } from './bills-edit/bills-edit.component';
import { Account } from '../models/account.model'
import { Bill } from '../models/bill.model';
import { BillMonth } from '../models/billMonth.model';
import { Settings } from '../app.settings'

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

	accounts: Account[] = [];
	billMonth: BillMonth = new BillMonth();
	displayedColumnsPaid = [ 'Account', 'Date', 'Amount', 'Options' ];
	displayedColumnsUpcoming = [ 'Account', 'Amount', 'Options' ];
	queryDate = new Date();
	totalBillsPaid = 0;
	totalBillsUpcoming = 0;
	upcomingBills: Bill[] = [];

	@BlockUI('billsTable') billsTableBlock : NgBlockUI;

	constructor(private httpClient: HttpClient,
		public dialog: MatDialog,
		public snackbar: MatSnackBar,
		public confirmationBox: ConfirmationBox) { }

  	ngOnInit() {
		this.GetBills();
		this.GetAccounts();
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

	GetAccounts() {
		return this.httpClient.get<Account>(Settings.API_BASE + '/api/account').subscribe(
			data => {
				let results: Account[] = [];
				for(var i in data)
					results.push(JSON.parse(data[i]));

				this.accounts = results;

				this.GetUpcomingBills();
			}
		);
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
				{
					console.info(this.billMonth.Bills);
					this.totalBillsPaid = this.billMonth.Bills.length;
				}
				else
					this.totalBillsPaid = 0;

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

	GetUpcomingBills() {
		let found: boolean;
		// If no match for account in the bill month, the bill is still upcoming
		// We'll add $0 for bills that are skipped this month
		this.accounts.forEach(account => {
			// Do something with the accounts..?
			//console.log(this.billMonth);
		});
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