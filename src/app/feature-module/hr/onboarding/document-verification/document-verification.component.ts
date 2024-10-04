import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LocalService } from 'src/app/core/services/local/local.service';
import { Sort } from '@angular/material/sort';
import { DataService, apiResultFormat, getPolicies, routes } from 'src/app/core/core.index';
@Component({
  selector: 'app-document-verification',
  templateUrl: './document-verification.component.html',
  styleUrl: './document-verification.component.scss'
})
export class DocumentVerificationComponent implements OnInit  {
  public routes = routes;
  public addEmployeeForm!: FormGroup;
  public editEmployeeForm!: FormGroup;  

  dataSource!: MatTableDataSource<getPolicies>;
  // pagination variables
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  role! : number;
  //** / pagination variables
  public allDocument: Array<getPolicies> = [];
  private localService = inject(LocalService)
  constructor(private data: DataService,
    private formBuilder: FormBuilder,
  ){}
  documents = [
    { type: '10th', file: 'assets/img/profiles/avatar-02.jpg', status: 'Pending' },
    { type: '12th', file: 'assets/img/profiles/avatar-01.jpg', status: 'Approve' },
    { type: 'Graduation', file: 'assets/img/profiles/avatar-03.jpg', status: 'Reject' },
    // You can add more documents here
  ];
 // Document types array
 documentTypes = [
  '10th',
  '12th',
  'Graduation',
  'Post Graduation',
  'Aadhar Card',
  'PAN Card',
  'Work Experience'
];

// Status options
documentstatus = [
  { status: 'Pending' },
  { status: 'Approve' },
  { status: 'Reject' }
];
selectedDocument: any = {};
// ngOnInit() {
//   // Initialize form with controls
//   this.addEmployeeForm = new FormGroup({
//     client: new FormControl('', [Validators.required]), // Dynamic document type
//     status: new FormControl('', [Validators.required]), // Dynamic status
//   });
// }

  ngOnInit() {
    // Initialize form for adding document
    this.addEmployeeForm = new FormGroup({
      client: new FormControl('', [Validators.required]),
      file: new FormControl(''),
      status: new FormControl('', [Validators.required]),
    });
    
    // Initialize form for editing document
    this.editEmployeeForm = new FormGroup({
      client: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      file: new FormControl(''),
    });
    //   this.role = this.localService.getLocalItem(LocalConstant.ROLE);
    //   this.addEmployeeForm = new FormGroup({
    //     client: new FormControl('', [Validators.required]),
    //     status: new FormControl ('', [Validators.required])
    //   });
    // }
}



// Method to open edit modal and populate the form
public populateEditForm(document: any): void {
  this.selectedDocument = document; 
  this.editEmployeeForm.patchValue({
    client: document.type,
    status: document.status,
    file: document.file
  });
}

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private getTableData(): void {
    this.allDocument = [];
    this.serialNumberArray = [];

    this.data.getPolicies().subscribe((res: apiResultFormat) => {
      this.totalData = res.totalData;
      res.data.map((res: getPolicies, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          res.id = serialNumber;
          this.allDocument.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<getPolicies>(this.allDocument);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
}
private calculateTotalPages(totalData: number, pageSize: number): void {
  this.pageNumberArray = [];
  this.totalPages = totalData / pageSize;
  if (this.totalPages % 1 !== 0) {
    this.totalPages = Math.trunc(this.totalPages + 1);
  }
  for (let i = 1; i <= this.totalPages; i++) {
    const limit = pageSize * i;
    const skip = limit - pageSize;
    this.pageNumberArray.push(i);
    this.pageSelection.push({ skip: skip, limit: limit });
  }
}
public moveToPage(pageNumber: number): void {
  this.currentPage = pageNumber;
  this.skip = this.pageSelection[pageNumber - 1].skip;
  this.limit = this.pageSelection[pageNumber - 1].limit;
  if (pageNumber > this.currentPage) {
    this.pageIndex = pageNumber - 1;
  } else if (pageNumber < this.currentPage) {
    this.pageIndex = pageNumber + 1;
  }
  this.getTableData();
}

public sortData(sort: Sort) {
  const data = this.allDocument.slice();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (!sort.active || sort.direction === '') {
    this.allDocument = data;
  } else {
    this.allDocument = data.sort((a: any, b: any) => {
      const aValue = (a as any)[sort.active];
      const bValue = (b as any)[sort.active];
      return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
    });
  }
}
public searchData(value: string): void {
  this.dataSource.filter = value.trim().toLowerCase();
  this.allDocument = this.dataSource.filteredData;
}
public getMoreData(event: string): void {
  if (event === 'next') {
    this.currentPage++;
    this.pageIndex = this.currentPage - 1;
    this.limit += this.pageSize;
    this.skip = this.pageSize * this.pageIndex;
    this.getTableData();
  } else if (event === 'previous') {
    this.currentPage--;
    this.pageIndex = this.currentPage - 1;
    this.limit -= this.pageSize;
    this.skip = this.pageSize * this.pageIndex;
    this.getTableData();
  }
}
}
export interface pageSelection {
  skip: number;
  limit: number;
}