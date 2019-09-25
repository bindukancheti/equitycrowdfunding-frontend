import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackListComponent } from './buyback-list.component';

describe('BuybackListComponent', () => {
  let component: BuybackListComponent;
  let fixture: ComponentFixture<BuybackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
