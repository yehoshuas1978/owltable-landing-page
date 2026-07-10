/* eslint-disable @typescript-eslint/no-require-imports */

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'documents');
const logoPath = path.join(__dirname, 'public', 'owltable-logo.jpg');

const COLORS = {
    ink: '#0f172a',
    muted: '#475569',
    soft: '#f8fafc',
    line: '#dbe4ee',
    cyan: '#0891b2',
    cyanDark: '#155e75',
    emerald: '#047857',
    rose: '#be123c',
};

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

function addLogo(doc, x, y, size = 34) {
    if (!fs.existsSync(logoPath)) {
        return;
    }

    try {
        doc.image(logoPath, x, y, { width: size, height: size });
    } catch {
        // Keep PDF generation resilient if the local image asset changes format.
    }
}

function addHeader(doc, title) {
    addLogo(doc, 54, 30, 22);
    doc
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor(COLORS.muted)
        .text('OwlTable Resource', 84, 35)
        .font('Helvetica')
        .text(title, 54, 58, { width: 504, ellipsis: true });
    doc.moveTo(54, 76).lineTo(558, 76).strokeColor(COLORS.line).lineWidth(1).stroke();
}

function addFooter(doc, pageNumber) {
    doc.moveTo(54, 704).lineTo(558, 704).strokeColor(COLORS.line).lineWidth(1).stroke();
    doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor(COLORS.muted)
        .text('Build safe, realistic test databases without exposing production data.', 54, 718, { width: 350, lineBreak: false })
        .text(String(pageNumber), 520, 718, { width: 38, align: 'right', lineBreak: false });
}

function startPage(doc, title, pageNumber) {
    doc.addPage({ size: 'LETTER', margin: 54 });
    addHeader(doc, title);
    addFooter(doc, pageNumber);
    doc.x = 54;
    doc.y = 102;
}

function ensureSpace(doc, title, pageNumberRef, height) {
    if (doc.y + height <= 684) {
        return;
    }

    pageNumberRef.value += 1;
    startPage(doc, title, pageNumberRef.value);
}

function sectionTitle(doc, title, eyebrow) {
    const y = doc.y;
    doc
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor(COLORS.cyanDark)
        .text(eyebrow.toUpperCase(), 54, y, { width: 504, characterSpacing: 1.2 });
    doc
        .fontSize(21)
        .fillColor(COLORS.ink)
        .text(title, 54, doc.y + 4, { width: 504, lineGap: 2 });
    doc.moveDown(0.7);
}

function paragraph(doc, text) {
    doc
        .font('Helvetica')
        .fontSize(10.5)
        .fillColor(COLORS.ink)
        .text(text, 54, doc.y, { width: 504, lineGap: 4 });
    doc.moveDown(0.7);
}

function bulletList(doc, items) {
    items.forEach((item) => {
        const y = doc.y + 4;
        doc.circle(60, y, 2.2).fillColor(COLORS.cyan).fill();
        doc
            .font('Helvetica')
            .fontSize(10.2)
            .fillColor(COLORS.ink)
            .text(item, 72, doc.y, { width: 468, lineGap: 3 });
        doc.moveDown(0.45);
    });
    doc.moveDown(0.35);
}

function callout(doc, heading, body, accent = COLORS.cyan) {
    const y = doc.y;
    doc.roundedRect(54, y, 504, 82, 8).fillAndStroke(COLORS.soft, COLORS.line);
    doc.rect(54, y, 5, 82).fill(accent);
    doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .fillColor(COLORS.ink)
        .text(heading, 74, y + 16, { width: 450 });
    doc
        .font('Helvetica')
        .fontSize(9.6)
        .fillColor(COLORS.muted)
        .text(body, 74, y + 36, { width: 450, lineGap: 3 });
    doc.y = y + 102;
}

function metricStrip(doc, metrics) {
    const y = doc.y;
    const width = 154;
    metrics.forEach((metric, index) => {
        const x = 54 + index * 174;
        doc.roundedRect(x, y, width, 86, 8).fillAndStroke(COLORS.soft, COLORS.line);
        doc
            .font('Helvetica-Bold')
            .fontSize(22)
            .fillColor(metric.color)
            .text(metric.value, x + 14, y + 16, { width: width - 28 });
        doc
            .font('Helvetica')
            .fontSize(8.8)
            .fillColor(COLORS.muted)
            .text(metric.label, x + 14, y + 48, { width: width - 28, lineGap: 2 });
    });
    doc.y = y + 110;
}

function checklist(doc, items) {
    items.forEach((item) => {
        const y = doc.y;
        doc.roundedRect(54, y, 13, 13, 3).strokeColor(COLORS.cyan).stroke();
        doc.moveTo(57, y + 7).lineTo(61, y + 11).lineTo(67, y + 3).strokeColor(COLORS.emerald).stroke();
        doc
            .font('Helvetica')
            .fontSize(10)
            .fillColor(COLORS.ink)
            .text(item, 78, y - 1, { width: 460, lineGap: 3 });
        doc.moveDown(0.65);
    });
}

