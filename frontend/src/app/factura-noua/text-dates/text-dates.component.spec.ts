import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDatesComponent } from './text-dates.component';

describe('TextDatesComponent', () => {
  let component: TextDatesComponent;
  let fixture: ComponentFixture<TextDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
