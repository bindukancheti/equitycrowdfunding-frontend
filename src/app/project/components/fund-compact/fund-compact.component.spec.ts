import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundCompactComponent } from './fund-compact.component';

describe('FundCompactComponent', () => {
  let component: FundCompactComponent;
  let fixture: ComponentFixture<FundCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundCompactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
