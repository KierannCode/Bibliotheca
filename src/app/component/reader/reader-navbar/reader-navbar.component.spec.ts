import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderNavbarComponent } from './reader-navbar.component';

describe('ReaderNavbarComponent', () => {
  let component: ReaderNavbarComponent;
  let fixture: ComponentFixture<ReaderNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
