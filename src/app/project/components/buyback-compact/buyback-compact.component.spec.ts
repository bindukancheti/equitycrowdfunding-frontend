import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackCompactComponent } from './buyback-compact.component';

describe('BuybackCompactComponent', () => {
  let component: BuybackCompactComponent;
  let fixture: ComponentFixture<BuybackCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackCompactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
