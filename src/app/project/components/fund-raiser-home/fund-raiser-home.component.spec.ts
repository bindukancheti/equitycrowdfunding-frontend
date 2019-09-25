import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRaiserHomeComponent } from './fund-raiser-home.component';

describe('FundRaiserHomeComponent', () => {
  let component: FundRaiserHomeComponent;
  let fixture: ComponentFixture<FundRaiserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRaiserHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRaiserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
