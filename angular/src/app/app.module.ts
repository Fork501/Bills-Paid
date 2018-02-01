import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BillsComponent } from './bills/bills.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDividerModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
	declarations: [
		AppComponent,
		BillsComponent,
		AccountsComponent,
		DashboardComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		HttpClientModule,
		MatCardModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	],
	exports: [
		BrowserAnimationsModule,
		MatCardModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule
	]
})
export class AppModule { }
