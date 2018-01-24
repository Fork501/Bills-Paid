import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BillsComponent } from './bills/bills.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule, MatListModule, MatSidenavModule } from '@angular/material'

@NgModule({
	declarations: [
		AppComponent,
		BillsComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		MatListModule,
		MatSidenavModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	],
	exports: [
		BrowserAnimationsModule,
		MatListModule,
		MatSidenavModule
	]
})
export class AppModule { }
