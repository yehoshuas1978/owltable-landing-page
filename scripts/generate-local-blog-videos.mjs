import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const outputDir = join(rootDir, 'public', 'videos');
const frameRoot = join('/tmp', 'owltable-blog-video-frames');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const width = 1280;
const height = 720;
const fps = 24;
const durationSeconds = 10;
const totalFrames = fps * durationSeconds;

mkdirSync(outputDir, { recursive: true });
rmSync(frameRoot, { recursive: true, force: true });
mkdirSync(frameRoot, { recursive: true });

const videos = [
    {
        slug: 'data-masking-breaches',
        label: 'Security',
        title: 'Stop Production Data Leaks',
        subtitle: 'Replace sensitive records with realistic masked data before teams test.',
        steps: ['Discover PII', 'Mask safely', 'Validate output'],
        accent: '#22d3ee',
        accentSoft: '#164e63',
        statLabel: 'Records protected',
        statTarget: 48210,
        rows: [
            { col: 'email', raw: 'sarah.chen@acme.io' },
            { col: 'ssn', raw: '412-55-0198' },
            { col: 'full_name', raw: 'Sarah T. Chen' },
            { col: 'phone', raw: '+1 415 555 0142' },
            { col: 'ip_addr', raw: '10.24.66.181' },
        ],
    },
    {
        slug: 'owlmask-product-walkthrough',
        label: 'Product Walkthrough',
        title: 'OwlMask Workflow',
        subtitle: 'Connect a source database, apply masking rules, and provision safe data.',
        steps: ['Connect', 'Configure rules', 'Run job'],
        accent: '#38bdf8',
        accentSoft: '#075985',
        statLabel: 'Rows provisioned',
        statTarget: 126540,
        rows: [
            { col: 'customer', raw: 'Marcus Whitfield' },
            { col: 'email', raw: 'marcus.w@globex.com' },
            { col: 'dob', raw: '1987-03-24' },
            { col: 'account', raw: 'ACCT-0092-4471' },
            { col: 'balance', raw: '$18,420.55' },
        ],
    },
    {
        slug: 'postgresql-masking',
        label: 'PostgreSQL Tutorial',
        title: 'Mask PostgreSQL PII',
        subtitle: 'Classify columns, map rules, and keep referential integrity intact.',
        steps: ['Scan schema', 'Map columns', 'Verify rows'],
        accent: '#2dd4bf',
        accentSoft: '#115e59',
        statLabel: 'Columns masked',
        statTarget: 3120,
        rows: [
            { col: 'email', raw: 'lena.ford@northwind.co' },
            { col: 'ssn', raw: '655-21-7734' },
            { col: 'address', raw: '221B Baker Street' },
            { col: 'phone', raw: '+44 20 7946 0958' },
            { col: 'card', raw: '4716 2290 5514 8391' },
        ],
    },
    {
        slug: 'owlmask-feature-overview',
        label: 'Product Release',
        title: 'OwlMask 2.0 Overview',
        subtitle: 'A faster path from data discovery to auditor-ready masking reports.',
        steps: ['AI discovery', 'Reusable policies', 'Compliance reports'],
        accent: '#a78bfa',
        accentSoft: '#4c1d95',
        statLabel: 'Fields classified',
        statTarget: 91870,
        rows: [
            { col: 'name', raw: 'Priya Raman' },
            { col: 'email', raw: 'priya.raman@vertex.ai' },
            { col: 'national_id', raw: 'X8842190K' },
            { col: 'salary', raw: '$142,000' },
            { col: 'notes', raw: 'VIP - do not export' },
        ],
    },
];

function escapeXml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// Preserve separators / format, replace alphanumerics with a bullet so the
// masking transformation reads clearly on screen.
function maskValue(raw) {
    return raw.replace(/[A-Za-z0-9]/g, '•');
}

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function textLines(text, maxLineLength = 54) {
    const lines = [];
    let line = '';

    for (const word of text.split(' ')) {
        const nextLine = line ? `${line} ${word}` : word;
        if (nextLine.length > maxLineLength && line) {
            lines.push(line);
            line = word;
        } else {
            line = nextLine;
        }
    }

    if (line) {
        lines.push(line);
    }

    return lines;
}

function subtitleText(text) {
    return textLines(text, 40).map((line, index) => (
        `<text x="104" y="${322 + index * 36}" font-family="Noto Sans, Arial, sans-serif" font-size="26" font-weight="500" fill="#cbd5e1">${escapeXml(line)}</text>`
    )).join('');
}

