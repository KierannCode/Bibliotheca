import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorDropdownComponent } from './contributor-dropdown.component';

describe('ContributorDropdownComponent', () => {
  let component: ContributorDropdownComponent;
  let fixture: ComponentFixture<ContributorDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributorDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributorDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
