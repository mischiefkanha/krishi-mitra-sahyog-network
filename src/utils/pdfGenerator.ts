
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface ChartData {
  elementId: string;
  title: string;
}

export const generatePDF = async (title: string, tables?: TableData[], charts?: ChartData[]) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);
  
  let yPos = 30;
  
  // Add tables if provided
  if (tables && tables.length > 0) {
    tables.forEach((table, index) => {
      if (index > 0) {
        yPos += 10;
      }
      
      autoTable(doc, {
        head: [table.headers],
        body: table.rows,
        startY: yPos,
        styles: {
          fontSize: 8
        },
        headStyles: {
          fillColor: [46, 125, 50],
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 10;
    });
  }
  
  // Add charts if provided
  if (charts && charts.length > 0) {
    for (const chart of charts) {
      const element = document.getElementById(chart.elementId);
      if (element) {
        // Check if we need a new page
        if (yPos > 220) {
          doc.addPage();
          yPos = 20;
        }
        
        // Add chart title
        doc.setFontSize(12);
        doc.text(chart.title, 14, yPos);
        yPos += 5;
        
        // Capture chart as image and add to PDF
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        
        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        doc.addImage(imgData, 'PNG', 14, yPos, imgWidth, imgHeight);
        yPos += imgHeight + 15;
      }
    }
  }
  
  // Save the PDF
  doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateCropRecommendationReport = async (cropData: any[]) => {
  const headers = ['Date', 'Recommended Crop', 'Soil Type', 'N', 'P', 'K', 'pH', 'Confidence'];
  const rows = cropData.map(crop => [
    new Date(crop.timestamp).toLocaleDateString(),
    crop.recommended_crop,
    crop.soil_type,
    crop.nitrogen?.toString() || 'N/A',
    crop.phosphorus?.toString() || 'N/A',
    crop.potassium?.toString() || 'N/A',
    crop.ph?.toString() || 'N/A',
    `${(crop.confidence * 100).toFixed(0)}%`
  ]);
  
  await generatePDF('Crop Recommendations Report', [{ headers, rows }], [
    { elementId: 'crop-distribution-chart', title: 'Crop Distribution' }
  ]);
};

export const generateDiseaseDetectionReport = async (diseaseData: any[]) => {
  const headers = ['Date', 'Disease', 'Confidence'];
  const rows = diseaseData.map(disease => [
    new Date(disease.timestamp).toLocaleDateString(),
    disease.disease_name,
    `${(disease.confidence * 100).toFixed(0)}%`
  ]);
  
  await generatePDF('Disease Detection Report', [{ headers, rows }]);
};

export const generateActivityReport = async (cropData: any[], diseaseData: any[]) => {
  await generatePDF('Farmer Activity Report', [], [
    { elementId: 'activity-chart', title: 'Monthly Activity' },
    { elementId: 'crop-distribution-chart', title: 'Crop Distribution' }
  ]);
};
