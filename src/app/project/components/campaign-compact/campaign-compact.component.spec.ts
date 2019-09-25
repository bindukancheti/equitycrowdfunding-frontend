import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCompactComponent } from './campaign-compact.component';

describe('CampaignCompactComponent', () => {
  let component: CampaignCompactComponent;
  let fixture: ComponentFixture<CampaignCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCompactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
