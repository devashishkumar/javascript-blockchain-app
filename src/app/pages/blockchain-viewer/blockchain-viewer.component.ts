import { Component, OnInit } from '@angular/core';
import { BlockchainAppService } from 'src/app/services/frontend/blockchain-app.service';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {

  blocks = [];
  selectedBlock = null;

  constructor(private blockchainServiceObj: BlockchainAppService) { }

  ngOnInit(): void {
    this.blocks = this.blockchainServiceObj.getBlocks();
    this.selectedBlock = this.blocks[0];
  }

  updateSelectedBlock(block) {
    this.selectedBlock = block;
  }

}
