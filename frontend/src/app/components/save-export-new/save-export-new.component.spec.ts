import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExportNewComponent } from './save-export-new.component';

describe('SaveExportNewComponent', () => {
  let component: SaveExportNewComponent;
  let fixture: ComponentFixture<SaveExportNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveExportNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveExportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
