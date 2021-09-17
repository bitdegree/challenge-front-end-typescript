import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownArrowBouncerComponent } from './down-arrow-bouncer.component';

describe('DownArrowBouncerComponent', () => {
  let component: DownArrowBouncerComponent;
  let fixture: ComponentFixture<DownArrowBouncerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownArrowBouncerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownArrowBouncerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
