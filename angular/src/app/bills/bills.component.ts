import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationBox } from '../confirmation-box/confirmation-box.service';
import { BillsEditComponent } from './bills-edit/bills-edit.component';

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

	bills = [];
	totalBills = 0;

  	ngOnInit() {
		this.GetBills();
  	}

	GetBills() {
		this.httpClient.get('/api/bills/2018-02-01').subscribe(
			data => {
				console.log(data);
			}
		);
	}

	GetBillsAndShowSuccess() {
		this.GetBills();
		this.snackbar.open('Success!', null, { duration: 2000 });
	}

	OpenBillsNew() {
		this.dialog.open(BillsEditComponent, { height: '300 px', data: { data: null } }).afterClosed().subscribe(
			data => {
				if(data)
					this.GetBillsAndShowSuccess();
		});
	}
}