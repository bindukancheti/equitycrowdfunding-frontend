import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackDetailComponent } from './buyback-detail.component';

describe('BuybackDetailComponent', () => {
  let component: BuybackDetailComponent;
  let fixture: ComponentFixture<BuybackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
