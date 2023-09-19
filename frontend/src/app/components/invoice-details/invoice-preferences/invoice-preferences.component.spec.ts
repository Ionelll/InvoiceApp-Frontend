import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePreferencesComponent } from './invoice-preferences.component';

describe('InvoicePreferencesComponent', () => {
  let component: InvoicePreferencesComponent;
  let fixture: ComponentFixture<InvoicePreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicePreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
