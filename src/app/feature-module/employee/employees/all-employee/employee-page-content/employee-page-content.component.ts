import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, lstEmployee, routes } from 'src/app/core/core.index';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-page-content',
  templateUrl: './employee-page-content.component.html',
  styleUrls: ['./employee-page-content.component.scss'],
})
export class EmployeePageContentComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  public routes = routes;
  selected = 'option1';
  public lstEmployee: Array<lstEmployee>;
  constructor(public router: Router, private dataservice: DataService) {
    this.lstEmployee = this.dataservice.lstEmployee;
  }

  data: any[] = [];

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(worksheet);

        // Map Excel data to lstEmployee structure
        const mappedData = excelData.map((item: any, index: number) => ({
          firstname: item['First Name'] || '',
          lastname: item['Last Name'] || '',
          username: item['Username'] || '',
          password: item['Password'] || '',
          confirmpassword: item['Confirm Password'] || '',
          department: item['Department'] || '',
          designation: item['Designation'] || '',
          phone: item['Phone'] || '',
          email: item['Email'] || '',
          mobile: item['Mobile'] || '',
          joindate: item['Join Date'] || '',
          role: item['Role'] || '',
          employeeId: item['Employee ID'] || '',
          company: item['Company'] || '',
          id: this.lstEmployee.length + index + 1, // Generate a new ID
          img: 'assets/img/profiles/avatar-02.jpg', // Default image
        }));

        // Combine existing data with new data
        this.lstEmployee = [...this.lstEmployee, ...mappedData];
      };
      reader.readAsBinaryString(file);
    }
  }
}
