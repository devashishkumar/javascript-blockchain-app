import { Component, OnInit } from '@angular/core';
import { BlockchainAppService } from 'src/app/services/frontend/blockchain-app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  blockchain;

  constructor(private blockchainServiceInst: BlockchainAppService) {
    this.blockchain = blockchainServiceInst.blockchainInst;
  }

  ngOnInit(): void {
  }

}
