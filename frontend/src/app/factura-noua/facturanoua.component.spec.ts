import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaNouaComponent } from './facturanoua.component';

describe('FacturaNouaComponent', () => {
  let component: FacturaNouaComponent;
  let fixture: ComponentFixture<FacturaNouaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaNouaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaNouaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
