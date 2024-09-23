import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskGroupDialogComponent } from './add-task-group-dialog.component';

describe('AddTaskGroupDialogComponent', () => {
  let component: AddTaskGroupDialogComponent;
  let fixture: ComponentFixture<AddTaskGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskGroupDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTaskGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
