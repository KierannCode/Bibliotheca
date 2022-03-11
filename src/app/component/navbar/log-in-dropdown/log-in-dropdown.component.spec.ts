import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInDropdownComponent } from './log-in-dropdown.component';

describe('LogInDropdownComponent', () => {
  let component: LogInDropdownComponent;
  let fixture: ComponentFixture<LogInDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
