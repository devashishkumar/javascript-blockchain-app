import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiningRewardComponent } from './mining-reward/mining-reward.component';
import { SigningTransactionsComponent } from './signing-transactions/signing-transactions.component';

@NgModule({
  declarations: [
    AppComponent,
    MiningRewardComponent,
    SigningTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
