import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-knowledgebase-view',
  templateUrl: './knowledgebase-view.component.html',
  styleUrls: ['./knowledgebase-view.component.scss'],
})
export class KnowledgebaseViewComponent implements OnInit {
  feedbackForm!: FormGroup;
  public routes = routes;

  ngOnInit(): void {
    this.feedbackFormInit();
  }

  private feedbackFormInit(): void {
    this.feedbackForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      website: new FormControl(''),
      comment: new FormControl(''),
    });
  }
}
