import {
    sans, mono,
    cyan, sky, teal, emerald, rose, violet, amber, slate400, slate500, textMain,
    escapeXml, maskValue, easeInOut, window01, type, fmtInt,
    pill, check, cross, warnIcon, lockIcon, dbIcon, shieldIcon, clockIcon,
    panel, panelTitle, statBlock, hbar,
    runVideo,
} from './lib/video-engine.mjs';

// "OwlTable in five minutes" — platform feature tour (~5:00).

const featureList = [
    'Jobs', 'PII discovery', 'Masking profiles', 'Algorithm playground', 'Subsetting',
    'In-place masking', 'Synthetic data', 'Scheduler', 'Validation', 'Compare & audit',
];

const scenes = [
    {
        id: 'intro',
        label: 'Feature tour',
        accent: violet,
        duration: 14,
        captions: [
            { start: 0.8, end: 6.6, text: 'OwlTable is a data provisioning platform: safe, realistic test databases from production data.' },
            { start: 6.9, end: 13.2, text: 'This is the whole platform in five minutes — ten features, one workflow.' },
        ],
        render(t) {
            const titleP = window01(t, 0.4, 2.0);
            const caretOn = titleP < 1 && Math.floor(t * 6) % 2 === 0;
            const shown = type('OwlTable in five minutes', titleP);
            return `
                <text x="104" y="250" font-family="${sans}" font-size="50" font-weight="900" fill="#ffffff">${escapeXml(shown)}${caretOn ? `<tspan fill="${violet}">|</tspan>` : ''}</text>
                <text x="104" y="302" font-family="${sans}" font-size="25" font-weight="500" fill="#cbd5e1" opacity="${window01(t, 2.2, 3.0).toFixed(3)}">The platform tour: provisioning, masking, and proof.</text>
                <g opacity="${window01(t, 3.6, 4.4).toFixed(3)}">
                    ${dbIcon(880, 420, rose, 1.4)}
                    <text x="880" y="486" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="700" fill="${slate500}">production</text>
                    <path d="M 930 420 C 990 420 990 420 1040 420" fill="none" stroke="${violet}" stroke-width="3" stroke-dasharray="8 7" stroke-dashoffset="-${(t * 30).toFixed(1)}"/>
                    ${dbIcon(1090, 420, emerald, 1.4)}
                    <text x="1090" y="486" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="700" fill="${slate500}">safe test data</text>
                </g>
                ${pill(300, 420, '10 features · 1 workflow', violet, { alpha: window01(t, 5.2, 6.0) })}
            `;
        },
    },
    {
        id: 'map',
        label: 'The map',
        accent: violet,
        duration: 16,
        captions: [
            { start: 0.6, end: 6.4, text: 'Here’s the map. Everything hangs off Jobs — the primary workflow.' },
            { start: 6.7, end: 12.6, text: 'Discovery and masking feed the jobs; validation and audit prove the results.' },
            { start: 12.9, end: 15.4, text: 'Let’s take them one by one.' },
        ],
        render(t) {
            const colors = [rose, cyan, violet, sky, teal, amber, emerald, sky, teal, violet];
            return `
                ${featureList.map((name, i) => {
                    const alpha = window01(t, 0.8 + i * 0.85, 1.5 + i * 0.85);
                    const x = 104 + (i % 5) * 216;
                    const y = 220 + Math.floor(i / 5) * 130;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="${y}" width="196" height="100" rx="12" fill="#0f172a" stroke="${colors[i]}" stroke-width="2"/>
                            <text x="${x + 20}" y="${y + 38}" font-family="${sans}" font-size="15" font-weight="800" fill="${colors[i]}">${String(i + 1).padStart(2, '0')}</text>
                            ${[name.split(' ')[0], name.split(' ').slice(1).join(' ')].filter(Boolean).map((line, w) => `<text x="${x + 20}" y="${y + 64 + w * 24}" font-family="${sans}" font-size="16.5" font-weight="700" fill="${textMain}">${escapeXml(line)}</text>`).join('')}
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'jobs',
        label: '01 · Jobs',
        accent: rose,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Jobs are how work happens: define a provisioning job once, run it forever.' },
            { start: 6.5, end: 12.8, text: 'A job bundles source, target, masking profile, and options into one repeatable unit.' },
            { start: 13.1, end: 19.4, text: 'Every run is gated by the readiness assessment — blockers stop it before any change.' },
            { start: 19.7, end: 25.2, text: 'Full history per job: who ran what, when, and what it touched.' },
        ],
        render(t) {
            const jobs = [
                { name: 'provision-staging', state: 'RUNNING', color: rose, at: 1.4 },
                { name: 'refresh-qa-weekly', state: 'SUCCEEDED', color: emerald, at: 3.2 },
                { name: 'mask-analytics-copy', state: 'QUEUED', color: amber, at: 5.0 },
            ];
            const runP = easeInOut(window01(t, 6.0, 18.0));
            return `
                ${panel(104, 160, 620, 356, rose)}
                ${panelTitle(128, 194, 'Jobs')}
                ${jobs.map((job, i) => {
                    const alpha = window01(t, job.at, job.at + 0.8);
                    const y = 244 + i * 78;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="128" y="${y - 26}" width="568" height="60" rx="10" fill="#111827" stroke="#334155" stroke-width="1.5"/>
                            <text x="152" y="${y + 2}" font-family="${mono}" font-size="17" font-weight="700" fill="${textMain}">${escapeXml(job.name)}</text>
                            ${pill(628, y - 2, job.state, job.color, { size: 11 })}
                            ${i === 0 ? `<rect x="152" y="${y + 12}" width="380" height="6" rx="3" fill="#1e293b"/><rect x="152" y="${y + 12}" width="${Math.round(380 * runP)}" height="6" rx="3" fill="${rose}"/>` : ''}
                        </g>
                    `;
                }).join('')}
                ${pill(414, 492, 'Readiness-gated on every run', emerald, { alpha: window01(t, 14.0, 14.8) })}

                <g opacity="${window01(t, 20.2, 21.0).toFixed(3)}">
                    ${panel(770, 220, 406, 236, '#334155')}
                    ${panelTitle(794, 254, 'Run history · provision-staging', 358)}
                    <text x="794" y="304" font-family="${mono}" font-size="15" font-weight="600" fill="${slate400}">#217  today     3.0M rows  ✓</text>
                    <text x="794" y="338" font-family="${mono}" font-size="15" font-weight="600" fill="${slate400}">#216  last week 2.9M rows  ✓</text>
                    <text x="794" y="372" font-family="${mono}" font-size="15" font-weight="600" fill="${slate400}">#215  blocked — no backup  ✕</text>
                    <text x="794" y="418" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">Every run attributed and kept.</text>
                </g>
            `;
        },
    },
    {
        id: 'discovery',
        label: '02 · PII discovery',
        accent: cyan,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.2, text: 'PII discovery scans every column and classifies what it finds.' },
            { start: 6.5, end: 12.8, text: 'Types and sampled values drive the classification — with a confidence score on every hit.' },
            { start: 13.1, end: 21.2, text: 'Uncertain columns go to a human review queue, so coverage is complete before masking.' },
        ],
        render(t) {
            const rows = [
                { col: 'email', kind: 'EMAIL', conf: '98%', color: cyan },
                { col: 'full_name', kind: 'PERSON', conf: '97%', color: cyan },
                { col: 'iban', kind: 'BANK ACCOUNT', conf: '96%', color: cyan },
                { col: 'notes', kind: 'FREE TEXT', conf: '72%', color: amber, review: true },
                { col: 'created_at', kind: 'NOT PII', conf: '—', color: slate500 },
            ];
            const scanP = window01(t, 1.4, 12.0);
            const scanPos = scanP * (rows.length + 0.35);
            return `
                ${statBlock(104, 230, 'Columns scanned', fmtInt(412 * easeInOut(scanP)), cyan, 1)}
                ${statBlock(104, 340, 'PII found', fmtInt(38 * easeInOut(window01(t, 2.2, 12.4))), emerald, window01(t, 1.8, 2.6))}
                ${pill(210, 430, 'Review queue: 3', amber, { alpha: window01(t, 13.0, 13.8) })}

                ${panel(560, 160, 616, 356, cyan)}
                ${panelTitle(584, 194, 'Classification')}
                ${rows.map((row, i) => {
                    const y = 244 + i * 52;
                    const done = scanPos > i + 0.6;
                    const scanning = Math.floor(scanPos) === i && scanPos < rows.length;
                    const badgeW = row.kind.length * 9.5 + 26;
                    return `
                        ${scanning ? `<rect x="572" y="${y - 23}" width="592" height="40" rx="8" fill="${cyan}" opacity="0.12"/>` : ''}
                        <text x="584" y="${y}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${slate400}">${escapeXml(row.col)}</text>
                        <g opacity="${done ? 1 : 0}">
                            <rect x="800" y="${y - 20}" width="${badgeW}" height="28" rx="14" fill="${row.color}" opacity="0.16"/>
                            <text x="${800 + badgeW / 2}" y="${y - 1}" text-anchor="middle" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="1" fill="${row.color}">${escapeXml(row.kind)}</text>
                            ${row.review ? `<text x="1064" y="${y - 1}" font-family="${sans}" font-size="12" font-weight="800" fill="${amber}">REVIEW</text>` : ''}
                            <text x="1152" y="${y}" text-anchor="end" font-family="${mono}" font-size="15" font-weight="700" fill="${row.color}">${escapeXml(row.conf)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'profiles',
        label: '03 · Masking profiles',
        accent: violet,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.4, text: 'Masking profiles turn classifications into rules: one algorithm per column.' },
            { start: 6.7, end: 13.0, text: 'Synthetic, format-preserving, deterministic — or your own custom algorithms.' },
            { start: 13.3, end: 19.6, text: 'Profiles are named, versioned, and reusable across jobs and environments.' },
            { start: 19.9, end: 25.2, text: 'Change a rule once; every job that uses the profile picks it up.' },
        ],
        render(t) {
            const rules = [
                { col: 'email', algo: 'SYNTHETIC', color: violet, at: 1.8 },
                { col: 'ssn', algo: 'FORMAT-PRESERVING', color: cyan, at: 4.4 },
                { col: 'customer_id', algo: 'DETERMINISTIC', color: emerald, at: 7.0 },
                { col: 'notes', algo: 'CUSTOM · scrub_v2', color: amber, at: 9.6 },
            ];
            const profiles = [
                { name: 'pg-prod-to-staging', meta: '6 rules · v3', at: 14.4 },
                { name: 'mysql-qa-refresh', meta: '9 rules · v1', at: 16.2 },
                { name: 'mssql-analytics', meta: '12 rules · v2', at: 18.0 },
            ];
            return `
                ${panel(104, 160, 620, 300, violet)}
                ${panelTitle(128, 194, 'Profile editor')}
                ${rules.map((rule, i) => {
                    const alpha = window01(t, rule.at, rule.at + 0.8);
                    const y = 246 + i * 50;
                    const badgeW = rule.algo.length * 9.5 + 26;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="128" y="${y}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${textMain}">${escapeXml(rule.col)}</text>
                            <text x="330" y="${y}" font-family="${sans}" font-size="18" font-weight="800" fill="${slate500}">→</text>
                            <rect x="370" y="${y - 20}" width="${badgeW}" height="28" rx="14" fill="${rule.color}" opacity="0.16"/>
                            <text x="${370 + badgeW / 2}" y="${y - 1}" text-anchor="middle" font-family="${sans}" font-size="12.5" font-weight="800" letter-spacing="1" fill="${rule.color}">${escapeXml(rule.algo)}</text>
                        </g>
                    `;
                }).join('')}

                ${profiles.map((profile, i) => {
                    const alpha = window01(t, profile.at, profile.at + 0.8);
                    const y = 200 + i * 96;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="790" y="${y}" width="386" height="76" rx="12" fill="#0f172a" stroke="${violet}" stroke-width="1.75"/>
                            <text x="814" y="${y + 32}" font-family="${mono}" font-size="16.5" font-weight="700" fill="${textMain}">${escapeXml(profile.name)}</text>
                            <text x="814" y="${y + 58}" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">${escapeXml(profile.meta)}</text>
                            ${check(1146, y + 44, violet, 19)}
                        </g>
                    `;
                }).join('')}
                ${pill(414, 496, 'Reusable across every job', violet, { alpha: window01(t, 20.4, 21.2) })}
            `;
        },
    },
    {
        id: 'playground',
        label: '04 · Algorithm playground',
        accent: sky,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'Not sure which algorithm fits? The playground answers that in seconds.' },
            { start: 6.7, end: 13.0, text: 'Paste a sample value, pick an algorithm, and see the masked output instantly.' },
            { start: 13.3, end: 19.2, text: 'Tune options until it looks right, then drop the rule into your profile.' },
        ],
        render(t) {
            const inputP = window01(t, 2.0, 4.0);
            const algos = [
                { name: 'Synthetic email', out: 'k.moreau@dalvex.io', at: 6.0 },
                { name: 'Format-preserving', out: 'r.qixmel@vwape.oy', at: 9.0 },
                { name: 'Deterministic hash', out: 'u84_kd02@masked.io', at: 12.0 },
            ];
            return `
                ${panel(140, 170, 1000, 330, sky)}
                ${panelTitle(164, 204, 'Algorithm playground')}
                <text x="164" y="252" font-family="${sans}" font-size="15" font-weight="700" fill="${slate500}">Sample input</text>
                <rect x="320" y="228" width="400" height="36" rx="7" fill="#111827" stroke="#334155" stroke-width="1.5"/>
                <text x="338" y="252" font-family="${mono}" font-size="16.5" font-weight="600" fill="${textMain}">${escapeXml(type('sarah.chen@acme.io', inputP))}</text>
                ${algos.map((algo, i) => {
                    const alpha = window01(t, algo.at, algo.at + 1.0);
                    const y = 314 + i * 54;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="164" y="${y - 26}" width="300" height="40" rx="8" fill="${sky}" opacity="${0.1 + (i === 0 ? 0.08 : 0)}"/>
                            <text x="184" y="${y}" font-family="${sans}" font-size="16" font-weight="700" fill="${sky}">${escapeXml(algo.name)}</text>
                            <text x="510" y="${y}" font-family="${sans}" font-size="19" font-weight="800" fill="${slate500}">→</text>
                            <text x="560" y="${y}" font-family="${mono}" font-size="17" font-weight="700" fill="${emerald}">${escapeXml(algo.out)}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(996, 252, 'Instant preview', sky, { alpha: window01(t, 7.0, 7.8) })}
            `;
        },
    },
    {
        id: 'subsetting',
        label: '05 · Subsetting',
        accent: teal,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Sometimes you don’t want all of production — you want a slice that fits on a laptop.' },
            { start: 6.5, end: 12.8, text: 'Subsetting carves out a fraction of the data while keeping every relationship complete.' },
            { start: 13.1, end: 19.6, text: 'Take 5% of customers, and their orders, payments, and addresses come along automatically.' },
            { start: 19.9, end: 25.2, text: 'Masked and subsetted in the same job: small, safe, and consistent.' },
        ],
        render(t) {
            const shrinkP = easeInOut(window01(t, 6.0, 10.0));
            const rBig = 120;
            const rSmall = 120 - 68 * shrinkP;
            const tables = ['customers 5%', '+ their orders', '+ their payments', '+ their addresses'];
            return `
                <g opacity="${window01(t, 0.8, 1.6).toFixed(3)}">
                    <circle cx="300" cy="320" r="${rBig}" fill="${rose}" opacity="0.1"/>
                    <circle cx="300" cy="320" r="${rBig}" fill="none" stroke="${rose}" stroke-width="2.5"/>
                    <text x="300" y="310" text-anchor="middle" font-family="${sans}" font-size="19" font-weight="800" fill="${textMain}">Production</text>
                    <text x="300" y="340" text-anchor="middle" font-family="${mono}" font-size="15" font-weight="600" fill="${slate500}">2.1 TB</text>
                </g>
                <text x="520" y="328" font-family="${sans}" font-size="34" font-weight="900" fill="${slate500}" opacity="${window01(t, 5.0, 5.8).toFixed(3)}">→</text>
                <g opacity="${window01(t, 5.6, 6.4).toFixed(3)}">
                    <circle cx="700" cy="320" r="${rSmall.toFixed(1)}" fill="${teal}" opacity="0.12"/>
                    <circle cx="700" cy="320" r="${rSmall.toFixed(1)}" fill="none" stroke="${teal}" stroke-width="2.5"/>
                    <text x="700" y="312" text-anchor="middle" font-family="${sans}" font-size="17" font-weight="800" fill="${textMain}">Subset</text>
                    <text x="700" y="338" text-anchor="middle" font-family="${mono}" font-size="14" font-weight="600" fill="${teal}">${shrinkP >= 1 ? '98 GB' : '…'}</text>
                </g>

                <g opacity="${window01(t, 12.6, 13.4).toFixed(3)}">
                    ${panel(880, 190, 296, 260, teal)}
                    ${panelTitle(904, 224, 'FK closure', 248)}
                    ${tables.map((name, i) => `
                        <g opacity="${window01(t, 13.4 + i * 1.5, 14.1 + i * 1.5).toFixed(3)}">
                            ${check(916, 268 + i * 42, teal, 18)}
                            <text x="938" y="${268 + i * 42}" font-family="${sans}" font-size="15.5" font-weight="600" fill="${textMain}">${escapeXml(name)}</text>
                        </g>
                    `).join('')}
                </g>
                ${pill(400, 496, 'Referentially complete slice — no orphan rows', teal, { alpha: window01(t, 20.4, 21.2) })}
            `;
        },
    },
    {
        id: 'inplace',
        label: '06 · In-place masking',
        accent: amber,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'Already have a copy? In-place masking cleans an existing database where it stands.' },
            { start: 6.7, end: 13.0, text: 'No reprovisioning — the sensitive columns are overwritten in the copy itself.' },
            { start: 13.3, end: 19.2, text: 'It’s destructive by nature, so the readiness gate is strict: backup or no run.' },
        ],
        render(t) {
            const maskP = easeInOut(window01(t, 6.5, 12.0));
            const rows = [
                { col: 'email', raw: 'sarah.chen@acme.io' },
                { col: 'ssn', raw: '412-55-0198' },
                { col: 'phone', raw: '+1 415 555 0142' },
            ];
            return `
                <g>
                    ${panel(140, 180, 520, 300, amber)}
                    ${panelTitle(164, 214, 'qa_copy — masked in place')}
                    ${rows.map((row, i) => {
                        const y = 268 + i * 52;
                        const flipped = maskP > (i + 0.5) / rows.length;
                        return `
                            ${lockIcon(164, y - 16, flipped ? emerald : rose)}
                            <text x="196" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="330" y="${y}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${flipped ? emerald : '#fda4af'}">${escapeXml(flipped ? maskValue(row.raw) : row.raw)}</text>
                        `;
                    }).join('')}
                    ${pill(400, 448, maskP >= 1 ? 'UPDATE complete — same database' : 'Overwriting sensitive columns…', maskP >= 1 ? emerald : amber)}
                </g>
                <g opacity="${window01(t, 13.6, 14.4).toFixed(3)}">
                    ${panel(720, 220, 456, 220, rose)}
                    ${panelTitle(744, 254, 'Strict readiness gate')}
                    ${check(756, 302, emerald, 20)}
                    <text x="782" y="302" font-family="${sans}" font-size="16.5" font-weight="600" fill="${textMain}">Backup verified before start</text>
                    ${cross(756, 344, rose, 20)}
                    <text x="782" y="344" font-family="${sans}" font-size="16.5" font-weight="600" fill="${textMain}">No backup → job blocked</text>
                    ${warnIcon(756, 380, amber)}
                    <text x="782" y="386" font-family="${sans}" font-size="16.5" font-weight="600" fill="${textMain}">Destructive impact shown up front</text>
                </g>
            `;
        },
    },
    {
        id: 'synthetic',
        label: '07 · Synthetic data',
        accent: emerald,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.4, text: 'No production data at all? Synthetic profiles generate realistic rows from scratch.' },
            { start: 6.7, end: 13.0, text: 'Describe the columns, and OwlTable fills new schemas with coherent fake records.' },
            { start: 13.3, end: 21.2, text: 'Perfect for demos, load tests, and features that ship before real data exists.' },
        ],
        render(t) {
            const genRows = [
                ['K. Moreau', 'k.moreau@dalvex.io', 'Austin', '$1,204'],
                ['J. Whitely', 'j.whitely@corvex.net', 'Berlin', '$88'],
                ['A. Ferrand', 'a.ferrand@lumeo.org', 'Osaka', '$402'],
                ['T. Okafor', 't.okafor@nervia.co', 'Lagos', '$96'],
            ];
            const count = fmtInt(50000 * easeInOut(window01(t, 3.0, 14.0)));
            return `
                ${statBlock(104, 240, 'Rows generated', count, emerald, 1)}
                <text x="104" y="330" font-family="${sans}" font-size="16" font-weight="600" fill="${slate500}" opacity="${window01(t, 4.0, 4.8).toFixed(3)}">from an empty schema</text>
                ${pill(230, 400, 'No source database needed', emerald, { alpha: window01(t, 7.0, 7.8) })}

                ${panel(560, 170, 616, 330, emerald)}
                ${panelTitle(584, 204, 'synthetic profile · demo_shop')}
                <text x="584" y="242" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">NAME · EMAIL · CITY · LTV</text>
                ${genRows.map((row, i) => {
                    const alpha = window01(t, 3.4 + i * 2.2, 4.2 + i * 2.2);
                    const y = 282 + i * 46;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="584" y="${y}" font-family="${mono}" font-size="15" font-weight="600" fill="${textMain}">${escapeXml(row[0])}</text>
                            <text x="724" y="${y}" font-family="${mono}" font-size="14.5" font-weight="600" fill="${slate400}">${escapeXml(row[1])}</text>
                            <text x="962" y="${y}" font-family="${mono}" font-size="14.5" font-weight="600" fill="${slate400}">${escapeXml(row[2])}</text>
                            <text x="1152" y="${y}" text-anchor="end" font-family="${mono}" font-size="14.5" font-weight="700" fill="${emerald}">${escapeXml(row[3])}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(868, 478, 'Coherent, realistic, invented', emerald, { alpha: window01(t, 13.6, 14.4) })}
            `;
        },
    },
    {
        id: 'scheduler',
        label: '08 · Scheduler',
        accent: sky,
        duration: 24,
        captions: [
            { start: 0.6, end: 6.4, text: 'Good test data goes stale. The scheduler keeps it fresh without anyone remembering to.' },
            { start: 6.7, end: 13.0, text: 'Cron-style schedules run your jobs nightly, weekly — whatever the environment needs.' },
            { start: 13.3, end: 19.4, text: 'Monitoring tracks every run; failures surface immediately with full history.' },
            { start: 19.7, end: 23.4, text: 'Set it once, and staging refreshes itself.' },
        ],
        render(t) {
            const runs = [
                { day: 'Mon 02:00', ok: true, at: 8.0 },
                { day: 'Tue 02:00', ok: true, at: 9.2 },
                { day: 'Wed 02:00', ok: false, at: 10.4 },
                { day: 'Thu 02:00', ok: true, at: 11.6 },
                { day: 'Fri 02:00', ok: true, at: 12.8 },
            ];
            return `
                ${panel(104, 170, 560, 330, sky)}
                ${panelTitle(128, 204, 'Schedule · refresh-staging')}
                ${clockIcon(150, 260, sky, 16)}
                <text x="184" y="266" font-family="${mono}" font-size="18" font-weight="700" fill="${textMain}">0 2 * * *</text>
                <text x="360" y="266" font-family="${sans}" font-size="15" font-weight="600" fill="${slate500}">nightly at 02:00</text>
                <text x="128" y="316" font-family="${sans}" font-size="15.5" font-weight="600" fill="${slate400}" opacity="${window01(t, 3.0, 3.8).toFixed(3)}">job: provision-staging</text>
                <text x="128" y="348" font-family="${sans}" font-size="15.5" font-weight="600" fill="${slate400}" opacity="${window01(t, 4.2, 5.0).toFixed(3)}">profile: pg-prod-to-staging v3</text>
                ${pill(384, 448, 'Next run in 4h 12m', sky, { alpha: window01(t, 5.6, 6.4) })}

                ${panel(720, 170, 456, 330, '#334155')}
                ${panelTitle(744, 204, 'Run history')}
                ${runs.map((run, i) => {
                    const alpha = window01(t, run.at, run.at + 0.7);
                    const y = 250 + i * 42;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="744" y="${y}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${slate400}">${escapeXml(run.day)}</text>
                            ${run.ok ? check(1000, y, emerald, 18) : cross(1000, y, rose, 17)}
                            <text x="1030" y="${y}" font-family="${sans}" font-size="14" font-weight="600" fill="${run.ok ? slate500 : rose}">${run.ok ? '3.0M rows' : 'alerted'}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(948, 470, 'Failures alert immediately', rose, { alpha: window01(t, 14.2, 15.0) })}
            `;
        },
    },
    {
        id: 'validation',
        label: '09 · Validation',
        accent: teal,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'The validation suite is the platform’s second workflow: proving the data is safe.' },
            { start: 6.7, end: 13.2, text: 'PII re-discovery on the output, masking validation per rule, and profile checks per column.' },
            { start: 13.5, end: 19.2, text: 'Three green panels mean the environment is provably clean.' },
        ],
        render(t) {
            const panels = [
                { name: 'PII discovery', result: '0 findings', at: 2.0 },
                { name: 'Masking validation', result: '6/6 rules effective', at: 5.4 },
                { name: 'Profile check', result: '46/46 columns covered', at: 8.8 },
            ];
            return `
                <text x="104" y="210" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Three checks, one answer</text>
                ${panels.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.9);
                    const done = t > item.at + 2.2;
                    const x = 104 + i * 368;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="250" width="336" height="200" rx="14" fill="#0f172a" stroke="${done ? emerald : teal}" stroke-width="2"/>
                            ${shieldIcon(x + 168, 320, done ? emerald : teal, 1.1)}
                            <text x="${x + 168}" y="392" text-anchor="middle" font-family="${sans}" font-size="17" font-weight="800" fill="${textMain}">${escapeXml(item.name)}</text>
                            <text x="${x + 168}" y="422" text-anchor="middle" font-family="${mono}" font-size="14.5" font-weight="700" fill="${done ? emerald : slate500}">${escapeXml(done ? item.result : 'running…')}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(640, 500, 'Provably clean — not just probably', emerald, { alpha: window01(t, 14.0, 14.8) })}
            `;
        },
    },
    {
        id: 'compare',
        label: '10 · Compare & audit',
        accent: violet,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.4, text: 'Data compare shows exactly what changed between source and masked target.' },
            { start: 6.7, end: 12.8, text: 'Row counts match, structures match — only the sensitive values differ.' },
            { start: 13.1, end: 17.4, text: 'And the evidence pack bundles it all for your auditor.' },
        ],
        render(t) {
            const rows = [
                { col: 'rows', src: '412,880', dst: '412,880', same: true },
                { col: 'columns', src: '12', dst: '12', same: true },
                { col: 'email', src: 'sarah.chen@…', dst: 'k.moreau@…', same: false },
                { col: 'balance', src: '$18,420.55', dst: '$18,420.55', same: true },
            ];
            return `
                ${panel(104, 170, 720, 300, violet)}
                ${panelTitle(128, 204, 'Compare · prod vs staging_masked')}
                <text x="360" y="240" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">SOURCE</text>
                <text x="580" y="240" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">TARGET</text>
                ${rows.map((row, i) => {
                    const alpha = window01(t, 1.6 + i * 1.7, 2.4 + i * 1.7);
                    const y = 276 + i * 44;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="128" y="${y}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="360" y="${y}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${slate400}">${escapeXml(row.src)}</text>
                            <text x="580" y="${y}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${row.same ? slate400 : violet}">${escapeXml(row.dst)}</text>
                            ${row.same ? check(780, y, emerald, 17) : pill(772, y - 5, 'masked', violet, { size: 11 })}
                        </g>
                    `;
                }).join('')}
                ${pill(464, 442, 'Identical shape, different people', violet, { alpha: window01(t, 8.6, 9.4) })}

                <g opacity="${window01(t, 13.4, 14.2).toFixed(3)}">
                    ${panel(870, 240, 306, 160, violet)}
                    <text x="1023" y="300" text-anchor="middle" font-family="${sans}" font-size="19" font-weight="800" fill="#ffffff">evidence-pack.zip</text>
                    ${pill(1023, 352, 'Auditor-ready', violet)}
                </g>
            `;
        },
    },
    {
        id: 'access',
        label: 'Access & SSO',
        accent: sky,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.2, text: 'All of this sits behind role-based access with single sign-on.' },
            { start: 6.5, end: 12.6, text: 'Engineers run jobs; admins manage rules; auditors get read-only proof.' },
            { start: 12.9, end: 17.4, text: 'Central identity, per-user permissions, full attribution.' },
        ],
        render(t) {
            const roles = [
                { role: 'Engineer', can: 'run jobs, view results', at: 1.6 },
                { role: 'Data admin', can: 'edit profiles and rules', at: 4.2 },
                { role: 'Auditor', can: 'read-only evidence access', at: 6.8 },
            ];
            return `
                ${shieldIcon(240, 300, sky, 2.2)}
                ${pill(240, 420, 'SSO enabled', sky, { alpha: window01(t, 8.0, 8.8) })}
                ${roles.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.8);
                    const y = 210 + i * 92;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="430" y="${y}" width="710" height="72" rx="12" fill="#0f172a" stroke="${sky}" stroke-width="1.75"/>
                            <text x="458" y="${y + 32}" font-family="${sans}" font-size="18" font-weight="800" fill="${sky}">${escapeXml(item.role)}</text>
                            <text x="458" y="${y + 58}" font-family="${sans}" font-size="15" font-weight="600" fill="${slate400}">${escapeXml(item.can)}</text>
                            ${check(1100, y + 44, sky, 20)}
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'together',
        label: 'One workflow',
        accent: violet,
        duration: 16,
        captions: [
            { start: 0.6, end: 6.6, text: 'Together it’s one loop: discover, mask, provision, validate — on a schedule, with proof.' },
            { start: 6.9, end: 15.2, text: 'That’s the difference between “we copied prod” and a managed test-data platform.' },
        ],
        render(t) {
            const steps = ['Discover', 'Mask', 'Provision', 'Validate'];
            const colors = [cyan, violet, rose, teal];
            const loopP = window01(t, 1.0, 6.0);
            return `
                ${steps.map((step, i) => {
                    const alpha = window01(t, 1.0 + i * 1.1, 1.8 + i * 1.1);
                    const x = 170 + i * 260;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="280" width="200" height="80" rx="14" fill="#0f172a" stroke="${colors[i]}" stroke-width="2.5"/>
                            <text x="${x + 100}" y="328" text-anchor="middle" font-family="${sans}" font-size="21" font-weight="800" fill="${textMain}">${escapeXml(step)}</text>
                            ${i < 3 ? `<text x="${x + 226}" y="328" font-family="${sans}" font-size="26" font-weight="900" fill="${slate500}" opacity="${window01(t, 1.6 + i * 1.1, 2.4 + i * 1.1).toFixed(3)}">→</text>` : ''}
                        </g>
                    `;
                }).join('')}
                <path d="M 1070 400 C 1070 480 210 480 210 400" fill="none" stroke="${violet}" stroke-width="2.5" stroke-dasharray="9 8" stroke-dashoffset="-${(t * 26).toFixed(1)}" opacity="${(loopP * 0.8).toFixed(3)}"/>
                ${pill(640, 478, 'Repeats on schedule', violet, { alpha: window01(t, 6.4, 7.2) })}
                ${pill(640, 220, 'The provisioning loop', violet, { alpha: window01(t, 0.6, 1.4) })}
            `;
        },
    },
    {
        id: 'outro',
        label: 'OwlTable',
        accent: violet,
        duration: 12,
        captions: [
            { start: 0.5, end: 6.6, text: 'OwlTable — ten features, one job: safe, realistic test data everywhere you need it.' },
            { start: 6.9, end: 11.4, text: 'Take the tour yourself at owltable.net.' },
        ],
        render(t) {
            const inP = easeInOut(window01(t, 0.2, 1.1));
            return `
                <g opacity="${inP.toFixed(3)}">
                    <text x="640" y="266" text-anchor="middle" font-family="${sans}" font-size="66" font-weight="900" fill="#ffffff">OwlTable</text>
                    <text x="640" y="316" text-anchor="middle" font-family="${sans}" font-size="23" font-weight="500" fill="#cbd5e1">The test-data platform: provision, mask, prove.</text>
                </g>
                ${featureList.map((name, i) => {
                    const alpha = window01(t, 1.2 + i * 0.22, 1.6 + i * 0.22);
                    const x = 112 + (i % 5) * 214;
                    const y = 368 + Math.floor(i / 5) * 58;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="${y}" width="202" height="44" rx="9" fill="#0f172a" stroke="${violet}" stroke-width="1.5"/>
                            ${check(x + 22, y + 28, violet, 15)}
                            <text x="${x + 40}" y="${y + 28}" font-family="${sans}" font-size="13" font-weight="700" fill="${textMain}">${escapeXml(name)}</text>
                        </g>
                    `;
                }).join('')}
                <text x="640" y="516" text-anchor="middle" font-family="${mono}" font-size="17" font-weight="600" fill="${violet}" opacity="${window01(t, 4.0, 4.8).toFixed(3)}">www.owltable.net</text>
            `;
        },
    },
];

await runVideo({
    slug: 'owltable-feature-tour',
    scenes,
    poster: { sceneId: 'map', t: 12 },
    brandTspan: `<tspan fill="${violet}">Platform</tspan>`,
    chordPeriod: 52,
    crf: 23,
});
