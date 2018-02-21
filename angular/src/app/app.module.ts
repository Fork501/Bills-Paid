import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatCardModule,
	MatSlideToggleModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatDividerModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatOptionModule,
	MatSelectModule,
	MatSidenavModule,
	MatSnackBarModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule
} from '@angular/material';

import { AccountsComponent } from './accounts/accounts.component';
import { AccountEditComponent } from './accounts/account-edit/account-edit.component';
import { BillsComponent } from './bills/bills.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationBox } from './confirmation-box/confirmation-box.service';
import { ConfirmationDialogComponent } from './confirmation-box/confirmation-dialog/confirmation-dialog.component';
import { BillsEditComponent } from './bills/bills-edit/bills-edit.component';

@NgModule({
	declarations: [
		AppComponent,
		AccountsComponent,
		AccountEditComponent,
		BillsComponent,
		ConfirmationDialogComponent,
		DashboardComponent,
		BillsEditComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MatChipsModule,
		HttpClientModule,
		MatCardModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatOptionModule,
		MatSelectModule,
		MatSidenavModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule
	],
	providers: [
		ConfirmationBox
	],
	bootstrap: [
		AppComponent
	],
	exports: [
		BrowserAnimationsModule,
		MatCardModule,
		MatSlideToggleModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatNativeDateModule,
		MatOptionModule,
		MatSelectModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule
	],
	entryComponents: [
		AccountEditComponent,
		BillsEditComponent,
		ConfirmationDialogComponent
	]
})
export class AppModule { }