function stepCard({ index, x, title, color, filled }) {
    const strokeWidth = filled ? 3.5 : 1.75;
    const bgOpacity = filled ? 0.24 : 0.1;
    const fillWidth = Math.round(336 * filled);

    return `
        <rect x="${x}" y="520" width="336" height="70" rx="9" fill="#0f172a" stroke="${color}" stroke-width="${strokeWidth}" opacity="0.97"/>
        <clipPath id="clip-step-${index}"><rect x="${x}" y="520" width="336" height="70" rx="9"/></clipPath>
        <rect x="${x}" y="520" width="${fillWidth}" height="70" fill="${color}" opacity="${bgOpacity}" clip-path="url(#clip-step-${index})"/>
        <text x="${x + 24}" y="562" font-family="Noto Sans, Arial, sans-serif" font-size="20" font-weight="800" fill="${color}">0${index + 1}</text>
        <text x="${x + 68}" y="563" font-family="Noto Sans, Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff">${escapeXml(title)}</text>
        ${filled >= 0.999
            ? `<text x="${x + 300}" y="565" text-anchor="middle" font-family="Noto Sans, Arial, sans-serif" font-size="24" font-weight="900" fill="${color}">✓</text>`
            : ''}
    `;
}

function dataRow(video, row, index, maskedCount, scanPos) {
    const rowY = 268 + index * 52;
    const isMasked = index < maskedCount;
    const isScanning = Math.floor(scanPos) === index && scanPos < video.rows.length;
    const value = isMasked ? maskValue(row.raw) : row.raw;
    const valueColor = isMasked ? '#67e8f9' : '#94a3b8';
    const lockColor = isMasked ? video.accent : '#475569';
    const highlight = isScanning
        ? `<rect x="708" y="${rowY - 26}" width="454" height="42" rx="8" fill="${video.accent}" opacity="0.14"/>`
        : (isMasked ? `<rect x="708" y="${rowY - 26}" width="454" height="42" rx="8" fill="${video.accent}" opacity="0.06"/>` : '');

    return `
        ${highlight}
        <rect x="724" y="${rowY - 18}" width="16" height="20" rx="3.5" fill="none" stroke="${lockColor}" stroke-width="2.5"/>
        <rect x="727.5" y="${rowY - 22}" width="9" height="8" rx="4.5" fill="none" stroke="${lockColor}" stroke-width="2"/>
        <text x="760" y="${rowY - 2}" font-family="Noto Sans, Arial, sans-serif" font-size="17" font-weight="600" fill="#64748b">${escapeXml(row.col)}</text>
        <text x="900" y="${rowY - 2}" font-family="DejaVu Sans Mono, Menlo, monospace" font-size="18" font-weight="600" fill="${valueColor}">${escapeXml(value)}</text>
    `;
}

function frameSvg(video, frame) {
    const progress = totalFrames > 1 ? frame / (totalFrames - 1) : 1;
    const eased = easeInOut(progress);
    const rowCount = video.rows.length;

    // Scan sweep drives the row-by-row masking reveal.
    const scanPos = Math.min(rowCount, progress * (rowCount + 0.4));
    const maskedCount = Math.min(rowCount, Math.floor(scanPos));
    const scanActive = scanPos < rowCount;
    const scanY = 268 + scanPos * 52 - 20;

    // Typewriter reveal of the headline over the first ~1.6s.
    const titleReveal = Math.min(1, progress / 0.16);
    const titleChars = Math.round(video.title.length * titleReveal);
    const shownTitle = video.title.slice(0, titleChars);
    const caretOn = titleReveal < 1 ? (Math.floor(frame / 4) % 2 === 0) : false;

    const statValue = Math.round(video.statTarget * Math.min(1, eased * 1.04));
    const statText = statValue.toLocaleString('en-US');

    const activeStep = Math.min(2, Math.floor(progress * 3.02));
    const stepFill = (index) => {
        if (index < activeStep) return 1;
        if (index > activeStep) return 0;
        return Math.min(1, (progress * 3.02) - index);
    };

    const pulse = 0.5 + Math.sin(progress * Math.PI * 6) * 0.5;
    const progressWidth = Math.round(1072 * progress);
    const dotX = 104 + progressWidth;

    return `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="scan-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stop-color="${video.accent}" stop-opacity="0"/>
                    <stop offset="0.5" stop-color="${video.accent}" stop-opacity="0.9"/>
                    <stop offset="1" stop-color="${video.accent}" stop-opacity="0"/>
                </linearGradient>
            </defs>

            <rect width="${width}" height="${height}" fill="#070b14"/>
            <rect x="64" y="56" width="1152" height="608" rx="20" fill="#111827"/>
            <rect x="64" y="56" width="1152" height="608" rx="20" fill="${video.accentSoft}" opacity="0.16"/>
            <rect x="64" y="56" width="1152" height="608" rx="20" fill="none" stroke="${video.accent}" stroke-width="3" opacity="0.4"/>

            <circle cx="1120" cy="120" r="${64 + Math.round(progress * 18)}" fill="${video.accent}" opacity="${(0.1 + pulse * 0.06).toFixed(3)}"/>
            <circle cx="210" cy="620" r="${44 + Math.round(progress * 10)}" fill="#34d399" opacity="0.07"/>

            <text x="104" y="106" font-family="Noto Sans, Arial, sans-serif" font-size="30" font-weight="800" fill="#e2e8f0">OwlTable</text>
            <rect x="104" y="124" width="${video.label.length * 12 + 44}" height="34" rx="17" fill="${video.accent}" opacity="0.18"/>
            <text x="124" y="147" font-family="Noto Sans, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="3" fill="#a5f3fc">${escapeXml(video.label.toUpperCase())}</text>

            <circle cx="1058" cy="102" r="7" fill="#fb7185" opacity="${(0.35 + pulse * 0.6).toFixed(3)}"/>
            <text x="1074" y="108" font-family="Noto Sans, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2" fill="#fda4af">LIVE MASKING</text>

            <text x="104" y="252" font-family="Noto Sans, Arial, sans-serif" font-size="54" font-weight="900" fill="#ffffff">${escapeXml(shownTitle)}${caretOn ? '<tspan fill="' + video.accent + '">|</tspan>' : ''}</text>
            ${subtitleText(video.subtitle)}

            <text x="104" y="452" font-family="Noto Sans, Arial, sans-serif" font-size="15" font-weight="800" letter-spacing="2" fill="#94a3b8">${escapeXml(video.statLabel.toUpperCase())}</text>
            <text x="104" y="500" font-family="Noto Sans, Arial, sans-serif" font-size="46" font-weight="900" fill="${video.accent}">${statText}</text>

            <rect x="700" y="196" width="470" height="300" rx="14" fill="#0f172a" stroke="${video.accent}" stroke-width="2" opacity="0.98"/>
            <text x="760" y="228" font-family="Noto Sans, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#64748b">COLUMN</text>
            <text x="900" y="228" font-family="Noto Sans, Arial, sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#64748b">VALUE</text>
            <rect x="1042" y="208" width="104" height="26" rx="13" fill="${video.accent}" opacity="0.16"/>
            <text x="1094" y="226" text-anchor="middle" font-family="Noto Sans, Arial, sans-serif" font-size="14" font-weight="800" fill="${video.accent}">${maskedCount}/${rowCount} MASKED</text>
            <line x1="724" y1="244" x2="1146" y2="244" stroke="#1e293b" stroke-width="1.5"/>

            ${video.rows.map((row, index) => dataRow(video, row, index, maskedCount, scanPos)).join('')}

            ${scanActive ? `<rect x="712" y="${scanY.toFixed(1)}" width="446" height="3" fill="url(#scan-grad)"/>` : ''}

            ${stepCard({ index: 0, x: 104, title: video.steps[0], color: video.accent, filled: stepFill(0) })}
            ${stepCard({ index: 1, x: 472, title: video.steps[1], color: '#34d399', filled: stepFill(1) })}
            ${stepCard({ index: 2, x: 840, title: video.steps[2], color: '#fb7185', filled: stepFill(2) })}

            <rect x="104" y="626" width="1072" height="6" rx="3" fill="#334155"/>
            <rect x="104" y="626" width="${progressWidth}" height="6" rx="3" fill="${video.accent}"/>
            <circle cx="${dotX}" cy="629" r="10" fill="${video.accent}"/>
        </svg>
    `;
}

