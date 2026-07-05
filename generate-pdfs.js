const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'documents');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

function generatePDF(filename, title, content) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(path.join(publicDir, filename)));
    
    doc.fontSize(24).text(title, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(12).text(content, {
        align: 'left',
        columns: 1,
        lineGap: 4
    });
    
    doc.end();
}

generatePDF(
    'whitepaper-data-masking.pdf',
    'The Definitive Guide to Enterprise Data Masking',
    `Data masking is the process of creating a fake, but realistic version of your organizational data. 
    The goal is to protect sensitive data, while providing a functional alternative when real data is not needed—for example, in user training, sales demos, or software testing. 
    
    This whitepaper covers:
    1. The cost of data breaches in 2026.
    2. Techniques like deterministic masking and format-preserving encryption.
    3. How OwlMask automates compliance with GDPR and HIPAA.`
);

generatePDF(
    'guide-to-compliance.pdf',
    'Achieving SOC2 and HIPAA Compliance with Data Obfuscation',
    `Compliance is no longer just a checklist; it requires proactive technical controls. 
    One of the most effective controls is limiting access to production data. By substituting sensitive production data with masked data in lower environments, companies can significantly reduce their audit scope and breach risk.
    
    Learn how to build a continuous compliance pipeline in this guide.`
);

console.log('PDFs generated in public/documents/');
