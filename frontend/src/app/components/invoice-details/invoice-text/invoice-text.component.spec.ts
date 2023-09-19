import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTextComponent } from './invoice-text.component';

describe('InvoiceTextComponent', () => {
  let component: InvoiceTextComponent;
  let fixture: ComponentFixture<InvoiceTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