function addCover(doc, meta) {
    doc.addPage({ size: 'LETTER', margin: 54 });
    addLogo(doc, 54, 54, 38);
    doc
        .font('Helvetica-Bold')
        .fontSize(13)
        .fillColor(COLORS.ink)
        .text('OwlTable', 102, 62);
    doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor(COLORS.muted)
        .text('Safe test data provisioning', 102, 80);

    doc.roundedRect(54, 130, 120, 24, 12).fill('#e0f2fe');
    doc
        .font('Helvetica-Bold')
        .fontSize(9)
        .fillColor(COLORS.cyanDark)
        .text(meta.type.toUpperCase(), 72, 137, { characterSpacing: 1 });

    doc
        .font('Helvetica-Bold')
        .fontSize(34)
        .fillColor(COLORS.ink)
        .text(meta.title, 54, 190, { width: 490, lineGap: 5 });

    doc
        .font('Helvetica')
        .fontSize(13)
        .fillColor(COLORS.muted)
        .text(meta.description, 54, 318, { width: 430, lineGap: 5 });

    metricStrip(doc, meta.metrics);

    callout(doc, 'Executive takeaway', meta.takeaway, COLORS.emerald);

    doc
        .font('Helvetica')
        .fontSize(9.5)
        .fillColor(COLORS.muted)
        .text(`Published ${meta.published}`, 54, 704)
        .text('owltable.net/resources', 400, 704, { width: 158, align: 'right' });
}

function addContent(doc, meta) {
    const pageNumberRef = { value: 2 };
    startPage(doc, meta.title, pageNumberRef.value);

    meta.sections.forEach((section, index) => {
        ensureSpace(doc, meta.title, pageNumberRef, 190);
        sectionTitle(doc, section.title, `0${index + 1}`);
        section.paragraphs.forEach((text) => {
            ensureSpace(doc, meta.title, pageNumberRef, 70);
            paragraph(doc, text);
        });
        if (section.bullets) {
            ensureSpace(doc, meta.title, pageNumberRef, section.bullets.length * 34);
            bulletList(doc, section.bullets);
        }
        if (section.callout) {
            ensureSpace(doc, meta.title, pageNumberRef, 118);
            callout(doc, section.callout.heading, section.callout.body, section.callout.accent);
        }
    });

    pageNumberRef.value += 1;
    startPage(doc, meta.title, pageNumberRef.value);
    sectionTitle(doc, meta.checklistTitle, 'Operational checklist');
    checklist(doc, meta.checklist);
    doc.moveDown(1);
    callout(doc, 'How OwlTable helps', meta.productNote, COLORS.cyan);
}

function generatePDF(filename, meta) {
    const doc = new PDFDocument({ autoFirstPage: false, info: { Title: meta.title, Author: 'OwlTable' } });
    doc.pipe(fs.createWriteStream(path.join(publicDir, filename)));

    addCover(doc, meta);
    addContent(doc, meta);

    doc.end();
}

generatePDF('whitepaper-data-masking.pdf', {
    type: 'Whitepaper',
    title: 'The Definitive Guide to Enterprise Data Masking',
    description: 'A practical guide to replacing sensitive production data with realistic, compliant test data for development, QA, analytics, and demos.',
    published: 'July 5, 2026',
    takeaway: 'Masking works best when it is treated as a repeatable data provisioning control: discover sensitive fields, choose the right transformation, validate utility, and enforce the workflow before data reaches lower environments.',
    metrics: [
        { value: '4', label: 'core phases: discover, mask, validate, provision', color: COLORS.cyan },
        { value: '6+', label: 'common sensitive data categories to classify first', color: COLORS.emerald },
        { value: '0', label: 'production records needed in lower environments', color: COLORS.rose },
    ],
    sections: [
        {
            title: 'Why Masking Matters Now',
            paragraphs: [
                'Development and QA teams need realistic data to test edge cases, preserve referential integrity, and reproduce defects. Production data often carries customer identifiers, credentials, health details, payment fields, and business-sensitive records that should not be copied into lower environments.',
                'A modern masking program reduces breach impact by changing the shape of test data. The data still behaves like production for applications, but the values no longer expose real people or confidential business facts.',
            ],
            bullets: [
                'Protect sensitive fields before data is exported, restored, or shared.',
                'Keep schema relationships intact so application tests remain meaningful.',
                'Make lower environments useful without expanding production access.',
            ],
        },
        {
            title: 'Choose the Right Transformation',
            paragraphs: [
                'No single masking method fits every field. Deterministic masking is useful when the same input must always produce the same output across tables. Format-preserving substitution keeps values valid for application validators. Tokenization can isolate sensitive values behind a controlled lookup service.',
            ],
            bullets: [
                'Use deterministic masking for joins, repeat customers, and foreign-key-adjacent values.',
                'Use format-preserving rules for emails, phone numbers, national IDs, and account-like values.',
                'Use randomization carefully when analytics or reproducible tests depend on stable distributions.',
            ],
            callout: {
                heading: 'Practical rule',
                body: 'Start with the business use case. If tests require stable identity across tables, favor deterministic techniques. If the application only validates shape, favor format-preserving synthetic values.',
                accent: COLORS.cyan,
            },
        },
        {
            title: 'Governance for Lower Environments',
            paragraphs: [
                'Masking should be enforced before data is available to developers, contractors, staging systems, or demo tenants. The workflow needs reviewable policies, repeatable jobs, and validation evidence that can be reused during audits.',
            ],
            bullets: [
                'Document which fields are sensitive and why each masking rule applies.',
                'Block provisioning when discovery, masking, or validation fails.',
                'Retain job history and validation reports for security and compliance review.',
            ],
        },
        {
            title: 'Validate Utility and Safety',
            paragraphs: [
                'The best masking jobs prove two things: sensitive values are protected, and the resulting dataset still supports the target workflow. Validation should check sample outputs, referential integrity, field formats, and rule coverage before data is released.',
            ],
            bullets: [
                'Sample masked fields and compare them against policy expectations.',
                'Run integrity checks for primary keys, foreign keys, and unique constraints.',
                'Confirm application flows still pass against the masked dataset.',
            ],
        },
    ],
    checklistTitle: 'Data Masking Readiness Checklist',
    checklist: [
        'Inventory the tables and columns that may contain personal, regulated, credential, or commercial data.',
        'Assign each sensitive field to a masking strategy with an accountable owner.',
        'Define validation gates that block provisioning when policy coverage is incomplete.',
        'Run masking as a repeatable job, not a manual export-and-edit process.',
        'Store job results, warnings, and exceptions for review.',
        'Give lower-environment users access to masked outputs only.',
    ],
    productNote: 'OwlTable is built around job-driven data provisioning. Teams can treat masking, validation, and delivery as one governed workflow instead of a set of disconnected scripts.',
});

