import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-transactions',
  templateUrl: './block-transactions.component.html',
  styleUrls: ['./block-transactions.component.scss']
})
export class BlockTransactionsComponent implements OnInit {

  @Input() transactions = [];

  constructor() { }

  ngOnInit(): void {
  }

}
