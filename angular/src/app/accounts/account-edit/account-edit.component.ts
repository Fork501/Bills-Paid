import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

	oid: string;

	constructor(@Inject(MAT_DIALOG_DATA) oid: any) {
		this.oid = oid.oid;
	}

	ngOnInit() {}
}
