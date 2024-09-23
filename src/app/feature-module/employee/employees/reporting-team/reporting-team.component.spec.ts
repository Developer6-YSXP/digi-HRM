import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingTeamComponent } from './reporting-team.component';

describe('ReportingTeamComponent', () => {
  let component: ReportingTeamComponent;
  let fixture: ComponentFixture<ReportingTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingTeamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
