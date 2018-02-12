import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BillsComponent } from './bills/bills.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDividerModule, MatInputModule, MatListModule, MatSidenavModule, MatTabsModule, MatToolbarModule } from '@angular/material';
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
		FormsModule,
		HttpClientModule,
		MatCardModule,
		MatInputModule,
		MatListModule,
		MatSidenavModule,
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
		MatInputModule,
		MatListModule,
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule
	]
})
export class AppModule { }
