import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedFilterComponent } from './personalized-filter.component';

describe('PersonalizedFilterComponent', () => {
  let component: PersonalizedFilterComponent;
  let fixture: ComponentFixture<PersonalizedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizedFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
