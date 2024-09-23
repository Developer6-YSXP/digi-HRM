import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent implements OnInit {
  ratingForm!: FormGroup;

  ngOnInit(): void {
    this.ratingFormInit();
  }

  private ratingFormInit(): void {
    // Example data, you can replace with your actual data source
    const ratingsData = [
      { rating_no: '0.1', rating_value_ten: 'dsdsd', definition_ten: 'dfsdfa' },
      {
        rating_no: '0.2',
        rating_value_ten: 'sdfdsf',
        definition_ten: 'sdfdsf',
      },
      { rating_no: '0.3', rating_value_ten: 'sdfds', definition_ten: 'fsdf' },
      { rating_no: '0.4', rating_value_ten: 'sdfds', definition_ten: 'fsdf' },
      { rating_no: '0.5', rating_value_ten: 'sdfdsf', definition_ten: 'sdf' },
      { rating_no: '0.6', rating_value_ten: 'sdfds', definition_ten: 'fsdsdf' },
      { rating_no: '0.7', rating_value_ten: 'dsfd', definition_ten: 'fsdf' },
      { rating_no: '0.8', rating_value_ten: 'sdfsdf', definition_ten: 'sdfds' },
      { rating_no: '0.9', rating_value_ten: 'sdf', definition_ten: 'sdfsdsf' },
      { rating_no: '1.0', rating_value_ten: 'dg', definition_ten: 'fg' },
    ];
    this.ratingForm = new FormGroup({
      ratings: new FormArray([]),
    });

    const ratingsArray = this.ratingForm.get('ratings') as FormArray;

    ratingsData.forEach((rating) => {
      ratingsArray.push(
        new FormGroup({
          rating_no: new FormControl(rating.rating_no, Validators.required),
          rating_value_ten: new FormControl(
            rating.rating_value_ten,
            Validators.required
          ),
          definition_ten: new FormControl(
            rating.definition_ten,
            Validators.required
          ),
        })
      );
    });
  }

  get ratings(): FormArray {
    return this.ratingForm.get('ratings') as FormArray;
  }
}
