import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationBox } from '../confirmation-box/confirmation-box.service';
import { BillsEditComponent } from './bills-edit/bills-edit.component';
import { Bill } from '../models/bill.model';

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

	bill: Bill = new Bill();
	totalBills = 0;

  	ngOnInit() {
		this.GetBills();
  	}

	GetBills() {
		this.httpClient.get<string>('/api/bills/2018-02-01').subscribe(
			data => {
				console.log(data);
				this.bill = JSON.parse(data) as Bill;

				if(!this.bill)
					this.bill = new Bill();
			}
		);
	}

	GetBillsAndShowSuccess() {
		this.GetBills();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}

	GetDateFromMilliseconds(dateToParse) {
		console.log(dateToParse);
		if(dateToParse && dateToParse.$date)
		{
			var dateToReturn = new Date(parseInt(dateToParse.$date, 10)).toLocaleDateString("en-US");
			console.log(dateToReturn);
			return dateToReturn;
		}
	}

	OpenBillsNew() {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: null } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}
}