import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterHeaderComponent } from './writer-header.component';

describe('WriterHeaderComponent', () => {
  let component: WriterHeaderComponent;
  let fixture: ComponentFixture<WriterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
