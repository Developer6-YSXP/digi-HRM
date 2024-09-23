import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContentPageComponent } from './account-content-page.component';

describe('AccountContentPageComponent', () => {
  let component: AccountContentPageComponent;
  let fixture: ComponentFixture<AccountContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
