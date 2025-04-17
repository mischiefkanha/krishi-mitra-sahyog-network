
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

// Define the types needed
interface CropRecommendation {
  id: string;
  soil_type: string;
  recommended_crop: string;
  confidence: number;
  timestamp: string;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
  temperature?: number;
  humidity?: number;
  rainfall?: number;
}

interface DiseaseDetection {
  id: string;
  disease_name: string;
  confidence: number;
  timestamp: string;
  image?: string;
}

// Generate crop recommendation report
export const generateCropRecommendationReport = async (recommendations: CropRecommendation[]) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Crop Recommendation Report', 105, 15, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 105, 25, { align: 'center' });
  
  // Add logo
  try {
    const logoImg = new Image();
    logoImg.src = '/logo.svg';
    await new Promise((resolve) => {
      logoImg.onload = resolve;
    });
    doc.addImage(logoImg, 'SVG', 10, 10, 20, 20);
  } catch (error) {
    console.error('Error adding logo:', error);
  }
  
  // Add recommendations table
  doc.setFontSize(14);
  doc.text('Recommendations', 14, 40);
  
  const tableData = recommendations.map(rec => [
    format(new Date(rec.timestamp), 'PP'),
    rec.recommended_crop,
    rec.soil_type,
    rec.nitrogen?.toString() || 'N/A',
    rec.phosphorus?.toString() || 'N/A',
    rec.potassium?.toString() || 'N/A',
    rec.ph?.toString() || 'N/A',
    (rec.confidence * 100).toFixed(1) + '%'
  ]);
  
  // @ts-ignore - jsPDF-autotable extends jsPDF
  doc.autoTable({
    startY: 45,
    head: [['Date', 'Crop', 'Soil Type', 'N', 'P', 'K', 'pH', 'Confidence']],
    body: tableData,
  });
  
  let yPos = (doc as any).lastAutoTable.finalY + 20;
  
  // Additional information about the recommendations
  if (recommendations.length > 0) {
    const latest = recommendations[0];
    
    doc.setFontSize(14);
    doc.text('Environmental Conditions', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    if (latest.temperature !== undefined) doc.text(`Temperature: ${latest.temperature}°C`, 20, yPos);
    yPos += 7;
    if (latest.humidity !== undefined) doc.text(`Humidity: ${latest.humidity}%`, 20, yPos);
    yPos += 7;
    if (latest.rainfall !== undefined) doc.text(`Rainfall: ${latest.rainfall} mm`, 20, yPos);
    yPos += 15;
    
    // Add notes
    doc.setFontSize(14);
    doc.text('Notes', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.text('This recommendation is based on soil analysis and environmental data.', 20, yPos);
    yPos += 7;
    doc.text('Actual results may vary based on actual field conditions and implementation.', 20, yPos);
    yPos += 7;
    doc.text('Please consult with local agricultural experts for specific advice.', 20, yPos);
  }
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text('KrishiMitra - Your Farming Assistant', 105, 285, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
  }
  
  // Save PDF
  doc.save('KrishiMitra_Crop_Recommendations.pdf');
};

// Generate disease detection report
export const generateDiseaseDetectionReport = async (detections: DiseaseDetection[]) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Disease Detection Report', 105, 15, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 105, 25, { align: 'center' });
  
  // Add logo
  try {
    const logoImg = new Image();
    logoImg.src = '/logo.svg';
    await new Promise((resolve) => {
      logoImg.onload = resolve;
    });
    doc.addImage(logoImg, 'SVG', 10, 10, 20, 20);
  } catch (error) {
    console.error('Error adding logo:', error);
  }
  
  let yPos = 40;
  
  // Add detections table
  doc.setFontSize(14);
  doc.text('Detected Diseases', 14, yPos);
  
  const tableData = detections.map(detection => [
    format(new Date(detection.timestamp), 'PP'),
    detection.disease_name,
    (detection.confidence * 100).toFixed(1) + '%'
  ]);
  
  // @ts-ignore - jsPDF-autotable extends jsPDF
  doc.autoTable({
    startY: yPos + 5,
    head: [['Date', 'Disease', 'Confidence']],
    body: tableData,
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 20;
  
  // Add images of diseases
  if (detections.length > 0 && detections[0].image) {
    doc.setFontSize(14);
    doc.text('Plant Images', 14, yPos);
    
    try {
      const img = new Image();
      img.src = detections[0].image;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Calculate aspect ratio and resize image to fit
      const imgWidth = 180;
      const imgHeight = img.height * (imgWidth / img.width);
      
      // Add new page if image won't fit
      if (yPos + imgHeight + 10 > 280) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.addImage(img, 'JPEG', 15, yPos + 5, imgWidth, imgHeight);
      yPos = yPos + imgHeight + 20;
    } catch (error) {
      console.error('Error adding image to PDF:', error);
      yPos += 10;
    }
  }
  
  // Add notes
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.text('Notes', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text('This disease detection is based on image analysis.', 20, yPos);
  yPos += 7;
  doc.text('Early detection and treatment is essential for disease control.', 20, yPos);
  yPos += 7;
  doc.text('Please consult with agricultural experts for confirmation and specific treatment advice.', 20, yPos);
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text('KrishiMitra - Your Farming Assistant', 105, 285, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
  }
  
  // Save PDF
  doc.save('KrishiMitra_Disease_Detections.pdf');
};

// Generate activity report
export const generateActivityReport = async (
  cropRecommendations: CropRecommendation[], 
  diseaseDetections: DiseaseDetection[]
) => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('KrishiMitra Activity Report', 105, 15, { align: 'center' });
  
  // Add date
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 105, 25, { align: 'center' });
  
  // Add logo
  try {
    const logoImg = new Image();
    logoImg.src = '/logo.svg';
    await new Promise((resolve) => {
      logoImg.onload = resolve;
    });
    doc.addImage(logoImg, 'SVG', 10, 10, 20, 20);
  } catch (error) {
    console.error('Error adding logo:', error);
  }
  
  // Add summary
  doc.setFontSize(14);
  doc.text('Activity Summary', 14, 40);
  
  doc.setFontSize(12);
  doc.text(`Total Crop Recommendations: ${cropRecommendations.length}`, 20, 50);
  doc.text(`Total Disease Detections: ${diseaseDetections.length}`, 20, 57);
  
  // Add recommendations summary if available
  if (cropRecommendations.length > 0) {
    doc.setFontSize(14);
    doc.text('Recent Crop Recommendations', 14, 70);
    
    // Create crop recommendation table
    const cropData = cropRecommendations.slice(0, 5).map(rec => [
      format(new Date(rec.timestamp), 'PP'),
      rec.recommended_crop,
      rec.soil_type,
      (rec.confidence * 100).toFixed(1) + '%'
    ]);
    
    // @ts-ignore - jsPDF-autotable extends jsPDF
    doc.autoTable({
      startY: 75,
      head: [['Date', 'Recommended Crop', 'Soil Type', 'Confidence']],
      body: cropData,
    });
  }
  
  // Add disease detections if available
  let yPos = cropRecommendations.length > 0 ? (doc as any).lastAutoTable.finalY + 20 : 70;
  
  if (yPos > 200 && diseaseDetections.length > 0) {
    doc.addPage();
    yPos = 20;
  }
  
  if (diseaseDetections.length > 0) {
    doc.setFontSize(14);
    doc.text('Recent Disease Detections', 14, yPos);
    
    // Create disease detection table
    const diseaseData = diseaseDetections.slice(0, 5).map(detection => [
      format(new Date(detection.timestamp), 'PP'),
      detection.disease_name,
      (detection.confidence * 100).toFixed(1) + '%'
    ]);
    
    // @ts-ignore - jsPDF-autotable extends jsPDF
    doc.autoTable({
      startY: yPos + 5,
      head: [['Date', 'Disease', 'Confidence']],
      body: diseaseData,
    });
    
    yPos = (doc as any).lastAutoTable.finalY + 20;
  }
  
  // Add usage recommendations
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }
  
  doc.setFontSize(14);
  doc.text('Recommendations', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(12);
  doc.text('1. Regularly check your crops for signs of disease.', 20, yPos);
  yPos += 7;
  doc.text('2. Update soil test results at least once per growing season.', 20, yPos);
  yPos += 7;
  doc.text('3. Keep records of all farm activities to track improvements.', 20, yPos);
  yPos += 7;
  doc.text('4. Consult with agricultural experts for specific advice.', 20, yPos);
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text('KrishiMitra - Your Farming Assistant', 105, 285, { align: 'center' });
    doc.text(`Page ${i} of ${pageCount}`, 195, 285, { align: 'right' });
  }
  
  // Save PDF
  doc.save('KrishiMitra_Activity_Report.pdf');
};
