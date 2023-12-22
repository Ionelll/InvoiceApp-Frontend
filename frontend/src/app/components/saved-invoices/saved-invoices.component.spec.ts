import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedInvoicesComponent } from './saved-invoices.component';

describe('SavedInvoicesComponent', () => {
  let component: SavedInvoicesComponent;
  let fixture: ComponentFixture<SavedInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
