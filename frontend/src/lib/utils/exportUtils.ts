import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Type definitions for application data
export interface ApplicationData {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  submittedAt: string;
  college?: string;
  position?: string;
  experience?: string;
  domain?: string;
  duration?: string;
  resumeLink?: string;
  whyYouWantToJoin?: string;
  year?: string;
  skills?: string[];
  location?: string;
  graduation?: string;
}

export interface DashboardStats {
  totalApplications: number;
  campusAmbassadors: number;
  careerApplications: number;
  internshipApplications: number;
  pendingApplications: number;
  thisMonthApplications: number;
  conversionRate?: number;
  averageResponseTime?: number;
}

export interface ApplicationCollection {
  ambassadors: ApplicationData[];
  careers: ApplicationData[];
  internships: ApplicationData[];
}

export interface ExportOptions {
  format: 'xlsx' | 'csv';
  fileName?: string;
  includeHeaders?: boolean;
  customHeaders?: Record<string, string>;
}

export interface ExportRow {
  [key: string]: string | number | boolean;
}

export class ExportManager {
  private static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  private static getApplicationTypeHeaders(type: string): Record<string, string> {
    const baseHeaders = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      submittedAt: 'Submitted At'
    };

    switch (type) {
      case 'campus-ambassadors':
        return {
          ...baseHeaders,
          college: 'College',
          whyYouWantToJoin: 'Why Want to Join'
        };
      case 'careers':
        return {
          ...baseHeaders,
          position: 'Position',
          experience: 'Experience',
          resumeLink: 'Resume Link'
        };
      case 'internships':
        return {
          ...baseHeaders,
          domain: 'Domain',
          college: 'College',
          year: 'Year',
          duration: 'Duration'
        };
      default:
        return baseHeaders;
    }
  }

  private static prepareDataForExport(
    applications: ApplicationData[], 
    type: string
  ): ExportRow[] {
    const headers = this.getApplicationTypeHeaders(type);
    
    return applications.map(app => {
      const row: ExportRow = {};
      
      Object.keys(headers).forEach(key => {
        switch (key) {
          case 'submittedAt':
            row[headers[key]] = this.formatDate(app.submittedAt);
            break;
          case 'skills':
            row[headers[key]] = Array.isArray(app.skills) 
              ? app.skills.join(', ') 
              : app.skills || '';
            break;          default: {
            const appData = app as unknown as Record<string, unknown>;
            row[headers[key]] = (appData[key] as string) || '';
            break;
          }
        }
      });
      
      return row;
    });
  }

  // Export to Excel (.xlsx)
  static exportToExcel(
    applications: ApplicationData[], 
    type: string, 
    options: Partial<ExportOptions> = {}
  ): void {
    const { fileName, customHeaders } = options;
    
    // Prepare data
    const data = this.prepareDataForExport(applications, type);
    
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    // Apply custom headers if provided
    if (customHeaders) {
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cellAddress]) {
          const currentValue = ws[cellAddress].v;
          ws[cellAddress].v = customHeaders[currentValue] || currentValue;
        }
      }
    }

    // Style the header row
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws[cellAddress]) {
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center" }
        };
      }
    }

    // Auto-fit columns
    const colWidths = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      let maxWidth = 10;
      for (let row = range.s.r; row <= range.e.r; row++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        if (ws[cellAddress] && ws[cellAddress].v) {
          const cellLength = ws[cellAddress].v.toString().length;
          maxWidth = Math.max(maxWidth, cellLength + 2);
        }
      }
      colWidths.push({ wch: Math.min(maxWidth, 50) });
    }
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    const sheetName = type.charAt(0).toUpperCase() + type.slice(1);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generate filename
    const defaultFileName = `${type.replace(/-/g, '_')}_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    const finalFileName = fileName || defaultFileName;

    // Write and download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, finalFileName);
  }

  // Export to CSV
  static exportToCSV(
    applications: ApplicationData[], 
    type: string, 
    options: Partial<ExportOptions> = {}
  ): void {
    const { fileName } = options;
    
    if (applications.length === 0) {
      alert('No data to export');
      return;
    }

    const data = this.prepareDataForExport(applications, type);
    
    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          const stringValue = value.toString();
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ];

    // Generate filename
    const defaultFileName = `${type.replace(/-/g, '_')}_applications_${new Date().toISOString().split('T')[0]}.csv`;
    const finalFileName = fileName || defaultFileName;

    // Create and download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, finalFileName);
  }

  // Export all data in one Excel file with multiple sheets
  static exportAllToExcel(
    ambassadors: ApplicationData[], 
    careers: ApplicationData[], 
    internships: ApplicationData[],
    fileName?: string
  ): void {
    const wb = XLSX.utils.book_new();

    // Helper function to create and style a worksheet
    const createStyledWorksheet = (data: ApplicationData[], type: string, color: string) => {
      const preparedData = this.prepareDataForExport(data, type);
      if (preparedData.length === 0) return null;

      const ws = XLSX.utils.json_to_sheet(preparedData);
      
      // Style header row
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        if (ws[cellAddress]) {
          ws[cellAddress].s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: color } },
            alignment: { horizontal: "center" }
          };
        }
      }

      // Auto-fit columns
      const colWidths = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        let maxWidth = 10;
        for (let row = range.s.r; row <= range.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (ws[cellAddress] && ws[cellAddress].v) {
            const cellLength = ws[cellAddress].v.toString().length;
            maxWidth = Math.max(maxWidth, cellLength + 2);
          }
        }
        colWidths.push({ wch: Math.min(maxWidth, 50) });
      }
      ws['!cols'] = colWidths;

      return ws;
    };

    // Create sheets for each data type
    const ambassadorSheet = createStyledWorksheet(ambassadors, 'campus-ambassadors', '4472C4');
    const careerSheet = createStyledWorksheet(careers, 'careers', '10B981');
    const internshipSheet = createStyledWorksheet(internships, 'internships', '8B5CF6');

    // Add sheets to workbook
    if (ambassadorSheet) {
      XLSX.utils.book_append_sheet(wb, ambassadorSheet, 'Campus Ambassadors');
    }
    if (careerSheet) {
      XLSX.utils.book_append_sheet(wb, careerSheet, 'Career Applications');
    }
    if (internshipSheet) {
      XLSX.utils.book_append_sheet(wb, internshipSheet, 'Internship Applications');
    }

    // Check if any data exists
    if (!ambassadorSheet && !careerSheet && !internshipSheet) {
      alert('No data to export');
      return;
    }

    // Generate filename
    const defaultFileName = `internexis_all_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    const finalFileName = fileName || defaultFileName;

    // Write and download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, finalFileName);
  }
  // Export summary statistics
  static exportSummaryReport(
    stats: DashboardStats,
    applications: ApplicationCollection,
    fileName?: string
  ): void {
    const wb = XLSX.utils.book_new();

    // Create summary sheet
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Applications', stats.totalApplications || 0],
      ['Campus Ambassadors', stats.campusAmbassadors || 0],
      ['Career Applications', stats.careerApplications || 0],
      ['Internship Applications', stats.internshipApplications || 0],
      ['Pending Applications', stats.pendingApplications || 0],
      ['This Month Applications', stats.thisMonthApplications || 0],
      [''],
      ['Status Breakdown', ''],
      ['Pending', this.countByStatus(applications, 'pending')],
      ['Reviewed', this.countByStatus(applications, 'reviewed')],
      ['Accepted', this.countByStatus(applications, 'accepted')],
      ['Rejected', this.countByStatus(applications, 'rejected')],
    ];

    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Style summary sheet
    summaryWs['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "4472C4" } } };
    summaryWs['B1'].s = { font: { bold: true }, fill: { fgColor: { rgb: "4472C4" } } };
    summaryWs['A9'].s = { font: { bold: true }, fill: { fgColor: { rgb: "10B981" } } };
    
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

    // Add detailed data sheets
    if (applications.ambassadors.length > 0) {
      const ambassadorSheet = this.createStyledWorksheet(applications.ambassadors, 'campus-ambassadors', '4472C4');
      if (ambassadorSheet) {
        XLSX.utils.book_append_sheet(wb, ambassadorSheet, 'Campus Ambassadors');
      }
    }

    if (applications.careers.length > 0) {
      const careerSheet = this.createStyledWorksheet(applications.careers, 'careers', '10B981');
      if (careerSheet) {
        XLSX.utils.book_append_sheet(wb, careerSheet, 'Career Applications');
      }
    }

    if (applications.internships.length > 0) {
      const internshipSheet = this.createStyledWorksheet(applications.internships, 'internships', '8B5CF6');
      if (internshipSheet) {
        XLSX.utils.book_append_sheet(wb, internshipSheet, 'Internship Applications');
      }
    }

    // Generate filename
    const defaultFileName = `internexis_summary_report_${new Date().toISOString().split('T')[0]}.xlsx`;
    const finalFileName = fileName || defaultFileName;

    // Write and download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, finalFileName);
  }

  // Helper method to create styled worksheet (for private use)
  private static createStyledWorksheet(data: ApplicationData[], type: string, color: string) {
    const preparedData = this.prepareDataForExport(data, type);
    if (preparedData.length === 0) return null;

    const ws = XLSX.utils.json_to_sheet(preparedData);
    
    // Style header row
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (ws[cellAddress]) {
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: color } },
          alignment: { horizontal: "center" }
        };
      }
    }

    return ws;
  }

  // Helper method to count applications by status
  private static countByStatus(
    applications: { ambassadors: ApplicationData[], careers: ApplicationData[], internships: ApplicationData[] },
    status: string
  ): number {
    const allApps = [...applications.ambassadors, ...applications.careers, ...applications.internships];
    return allApps.filter(app => app.status.toLowerCase() === status.toLowerCase()).length;
  }
}

// Quick export functions for easy use
export const exportExcel = (applications: ApplicationData[], type: string, fileName?: string) => {
  ExportManager.exportToExcel(applications, type, { fileName });
};

export const exportCSV = (applications: ApplicationData[], type: string, fileName?: string) => {
  ExportManager.exportToCSV(applications, type, { fileName });
};

export const exportAll = (ambassadors: ApplicationData[], careers: ApplicationData[], internships: ApplicationData[], fileName?: string) => {
  ExportManager.exportAllToExcel(ambassadors, careers, internships, fileName);
};

export const exportSummary = (stats: DashboardStats, applications: ApplicationCollection, fileName?: string) => {
  ExportManager.exportSummaryReport(stats, applications, fileName);
};
