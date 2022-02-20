import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningTransactionsComponent } from './signing-transactions.component';

describe('SigningTransactionsComponent', () => {
  let component: SigningTransactionsComponent;
  let fixture: ComponentFixture<SigningTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SigningTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
