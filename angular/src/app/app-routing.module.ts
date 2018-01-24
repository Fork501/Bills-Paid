import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component'
import { BillsComponent } from './bills/bills.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
	{ path: 'accounts', component: AccountsComponent },
	{ path: 'bills', component: BillsComponent },
	{ path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
