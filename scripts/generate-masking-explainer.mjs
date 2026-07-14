import {
    sans, mono,
    cyan, sky, teal, emerald, rose, violet, amber, slate400, slate500, textMain,
    escapeXml, maskValue, easeInOut, window01, type, fmtInt,
    pill, check, warnIcon, lockIcon, dbIcon, shieldIcon,
    runVideo,
} from './lib/video-engine.mjs';

// Long-form explainer: "How data masking works in OwlMask" (~2m40s). Scene
// definitions only — rendering and encoding live in lib/video-engine.mjs.

const scenes = [
    {
        id: 'hook',
        label: 'Overview',
        accent: cyan,
        duration: 12,
        captions: [
            { start: 0.8, end: 5.6, text: 'Your production database is full of real people’s data.' },
            { start: 5.9, end: 11.5, text: 'Copying it into test environments is how breaches happen. Here’s how OwlMask fixes that.' },
        ],
        render(t) {
            const titleP = window01(t, 0.4, 2.2);
            const caretOn = titleP < 1 && Math.floor(t * 6) % 2 === 0;
            const fullTitle = 'How OwlMask masks your data';
            const split = 'How OwlMask'.length;
            const shown = type(fullTitle, titleP);
            const line1 = shown.slice(0, split);
            const line2 = shown.length > split + 1 ? shown.slice(split + 1) : '';
            const caret = caretOn ? `<tspan fill="${cyan}">|</tspan>` : '';
            const subAlpha = window01(t, 2.4, 3.2);
            const pulse = 0.5 + Math.sin(t * Math.PI * 1.6) * 0.5;

            const rows = [
                { col: 'email', raw: 'sarah.chen@acme.io' },
                { col: 'ssn', raw: '412-55-0198' },
                { col: 'card', raw: '4716 2290 5514 8391' },
            ];
            const cardAlpha = window01(t, 1.0, 1.8);
            const environments = ['Dev laptops', 'CI pipelines', 'Staging servers'];

            return `
                <text x="104" y="212" font-family="${sans}" font-size="46" font-weight="900" fill="#ffffff">${escapeXml(line1)}${line2 ? '' : caret}</text>
                <text x="104" y="266" font-family="${sans}" font-size="46" font-weight="900" fill="#ffffff">${escapeXml(line2)}${line2 ? caret : ''}</text>
                <text x="104" y="314" font-family="${sans}" font-size="25" font-weight="500" fill="#cbd5e1" opacity="${subAlpha.toFixed(3)}">From production copy to safe test data — in six steps.</text>

                ${environments.map((env, i) => {
                    const alpha = window01(t, 3.6 + i * 0.9, 4.4 + i * 0.9);
                    const x = 104 + i * 216;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="376" width="196" height="52" rx="10" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
                            <circle cx="${x + 26}" cy="402" r="6" fill="${rose}" opacity="${(0.5 + pulse * 0.5).toFixed(3)}"/>
                            <text x="${x + 46}" y="409" font-family="${sans}" font-size="18" font-weight="600" fill="${textMain}">${escapeXml(env)}</text>
                        </g>
                    `;
                }).join('')}
                <text x="104" y="470" font-family="${sans}" font-size="15" font-weight="600" fill="${slate500}" opacity="${window01(t, 4.6, 5.4).toFixed(3)}">Every copy of production is another place real data can leak from.</text>

                <g opacity="${cardAlpha.toFixed(3)}">
                    <rect x="770" y="170" width="406" height="240" rx="14" fill="#0f172a" stroke="${rose}" stroke-width="2" opacity="${(0.75 + pulse * 0.25).toFixed(3)}"/>
                    <text x="794" y="204" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">PRODUCTION SNAPSHOT</text>
                    ${rows.map((row, i) => {
                        const rowY = 248 + i * 50;
                        return `
                            ${lockIcon(794, rowY - 16, rose)}
                            <text x="828" y="${rowY}" font-family="${sans}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="920" y="${rowY}" font-family="${mono}" font-size="17" font-weight="600" fill="#fda4af">${escapeXml(row.raw)}</text>
                        `;
                    }).join('')}
                    ${pill(973, 438, 'Exposed in test environments', rose, { alpha: window01(t, 2.6, 3.4) * (0.6 + pulse * 0.4) })}
                </g>
            `;
        },
    },
    {
        id: 'pipeline',
        label: 'The pipeline',
        accent: sky,
        duration: 12,
        captions: [
            { start: 0.6, end: 6.0, text: 'Six steps take you from raw production data to a safe, realistic test database.' },
            { start: 6.3, end: 11.5, text: 'Let’s walk through each one.' },
        ],
        render(t) {
            const steps = [
                { label: 'Connect', color: sky },
                { label: 'Discover PII', color: cyan },
                { label: 'Configure rules', color: violet },
                { label: 'Preserve integrity', color: emerald },
                { label: 'Run job', color: rose },
                { label: 'Validate', color: teal },
            ];
            return `
                <text x="104" y="232" font-family="${sans}" font-size="44" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">The OwlMask pipeline</text>
                ${steps.map((step, i) => {
                    const fill = window01(t, 1.2 + i * 1.35, 2.4 + i * 1.35);
                    const x = 104 + (i % 3) * 368;
                    const y = 300 + Math.floor(i / 3) * 96;
                    const w = 336;
                    const eased = easeInOut(fill);
                    return `
                        <g opacity="${window01(t, 0.9 + i * 1.35, 1.5 + i * 1.35).toFixed(3)}">
                            <rect x="${x}" y="${y}" width="${w}" height="70" rx="9" fill="#0f172a" stroke="${step.color}" stroke-width="${fill >= 1 ? 3 : 1.75}"/>
                            <clipPath id="pipe-${i}"><rect x="${x}" y="${y}" width="${w}" height="70" rx="9"/></clipPath>
                            <rect x="${x}" y="${y}" width="${Math.round(w * eased)}" height="70" fill="${step.color}" opacity="0.2" clip-path="url(#pipe-${i})"/>
                            <text x="${x + 24}" y="${y + 43}" font-family="${sans}" font-size="19" font-weight="800" fill="${step.color}">0${i + 1}</text>
                            <text x="${x + 66}" y="${y + 44}" font-family="${sans}" font-size="21" font-weight="700" fill="#ffffff">${escapeXml(step.label)}</text>
                            ${fill >= 0.999 ? check(x + w - 30, y + 45, step.color) : ''}
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'connect',
        label: 'Step 1 · Connect',
        accent: sky,
        duration: 18,
        captions: [
            { start: 0.6, end: 5.6, text: 'Start by connecting a source database — PostgreSQL, MySQL, or SQL Server.' },
            { start: 5.9, end: 11.5, text: 'OwlMask reads the schema: every table, column, data type, and foreign key.' },
            { start: 11.8, end: 17.4, text: 'Your source stays read-only — nothing changes until you run a job you approved.' },
        ],
        render(t) {
            const engines = ['PostgreSQL', 'MySQL', 'SQL Server'];
            const connected = t > 5.4;
            const lineColor = connected ? emerald : '#475569';
            const dashShift = (t * 46).toFixed(1);
            const tables = [
                { name: 'customers', cols: 12 },
                { name: 'orders', cols: 9 },
                { name: 'payments', cols: 7 },
                { name: 'support_tickets', cols: 11 },
                { name: 'audit_log', cols: 6 },
            ];

            return `
                ${engines.map((engine, i) => {
                    const y = 196 + i * 92;
                    const active = i === 0;
                    const stroke = active ? sky : '#334155';
                    const alpha = active ? 1 : 0.6;
                    return `
                        <g opacity="${(alpha * window01(t, 0.2 + i * 0.3, 0.8 + i * 0.3)).toFixed(3)}">
                            <rect x="104" y="${y}" width="300" height="76" rx="12" fill="#0f172a" stroke="${stroke}" stroke-width="${active ? 2.5 : 1.5}"/>
                            ${dbIcon(146, y + 38, active ? sky : slate500, 0.82)}
                            <text x="184" y="${y + 45}" font-family="${sans}" font-size="21" font-weight="700" fill="${active ? '#ffffff' : slate400}">${escapeXml(engine)}</text>
                            ${active && connected ? `<circle cx="378" cy="${y + 38}" r="6" fill="${emerald}"/>` : ''}
                        </g>
                    `;
                }).join('')}

                <path d="M 404 234 C 510 234 570 234 700 234" fill="none" stroke="${lineColor}" stroke-width="3" stroke-dasharray="10 8" stroke-dashoffset="-${dashShift}" opacity="${window01(t, 1.2, 2.0).toFixed(3)}"/>
                ${pill(552, 196, connected ? 'Connected' : 'Connecting…', connected ? emerald : amber, { alpha: window01(t, 1.6, 2.4) })}

                <g opacity="${window01(t, 2.2, 3.0).toFixed(3)}">
                    <rect x="700" y="164" width="476" height="352" rx="14" fill="#0f172a" stroke="${sky}" stroke-width="2" opacity="0.97"/>
                    <text x="724" y="198" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">SCHEMA MAP</text>
                    <line x1="724" y1="212" x2="1152" y2="212" stroke="#1e293b" stroke-width="1.5"/>
                    ${tables.map((table, i) => {
                        const alpha = window01(t, 6.0 + i * 1.15, 6.7 + i * 1.15);
                        const y = 246 + i * 44;
                        return `
                            <g opacity="${alpha.toFixed(3)}">
                                <text x="724" y="${y}" font-family="${mono}" font-size="18" font-weight="600" fill="${textMain}">${escapeXml(table.name)}</text>
                                <text x="1152" y="${y}" text-anchor="end" font-family="${sans}" font-size="15" font-weight="600" fill="${slate500}">${table.cols} columns</text>
                            </g>
                        `;
                    }).join('')}
                    ${pill(938, 486, 'Foreign key map built  ✓', emerald, { alpha: window01(t, 12.2, 13.0) })}
                </g>

                ${pill(226, 500, 'Read-only connection', cyan, { alpha: window01(t, 12.6, 13.4) })}
            `;
        },
    },
    {
        id: 'discover',
        label: 'Step 2 · Discover PII',
        accent: cyan,
        duration: 24,
        captions: [
            { start: 0.6, end: 5.8, text: 'Next, PII discovery scans every column and classifies what it finds.' },
            { start: 6.1, end: 11.9, text: 'Emails, names, national IDs, phone numbers — each match gets a type and a confidence score.' },
            { start: 12.2, end: 17.7, text: 'Anything uncertain is flagged for human review instead of being silently skipped.' },
            { start: 18.0, end: 23.4, text: 'You approve the classification before any masking rule is applied.' },
        ],
        render(t) {
            const rows = [
                { col: 'email', kind: 'EMAIL', conf: '98%', color: cyan },
                { col: 'full_name', kind: 'PERSON', conf: '96%', color: cyan },
                { col: 'ssn', kind: 'NATIONAL ID', conf: '99%', color: cyan },
                { col: 'phone', kind: 'PHONE', conf: '97%', color: cyan },
                { col: 'created_at', kind: 'NOT PII', conf: '—', color: slate500 },
                { col: 'notes', kind: 'FREE TEXT', conf: '74%', color: amber, review: true },
            ];
            const scanP = window01(t, 1.6, 16.0);
            const scanPos = scanP * (rows.length + 0.35);
            const scanY = 232 + Math.min(rows.length, scanPos) * 48 - 18;
            const scanActive = scanPos < rows.length && t < 16.2;

            const scanned = Math.round(412 * easeInOut(window01(t, 1.6, 16.0)));
            const found = Math.round(38 * easeInOut(window01(t, 2.4, 16.4)));

            return `
                <text x="104" y="222" font-family="${sans}" font-size="42" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">PII discovery</text>

                <text x="104" y="300" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${slate400}">COLUMNS SCANNED</text>
                <text x="104" y="348" font-family="${sans}" font-size="44" font-weight="900" fill="${cyan}">${fmtInt(scanned)}</text>
                <text x="104" y="404" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${slate400}">PII COLUMNS FOUND</text>
                <text x="104" y="452" font-family="${sans}" font-size="44" font-weight="900" fill="${emerald}">${fmtInt(found)}</text>
                ${pill(212, 502, '3 flagged for review', amber, { alpha: window01(t, 16.6, 17.4) })}

                <rect x="640" y="160" width="536" height="356" rx="14" fill="#0f172a" stroke="${cyan}" stroke-width="2" opacity="0.97"/>
                <text x="664" y="192" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">COLUMN</text>
                <text x="856" y="192" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">CLASSIFICATION</text>
                <text x="1152" y="192" text-anchor="end" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">CONF</text>
                <line x1="664" y1="206" x2="1152" y2="206" stroke="#1e293b" stroke-width="1.5"/>
                ${rows.map((row, i) => {
                    const y = 240 + i * 48;
                    const done = scanPos > i + 0.6;
                    const scanning = Math.floor(scanPos) === i && scanActive;
                    const badgeAlpha = done ? 1 : 0;
                    return `
                        ${scanning ? `<rect x="652" y="${y - 22}" width="512" height="38" rx="8" fill="${cyan}" opacity="0.12"/>` : ''}
                        <text x="664" y="${y}" font-family="${mono}" font-size="17" font-weight="600" fill="${slate400}">${escapeXml(row.col)}</text>
                        <g opacity="${badgeAlpha}">
                            <rect x="856" y="${y - 20}" width="${row.kind.length * 9.5 + 26}" height="28" rx="14" fill="${row.color}" opacity="0.16"/>
                            <text x="${856 + (row.kind.length * 9.5 + 26) / 2}" y="${y - 1}" text-anchor="middle" font-family="${sans}" font-size="13.5" font-weight="800" letter-spacing="1" fill="${row.color}">${escapeXml(row.kind)}</text>
                            ${row.review ? `<text x="1042" y="${y - 1}" font-family="${sans}" font-size="12.5" font-weight="800" letter-spacing="1" fill="${amber}">REVIEW</text>` : ''}
                            <text x="1152" y="${y}" text-anchor="end" font-family="${mono}" font-size="16" font-weight="700" fill="${row.color}">${escapeXml(row.conf)}</text>
                        </g>
                    `;
                }).join('')}
                ${scanActive ? `
                    <defs>
                        <linearGradient id="disc-scan" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0" stop-color="${cyan}" stop-opacity="0"/>
                            <stop offset="0.5" stop-color="${cyan}" stop-opacity="0.9"/>
                            <stop offset="1" stop-color="${cyan}" stop-opacity="0"/>
                        </linearGradient>
                    </defs>
                    <rect x="652" y="${scanY.toFixed(1)}" width="512" height="3" fill="url(#disc-scan)"/>
                ` : ''}
            `;
        },
    },
    {
        id: 'rules',
        label: 'Step 3 · Masking rules',
        accent: violet,
        duration: 30,
        captions: [
            { start: 0.6, end: 5.7, text: 'Now the core of it: every sensitive column gets a masking rule.' },
            { start: 6.0, end: 11.6, text: 'Synthetic values look completely real — but belong to no one.' },
            { start: 11.9, end: 17.5, text: 'Format-preserving algorithms keep the shape, so a masked SSN still validates as an SSN.' },
            { start: 17.8, end: 23.6, text: 'And deterministic masking always maps the same input to the same output.' },
            { start: 23.9, end: 29.4, text: 'That consistency is what keeps joins, reports, and analytics working after masking.' },
        ],
        render(t) {
            const rows = [
                { algo: 'Synthetic', color: violet, col: 'email', raw: 'sarah.chen@acme.io', masked: 'k.moreau@dalvex.io', at: 2.0 },
                { algo: 'Format-preserving', color: cyan, col: 'ssn', raw: '412-55-0198', masked: '837-21-4406', at: 6.5 },
                { algo: 'Deterministic', color: emerald, col: 'customer_id', raw: 'C-10042', masked: 'C-88317', at: 11.0 },
            ];
            const detAlpha = window01(t, 18.2, 19.2);
            const detPulse = 0.6 + Math.sin(t * Math.PI * 1.4) * 0.4;

            return `
                <text x="104" y="188" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Every column gets an algorithm</text>
                ${rows.map((row, i) => {
                    const y = 250 + i * 72;
                    const appear = window01(t, row.at - 0.7, row.at);
                    const flipP = easeInOut(window01(t, row.at, row.at + 1.2));
                    const rawAlpha = 1 - flipP * 0.68;
                    const badgeW = row.algo.length * 11 + 34;
                    return `
                        <g opacity="${appear.toFixed(3)}">
                            <rect x="104" y="${y - 34}" width="1072" height="56" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
                            <rect x="104" y="${y - 34}" width="1072" height="56" rx="10" fill="${row.color}" opacity="${(flipP * 0.05).toFixed(3)}"/>
                            <rect x="122" y="${y - 20}" width="${badgeW}" height="30" rx="15" fill="${row.color}" opacity="0.16"/>
                            <text x="${122 + badgeW / 2}" y="${y}" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="1" fill="${row.color}">${escapeXml(row.algo.toUpperCase())}</text>
                            <text x="378" y="${y + 1}" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="540" y="${y + 1}" font-family="${mono}" font-size="18" font-weight="600" fill="${slate400}" opacity="${rawAlpha.toFixed(3)}">${escapeXml(row.raw)}</text>
                            <text x="792" y="${y + 1}" font-family="${sans}" font-size="21" font-weight="800" fill="${row.color}" opacity="${flipP.toFixed(3)}">→</text>
                            <text x="836" y="${y + 1}" font-family="${mono}" font-size="18" font-weight="700" fill="${row.color}" opacity="${flipP.toFixed(3)}">${escapeXml(type(row.masked, flipP))}</text>
                        </g>
                    `;
                }).join('')}

                <g opacity="${detAlpha.toFixed(3)}">
                    <rect x="104" y="446" width="1072" height="76" rx="12" fill="#0f172a" stroke="${emerald}" stroke-width="2" opacity="0.95"/>
                    <text x="140" y="476" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">CONSISTENT ACROSS TABLES</text>
                    <text x="140" y="504" font-family="${mono}" font-size="16.5" font-weight="600" fill="${slate400}">orders.customer_id     <tspan fill="${textMain}">C-10042</tspan> → <tspan fill="${emerald}" font-weight="700">C-88317</tspan></text>
                    <text x="646" y="504" font-family="${mono}" font-size="16.5" font-weight="600" fill="${slate400}">payments.customer_id  <tspan fill="${textMain}">C-10042</tspan> → <tspan fill="${emerald}" font-weight="700">C-88317</tspan></text>
                    ${pill(986, 470, 'Same input → same output', emerald, { alpha: detAlpha * detPulse })}
                </g>
            `;
        },
    },
    {
        id: 'integrity',
        label: 'Step 4 · Referential integrity',
        accent: emerald,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.3, text: 'Keys are special: masking them naively would break every relationship in your schema.' },
            { start: 6.6, end: 12.4, text: 'OwlMask remaps each key consistently across all the tables that reference it.' },
            { start: 12.7, end: 19.0, text: 'Foreign keys still join — your relational model survives masking untouched.' },
        ],
        render(t) {
            const flipP = easeInOut(window01(t, 7.0, 8.2));
            const nameP = easeInOut(window01(t, 8.6, 9.6));
            const keyRaw = 'C-10042';
            const keyMasked = 'C-88317';
            const keyShown = flipP > 0.5 ? keyMasked : keyRaw;
            const keyColor = flipP > 0.5 ? emerald : textMain;
            const remapping = t > 5.0 && t < 8.4;
            const joined = t > 9.8;
            const pulseHl = flipP > 0.02 && flipP < 0.98 ? 0.28 : flipP >= 0.98 ? 0.08 : 0;
            const nameShown = nameP > 0.5 ? 'K. Moreau' : 'Sarah Chen';
            const emailShown = nameP > 0.5 ? maskValue('sarah.chen@acme.io') : 'sarah.chen@acme.io';

            return `
                ${remapping ? pill(640, 176, 'Remapping keys…', amber) : ''}
                ${joined ? pill(640, 176, 'Join intact  ✓', emerald) : ''}

                <rect x="120" y="206" width="410" height="196" rx="14" fill="#0f172a" stroke="${emerald}" stroke-width="2" opacity="0.97"/>
                <text x="144" y="238" font-family="${mono}" font-size="19" font-weight="700" fill="${textMain}">customers</text>
                <line x1="144" y1="252" x2="506" y2="252" stroke="#1e293b" stroke-width="1.5"/>
                <rect x="136" y="264" width="378" height="34" rx="8" fill="${emerald}" opacity="${pulseHl.toFixed(3)}"/>
                <text x="152" y="287" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">id</text>
                <text x="330" y="287" font-family="${mono}" font-size="17" font-weight="700" fill="${keyColor}">${escapeXml(keyShown)}</text>
                <text x="470" y="287" font-family="${sans}" font-size="12" font-weight="800" letter-spacing="1" fill="${amber}">PK</text>
                <text x="152" y="330" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">full_name</text>
                <text x="330" y="330" font-family="${mono}" font-size="17" font-weight="600" fill="${nameP > 0.5 ? cyan : slate400}">${escapeXml(nameShown)}</text>
                <text x="152" y="372" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">email</text>
                <text x="330" y="372" font-family="${mono}" font-size="15.5" font-weight="600" fill="${nameP > 0.5 ? cyan : slate400}">${escapeXml(emailShown)}</text>

                <rect x="756" y="318" width="410" height="160" rx="14" fill="#0f172a" stroke="${emerald}" stroke-width="2" opacity="0.97"/>
                <text x="780" y="350" font-family="${mono}" font-size="19" font-weight="700" fill="${textMain}">orders</text>
                <line x1="780" y1="364" x2="1142" y2="364" stroke="#1e293b" stroke-width="1.5"/>
                <text x="788" y="399" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">order_id</text>
                <text x="988" y="399" font-family="${mono}" font-size="17" font-weight="600" fill="${slate400}">55810</text>
                <rect x="772" y="412" width="378" height="34" rx="8" fill="${emerald}" opacity="${pulseHl.toFixed(3)}"/>
                <text x="788" y="435" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">customer_id</text>
                <text x="988" y="435" font-family="${mono}" font-size="17" font-weight="700" fill="${keyColor}">${escapeXml(keyShown)}</text>
                <text x="1112" y="435" font-family="${sans}" font-size="12" font-weight="800" letter-spacing="1" fill="${sky}">FK</text>

                <path d="M 530 281 C 650 281 630 429 756 429" fill="none" stroke="${joined ? emerald : '#475569'}" stroke-width="3" opacity="0.9"/>
                <circle cx="530" cy="281" r="5" fill="${joined ? emerald : '#475569'}"/>
                <circle cx="756" cy="429" r="5" fill="${joined ? emerald : '#475569'}"/>
                ${pill(642, 356, 'FK', emerald, { size: 12, bgOpacity: 0.28 })}
            `;
        },
    },
    {
        id: 'run',
        label: 'Step 5 · Readiness + run',
        accent: rose,
        duration: 24,
        captions: [
            { start: 0.6, end: 6.4, text: 'Before a single row changes, OwlMask runs a readiness assessment.' },
            { start: 6.7, end: 12.3, text: 'Permissions, prerequisites, backups, destructive impact — any blocker stops the job cold.' },
            { start: 12.6, end: 17.9, text: 'Only then does the masking job run, streaming tables through in batches.' },
            { start: 18.2, end: 23.4, text: 'You watch progress live — per table, per row, in real time.' },
        ],
        render(t) {
            const checks = [
                { text: 'Permissions verified', ok: true },
                { text: 'Prerequisites met', ok: true },
                { text: 'Backup available', ok: true },
                { text: '2 warnings — review advised', warn: true },
                { text: '0 blocking failures', ok: true },
            ];
            const readyAlpha = window01(t, 9.0, 9.8);
            const jobActive = t > 10.0;
            const tables = [
                { name: 'customers', p: easeInOut(window01(t, 10.5, 14.5)) },
                { name: 'orders', p: easeInOut(window01(t, 12.5, 17.5)) },
                { name: 'payments', p: easeInOut(window01(t, 15.0, 21.0)) },
            ];
            const rowsMasked = 1284506 * easeInOut(window01(t, 10.5, 21.5));
            const complete = t > 21.8;

            return `
                <rect x="104" y="160" width="500" height="356" rx="14" fill="#0f172a" stroke="${rose}" stroke-width="2" opacity="0.97"/>
                <text x="128" y="194" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">READINESS ASSESSMENT</text>
                <line x1="128" y1="208" x2="580" y2="208" stroke="#1e293b" stroke-width="1.5"/>
                ${checks.map((item, i) => {
                    const alpha = window01(t, 1.2 + i * 1.5, 1.9 + i * 1.5);
                    const y = 244 + i * 42;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            ${item.warn ? warnIcon(142, y - 6, amber) : check(142, y, emerald, 20)}
                            <text x="168" y="${y}" font-family="${sans}" font-size="18" font-weight="600" fill="${item.warn ? amber : textMain}">${escapeXml(item.text)}</text>
                        </g>
                    `;
                }).join('')}
                <g opacity="${readyAlpha.toFixed(3)}">
                    <rect x="128" y="452" width="452" height="44" rx="10" fill="${emerald}" opacity="0.18"/>
                    <rect x="128" y="452" width="452" height="44" rx="10" fill="none" stroke="${emerald}" stroke-width="2"/>
                    <text x="354" y="481" text-anchor="middle" font-family="${sans}" font-size="17" font-weight="800" letter-spacing="2" fill="${emerald}">READY TO RUN</text>
                </g>

                <g opacity="${jobActive ? 1 : 0.28}">
                    <rect x="660" y="160" width="516" height="356" rx="14" fill="#0f172a" stroke="${jobActive ? rose : '#334155'}" stroke-width="2" opacity="0.97"/>
                    <text x="684" y="194" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">MASKING JOB — RUN #1042</text>
                    <line x1="684" y1="208" x2="1152" y2="208" stroke="#1e293b" stroke-width="1.5"/>
                    ${jobActive ? `
                        ${tables.map((table, i) => {
                            const y = 250 + i * 56;
                            const pct = Math.round(table.p * 100);
                            return `
                                <text x="684" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate400}">${escapeXml(table.name)}</text>
                                <rect x="856" y="${y - 12}" width="236" height="10" rx="5" fill="#1e293b"/>
                                <rect x="856" y="${y - 12}" width="${Math.round(236 * table.p)}" height="10" rx="5" fill="${table.p >= 1 ? emerald : rose}"/>
                                <text x="1152" y="${y}" text-anchor="end" font-family="${mono}" font-size="15" font-weight="700" fill="${table.p >= 1 ? emerald : slate400}">${pct}%</text>
                            `;
                        }).join('')}
                        <text x="684" y="436" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate400}">ROWS MASKED</text>
                        <text x="684" y="486" font-family="${sans}" font-size="42" font-weight="900" fill="${rose}">${fmtInt(rowsMasked)}</text>
                        ${complete ? pill(1064, 470, 'Job complete  ✓', emerald) : ''}
                    ` : `
                        <text x="918" y="345" text-anchor="middle" font-family="${sans}" font-size="16" font-weight="700" letter-spacing="2" fill="${slate500}">AWAITING READINESS</text>
                    `}
                </g>
            `;
        },
    },
    {
        id: 'validate',
        label: 'Step 6 · Validate',
        accent: teal,
        duration: 14,
        captions: [
            { start: 0.6, end: 6.3, text: 'Finally, validation re-scans the masked output with the same discovery engine.' },
            { start: 6.6, end: 13.2, text: 'Zero PII found — proven, not assumed — with a report you can hand to an auditor.' },
        ],
        render(t) {
            const rows = ['email', 'full_name', 'ssn', 'phone', 'card'];
            const values = ['•.••••••@•••••.••', '•••• ••••••', '•••-••-••••', '+• ••• ••• ••••', '•••• •••• •••• ••••'];
            const sweepP = window01(t, 1.0, 7.0) * (rows.length + 0.3);
            const done = sweepP >= rows.length;
            const zeroAlpha = window01(t, 7.4, 8.2);

            return `
                ${shieldIcon(230, 280, teal, 2.1)}
                <g opacity="${zeroAlpha.toFixed(3)}">
                    <text x="360" y="252" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${slate400}">PII FINDINGS</text>
                    <text x="360" y="330" font-family="${sans}" font-size="76" font-weight="900" fill="${teal}">0</text>
                </g>
                ${pill(276, 432, 'Audit-ready report  ✓', teal, { alpha: window01(t, 9.2, 10.0) })}

                <rect x="680" y="164" width="496" height="340" rx="14" fill="#0f172a" stroke="${teal}" stroke-width="2" opacity="0.97"/>
                <text x="704" y="196" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">RE-SCANNING MASKED OUTPUT</text>
                <line x1="704" y1="210" x2="1152" y2="210" stroke="#1e293b" stroke-width="1.5"/>
                ${rows.map((col, i) => {
                    const y = 246 + i * 48;
                    const passed = sweepP > i + 0.5;
                    const scanning = Math.floor(sweepP) === i && !done;
                    return `
                        ${scanning ? `<rect x="692" y="${y - 22}" width="472" height="38" rx="8" fill="${teal}" opacity="0.12"/>` : ''}
                        <text x="704" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(col)}</text>
                        <text x="860" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate400}">${escapeXml(values[i])}</text>
                        ${passed ? check(1136, y + 2, emerald, 20) : ''}
                    `;
                }).join('')}
                ${pill(928, 478, done ? 'Clean — no PII detected' : 'Scanning…', done ? emerald : teal)}
            `;
        },
    },
    {
        id: 'outro',
        label: 'OwlMask',
        accent: cyan,
        duration: 8,
        captions: [
            { start: 0.5, end: 7.3, text: 'OwlMask — mask once, test safely everywhere.' },
        ],
        render(t) {
            const inP = easeInOut(window01(t, 0.2, 1.1));
            const steps = ['Connect', 'Discover', 'Rules', 'Integrity', 'Run', 'Validate'];
            const colors = [sky, cyan, violet, emerald, rose, teal];
            return `
                <g opacity="${inP.toFixed(3)}">
                    <text x="640" y="278" text-anchor="middle" font-family="${sans}" font-size="72" font-weight="900" fill="#ffffff">OwlMask</text>
                    <text x="640" y="318" text-anchor="middle" font-family="${sans}" font-size="22" font-weight="600" fill="${slate400}">the masking engine inside OwlTable</text>
                    <text x="640" y="376" text-anchor="middle" font-family="${sans}" font-size="25" font-weight="500" fill="#cbd5e1">Safe, realistic test data — from your own production schema.</text>
                </g>
                ${steps.map((step, i) => {
                    const alpha = window01(t, 1.2 + i * 0.28, 1.7 + i * 0.28);
                    const w = 168;
                    const x = 106 + i * 180;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="428" width="${w}" height="44" rx="9" fill="#0f172a" stroke="${colors[i]}" stroke-width="1.75"/>
                            ${check(x + 26, 456, colors[i], 17)}
                            <text x="${x + 44}" y="456" font-family="${sans}" font-size="15.5" font-weight="700" fill="${textMain}">${escapeXml(step)}</text>
                        </g>
                    `;
                }).join('')}
                <text x="640" y="512" text-anchor="middle" font-family="${mono}" font-size="17" font-weight="600" fill="${cyan}" opacity="${window01(t, 3.0, 3.8).toFixed(3)}">www.owltable.net</text>
            `;
        },
    },
];


await runVideo({
    slug: 'owlmask-masking-explainer',
    scenes,
    poster: { sceneId: 'rules', t: 26 },
});
