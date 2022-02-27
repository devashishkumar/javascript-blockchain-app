import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiningRewardComponent } from './mining-reward/mining-reward.component';
import { SigningTransactionsComponent } from './signing-transactions/signing-transactions.component';
import { FrontendComponent } from './frontend/frontend.component';
import { BlockchainViewerComponent } from './pages/blockchain-viewer/blockchain-viewer.component';
import { BlockViewComponent } from './components/block-view/block-view.component';
import { BlockTransactionsComponent } from './components/block-transactions/block-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    MiningRewardComponent,
    SigningTransactionsComponent,
    FrontendComponent,
    BlockchainViewerComponent,
    BlockViewComponent,
    BlockTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
