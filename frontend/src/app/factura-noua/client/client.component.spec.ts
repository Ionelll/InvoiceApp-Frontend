import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinetComponent } from './clinet.component';

describe('ClinetComponent', () => {
  let component: ClinetComponent;
  let fixture: ComponentFixture<ClinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
