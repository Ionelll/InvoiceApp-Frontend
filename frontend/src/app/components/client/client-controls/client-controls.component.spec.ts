import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientControlsComponent } from './client-controls.component';

describe('ClientControlsComponent', () => {
  let component: ClientControlsComponent;
  let fixture: ComponentFixture<ClientControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
