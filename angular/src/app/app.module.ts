import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BillsComponent } from './bills/bills.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatDividerModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material'

@NgModule({
	declarations: [
		AppComponent,
		BillsComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
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
