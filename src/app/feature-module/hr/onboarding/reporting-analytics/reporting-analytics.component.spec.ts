import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingAnalyticsComponent } from './reporting-analytics.component';

describe('ReportingAnalyticsComponent', () => {
  let component: ReportingAnalyticsComponent;
  let fixture: ComponentFixture<ReportingAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportingAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
