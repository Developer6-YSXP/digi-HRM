import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-employees-matrix',
  templateUrl: './employees-matrix.component.html',
  styleUrl: './employees-matrix.component.scss',
})
export class EmployeesMatrixComponent {
  public routes = routes;
}
