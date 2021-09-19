import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreateScreenComponent } from './post-create-screen.component';

describe('PostCreateScreenComponent', () => {
  let component: PostCreateScreenComponent;
  let fixture: ComponentFixture<PostCreateScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCreateScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