generatePDF('guide-to-compliance.pdf', {
    type: 'Guide',
    title: 'Achieving SOC 2 and HIPAA Compliance with Data Obfuscation',
    description: 'A hands-on guide for reducing audit scope and protecting lower environments by substituting sensitive production data with governed masked data.',
    published: 'July 2, 2026',
    takeaway: 'Data obfuscation is strongest when tied to access control, repeatable evidence, and release gates. The goal is not only to mask values, but to prove that lower environments cannot expose real sensitive data.',
    metrics: [
        { value: '3', label: 'control areas: access, processing, evidence', color: COLORS.cyan },
        { value: '24/7', label: 'repeatable controls instead of one-time cleanup', color: COLORS.emerald },
        { value: '1', label: 'auditable pipeline for test data delivery', color: COLORS.rose },
    ],
    sections: [
        {
            title: 'Map Data Controls to Real Workflows',
            paragraphs: [
                'Compliance programs often describe who may access sensitive data, but engineering teams also need practical workflows that make the secure path the easy path. Obfuscation helps by giving teams realistic data without granting production visibility.',
            ],
            bullets: [
                'Connect each control to a provisioning step that can be reviewed.',
                'Separate production access from test data consumption.',
                'Retain evidence of when data was processed, validated, and delivered.',
            ],
        },
        {
            title: 'Build a Continuous Pipeline',
            paragraphs: [
                'A compliance-friendly pipeline discovers sensitive fields, applies approved transformations, validates the result, and records the outcome. Teams should be able to rerun the job as schemas evolve and as new environments are created.',
            ],
            bullets: [
                'Use a standard job template for development, QA, staging, and demo datasets.',
                'Fail closed when sensitive fields are unclassified or validation checks do not pass.',
                'Review exceptions before data is made available outside production controls.',
            ],
            callout: {
                heading: 'Evidence matters',
                body: 'Auditors and security teams need more than a policy document. Keep job history, validation summaries, and exception decisions close to the provisioning workflow.',
                accent: COLORS.emerald,
            },
        },
        {
            title: 'Limit Lower-Environment Exposure',
            paragraphs: [
                'Lower environments often have broader access, weaker monitoring, and more frequent integrations than production. Obfuscated datasets reduce the consequences of a staging leak while preserving the development feedback loop.',
            ],
            bullets: [
                'Grant access to masked outputs instead of production snapshots.',
                'Rotate and regenerate datasets as application schemas change.',
                'Use validation to confirm that sensitive categories remain protected.',
            ],
        },
    ],
    checklistTitle: 'Compliance Pipeline Checklist',
    checklist: [
        'Identify sensitive data categories and map them to policy requirements.',
        'Require approvals for any exception that keeps a field unmasked.',
        'Run validation before delivering data to any non-production environment.',
        'Keep immutable job evidence for audit review.',
        'Review role access to outputs on a regular cadence.',
        'Retire stale datasets that no longer match current controls.',
    ],
    productNote: 'OwlTable helps teams make compliance operational by linking data preparation, masking validation, and delivery into a job-centered workflow with reviewable outcomes.',
});

console.log('PDFs generated in public/documents/');
