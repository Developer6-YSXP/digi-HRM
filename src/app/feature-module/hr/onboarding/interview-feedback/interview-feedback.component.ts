import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrl: './interview-feedback.component.scss'
})
export class InterviewFeedbackComponent {
  public routes = routes;
  feedbackList = [
     
    { interviewerName: 'John Doe', intervieweeName: 'Jane Smith', rating: 5, comments: 'Excellent candidate', status: 'Submitted' },
    { interviewerName: 'Emily Brown', intervieweeName: 'Jane Smith', rating: 4, comments: 'Strong technical skills', status: 'Submitted' },
    { interviewerName: 'Michael Green', intervieweeName: 'Jane Smith', rating: 3, comments: 'dummy lorem', status: 'Pending' },
  ];

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      interviewerName: ['', Validators.required],
      intervieweeName: ['', Validators.required],
      rating: ['', Validators.required],
      comments: [''],
      status: ['Pending', Validators.required],
    });
  }
  viewFeedback(feedback: any): void {
    
    console.log('Viewing feedback:', feedback);
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value);
      
    }
  }
}
