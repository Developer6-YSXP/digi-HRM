import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  exportToPdf(data: any[], filename: string): void {
    if (data.length === 0) {
      console.error('No data available for export.');
      return;
    }

    const headers = Object.keys(data[0]);
    const headerTitle = [
      'Id',
      'Employee Name',
      'Designation',
      'Leave Type',
      'From',
      'To',
      'No. of days',
      'Remain Leaves',
      'Reason',
      'Status',
    ];

    const tableData = data.map((item) => headers.map((header) => item[header]));

    const documentDefinition = {
      content: [
        { text: 'Leave Record', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              headerTitle.map((header) => ({
                text: header,
                style: 'tableHeader',
              })),
              ...tableData.map((row) =>
                row.map((cell) => ({ text: cell, style: 'tableCell' }))
              ),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        tableHeader: {
          fontSize: 10,
          bold: true,
        },
        tableCell: {
          fontSize: 8,
        },
        tableExample: {
          margin: [0, 5, 0, 15] as [number, number, number, number],
        },
      },
    };

    pdfMake.createPdf(documentDefinition).download(filename);
  }

  exportToExcel(data: any[], filename: string): void {
    const headerTitle = [
      'Id',
      'Employee Name',
      'Designation',
      'Leave Type',
      'From',
      'To',
      'No. of days',
      'Remain Leaves',
      'Reason',
      'Status',
    ];

    const formattedData = [
      headerTitle,
      ...data.map((item) => [
        item.id,
        item.employeeName,
        item.designation,
        item.leaveType,
        item.from,
        item.to,
        item.noofDays,
        item.remainleaves,
        item.reason,
        item.status,
      ]),
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(formattedData);

    const colWidths = headerTitle.map((header, i) => {
      const maxLength = Math.max(
        header.length,
        ...data.map((item) => String(item[Object.keys(item)[i]]).length)
      );
      return { wch: maxLength + 2 };
    });

    ws['!cols'] = colWidths;

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, filename);
  }

  print(): void {
    window.print();
  }
}
