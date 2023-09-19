import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDatesComponent } from './invoice-dates.component';

describe('InvoiceDatesComponent', () => {
  let component: InvoiceDatesComponent;
  let fixture: ComponentFixture<InvoiceDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceDatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
