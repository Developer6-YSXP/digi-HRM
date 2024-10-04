import { Component } from '@angular/core';
 import { routes } from 'src/app/core/core.index';

@Component({
  selector: 'app-hire-portal',
  templateUrl: './hire-portal.component.html',
  styleUrl: './hire-portal.component.scss'
})
export class HirePortalComponent {
  public routes = routes;
 
 onboardingTasks = [
  { task: 'Complete employment forms', status: 'Pending' },
  { task: 'Enroll in health benefits', status: 'Pending' },
  { task: 'Setup company email', status: 'Completed' },
];

 
resources = [
  { title: 'Company Policies', link: 'https://example.com/policies' },
  { title: 'Health Benefits', link: 'https://example.com/benefits' },
  { title: 'IT Setup Guide', link: 'https://example.com/it-setup' },
];

 
message: string = '';

constructor() {}

ngOnInit(): void {}

 
sendMessage() {
  if (this.message) {
    alert(`Message sent to HR: ${this.message}`);
    this.message = '';  
  } else {
    alert('Please enter a message.');
  }
}

}
