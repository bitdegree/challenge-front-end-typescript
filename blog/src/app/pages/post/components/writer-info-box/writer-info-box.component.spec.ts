import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterInfoBoxComponent } from './writer-info-box.component';

describe('WriterInfoBoxComponent', () => {
  let component: WriterInfoBoxComponent;
  let fixture: ComponentFixture<WriterInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterInfoBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
