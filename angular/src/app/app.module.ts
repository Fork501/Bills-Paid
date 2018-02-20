import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatCardModule,
	MatChipsModule,
	MatDialogModule,
	MatDividerModule,
	MatInputModule,
	MatListModule,
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

@NgModule({
	declarations: [
		AppComponent,
		AccountsComponent,
		AccountEditComponent,
		BillsComponent,
		DashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MatChipsModule,
		HttpClientModule,
		MatCardModule,
		MatDialogModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	],
	exports: [
		BrowserAnimationsModule,
		MatCardModule,
		MatChipsModule,
		MatDialogModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule
	],
	entryComponents: [ AccountEditComponent ]
})
export class AppModule { }
