import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCampaignlistComponent } from './my-campaignlist.component';

describe('MyCampaignlistComponent', () => {
  let component: MyCampaignlistComponent;
  let fixture: ComponentFixture<MyCampaignlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCampaignlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCampaignlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
