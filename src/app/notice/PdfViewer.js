"use client";
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, AlertCircle, FileText } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ url, noticeId, numPages, onDocumentLoadSuccess, pdfWidth }) {
  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}
      className="flex flex-col gap-4 items-center"
      loading={
        <div className="flex flex-col items-center justify-center py-20 text-blue-500">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p>Loading PDF...</p>
        </div>
      }
      error={
        <div className="flex flex-col items-center justify-center py-20 text-red-500">
          <AlertCircle className="w-8 h-8 mb-4" />
          <p>Failed to load PDF file.</p>
          <a
            href={url}
            download={`notice-${noticeId || "document"}.pdf`}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-colors"
          >
            <FileText className="w-4 h-4" />
            Download Instead
          </a>
        </div>
      }
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page 
          key={`page_${index + 1}`} 
          pageNumber={index + 1} 
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-lg mb-4 bg-white"
          width={pdfWidth}
        />
      ))}
    </Document>
  );
}
