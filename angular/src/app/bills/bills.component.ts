import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Message } from '../models/message.model'

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  helloMessage = new Message();

  ngOnInit() {
    this.getHelloMessage();
  }

  getHelloMessage() {
    return this.httpClient.get('/api/hello').subscribe(
      data => {this.helloMessage = <Message>data}
    );
  }
}