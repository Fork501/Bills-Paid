import { Injectable } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ConfirmationBox {

  constructor(public dialog: MatDialog) { }

  ShowConfirmation(message: string) {
    return this.dialog.open(ConfirmationDialogComponent, { height: '300 px', data: { data: message } }).afterClosed();
  }
}
