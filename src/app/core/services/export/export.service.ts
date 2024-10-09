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

  exportToPdf(data: any, filename: string): void {
    if (data.length === 0) {
      console.error('No data available for export.');
      return;
    }
    pdfMake.createPdf(data).download(filename);
  }

  exportToExcel(data: any[], header:string[], filename: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    const colWidths = header.map((header, i) => {
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
