import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoSectionComponent } from './user-info-section.component';

describe('UserInfoSectionComponent', () => {
  let component: UserInfoSectionComponent;
  let fixture: ComponentFixture<UserInfoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