function run(commandArgs, label) {
    const result = spawnSync(ffmpeg, commandArgs, {
        stdio: 'inherit',
    });

    if (result.error || result.status !== 0) {
        throw result.error || new Error(`${label} failed with status ${result.status}`);
    }
}

// Calm ambient pad (D major) so the videos are no longer silent. Kept low and
// gently faded so it works as a subtle background bed under the animation.
const audioExpr = [
    '0.16*sin(2*PI*146.83*t)',
    '0.13*sin(2*PI*220.00*t)',
    '0.11*sin(2*PI*293.66*t)',
    '0.08*sin(2*PI*440.00*t)',
].join('+');
const audioFilter = [
    'tremolo=f=0.18:d=0.5',
    'aecho=0.8:0.85:80:0.25',
    'lowpass=f=2400',
    `afade=t=in:st=0:d=1.4`,
    `afade=t=out:st=${durationSeconds - 1.7}:d=1.7`,
    'volume=1.2',
    'alimiter=limit=0.9',
].join(',');

for (const video of videos) {
    const frameDir = join(frameRoot, video.slug);
    const mp4Path = join(outputDir, `${video.slug}.mp4`);
    const posterPath = join(outputDir, `${video.slug}.jpg`);

    mkdirSync(frameDir, { recursive: true });

    for (let frame = 0; frame < totalFrames; frame += 1) {
        const framePath = join(frameDir, `frame-${String(frame).padStart(4, '0')}.jpg`);
        await sharp(Buffer.from(frameSvg(video, frame)))
            .jpeg({ quality: 88 })
            .toFile(framePath);

        // Poster: a frame where most rows are already masked so it reads well.
        if (frame === Math.floor(totalFrames * 0.7)) {
            await sharp(Buffer.from(frameSvg(video, frame)))
                .jpeg({ quality: 90 })
                .toFile(posterPath);
        }
    }

    run([
        '-y',
        '-framerate', String(fps),
        '-i', join(frameDir, 'frame-%04d.jpg'),
        '-f', 'lavfi',
        '-i', `aevalsrc=${audioExpr}:s=44100:d=${durationSeconds}`,
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-af', audioFilter,
        '-c:a', 'aac',
        '-b:a', '128k',
        '-shortest',
        mp4Path,
    ], `Generating ${mp4Path}`);
}
