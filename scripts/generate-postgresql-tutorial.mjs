import {
    sans, mono,
    cyan, sky, teal, emerald, rose, violet, amber, slate400, slate500, textMain,
    escapeXml, maskValue, easeInOut, window01, type, fmtInt,
    pill, check, warnIcon, lockIcon, dbIcon, shieldIcon,
    panel, panelTitle, statBlock, hbar, terminal,
    runVideo,
} from './lib/video-engine.mjs';

// "How to configure PostgreSQL masking with OwlMask" — step-by-step tutorial (~5:00).

const scenes = [
    {
        id: 'intro',
        label: 'PostgreSQL tutorial',
        accent: sky,
        duration: 14,
        captions: [
            { start: 0.8, end: 6.6, text: 'In this tutorial we take a PostgreSQL database from raw production copy to masked and verified.' },
            { start: 6.9, end: 13.2, text: 'Eleven concrete steps — the same flow works for MySQL and SQL Server.' },
        ],
        render(t) {
            const titleP = window01(t, 0.4, 2.0);
            const caretOn = titleP < 1 && Math.floor(t * 6) % 2 === 0;
            const shown = type('Mask a PostgreSQL database', titleP);
            const elephantAlpha = window01(t, 2.6, 3.4);
            return `
                <text x="104" y="240" font-family="${sans}" font-size="46" font-weight="900" fill="#ffffff">${escapeXml(shown)}${caretOn ? `<tspan fill="${sky}">|</tspan>` : ''}</text>
                <text x="104" y="292" font-family="${sans}" font-size="25" font-weight="500" fill="#cbd5e1" opacity="${window01(t, 2.2, 3.0).toFixed(3)}">Step by step, from connection to verified output.</text>
                <g opacity="${elephantAlpha.toFixed(3)}">
                    ${dbIcon(980, 280, sky, 2.4)}
                    <text x="980" y="376" text-anchor="middle" font-family="${mono}" font-size="19" font-weight="700" fill="${sky}">postgresql://prod</text>
                </g>
                ${['Connect', 'Classify', 'Mask', 'Verify'].map((step, i) => {
                    const alpha = window01(t, 4.0 + i * 0.8, 4.7 + i * 0.8);
                    const x = 104 + i * 236;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="380" width="216" height="52" rx="10" fill="#0f172a" stroke="${sky}" stroke-width="1.75"/>
                            <text x="${x + 22}" y="413" font-family="${sans}" font-size="17" font-weight="800" fill="${sky}">0${i + 1}</text>
                            <text x="${x + 60}" y="413" font-family="${sans}" font-size="18" font-weight="700" fill="${textMain}">${escapeXml(step)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'prereqs',
        label: 'Prerequisites',
        accent: sky,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.4, text: 'You need three things: a reachable PostgreSQL source, a target to provision, and OwlTable.' },
            { start: 6.7, end: 12.6, text: 'Create a read-only role for the source — masking never needs write access to production.' },
            { start: 12.9, end: 17.4, text: 'That single GRANT is the only setup PostgreSQL needs.' },
        ],
        render(t) {
            const items = [
                { text: 'PostgreSQL source (any supported version)', at: 1.2 },
                { text: 'Empty target database for the masked copy', at: 2.8 },
                { text: 'OwlTable with the OwlMask module', at: 4.4 },
            ];
            const sqlLines = [
                { text: 'CREATE ROLE owlmask_reader LOGIN;', at: 7.4, color: teal },
                { text: 'GRANT CONNECT ON DATABASE prod TO owlmask_reader;', at: 9.6, color: teal },
                { text: 'GRANT SELECT ON ALL TABLES IN SCHEMA public', at: 12.0, color: teal },
                { text: '  TO owlmask_reader;', at: 13.8, color: teal },
            ];
            return `
                <text x="104" y="200" font-family="${sans}" font-size="32" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Before you start</text>
                ${items.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.7);
                    const y = 244 + i * 50;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            ${check(122, y, emerald, 20)}
                            <text x="150" y="${y}" font-family="${sans}" font-size="18" font-weight="600" fill="${textMain}">${escapeXml(item.text)}</text>
                        </g>
                    `;
                }).join('')}
                ${terminal(104, 396, 700, 130, 'psql — read-only role', sqlLines.slice(0, 2), t)}
                ${pill(990, 430, 'SELECT-only on production', emerald, { alpha: window01(t, 13.0, 13.8) })}
            `;
        },
    },
    {
        id: 'connect',
        label: 'Step 1 · Connect',
        accent: sky,
        duration: 24,
        captions: [
            { start: 0.6, end: 6.2, text: 'Step one: register the source connection in OwlTable.' },
            { start: 6.5, end: 12.4, text: 'Host, port, database, the read-only role, and SSL mode — then test the connection.' },
            { start: 12.7, end: 18.4, text: 'Do the same for the target database that will receive the masked copy.' },
            { start: 18.7, end: 23.4, text: 'Green check on both — you’re connected.' },
        ],
        render(t) {
            const fields = [
                { label: 'Host', value: 'db-prod.internal', at: 2.0 },
                { label: 'Port', value: '5432', at: 4.2 },
                { label: 'Database', value: 'prod', at: 5.6 },
                { label: 'User', value: 'owlmask_reader', at: 7.2 },
                { label: 'SSL mode', value: 'require', at: 9.0 },
            ];
            const tested = t > 11.4;
            const targetAlpha = window01(t, 13.2, 14.0);
            const targetOk = t > 17.0;
            return `
                ${panel(104, 160, 560, 356, sky)}
                ${panelTitle(128, 194, 'Source connection · PostgreSQL')}
                ${fields.map((field, i) => {
                    const p = window01(t, field.at, field.at + 1.0);
                    const y = 240 + i * 46;
                    return `
                        <text x="128" y="${y}" font-family="${sans}" font-size="15" font-weight="700" fill="${slate500}">${escapeXml(field.label)}</text>
                        <rect x="260" y="${y - 24}" width="376" height="34" rx="7" fill="#111827" stroke="#334155" stroke-width="1.5"/>
                        <text x="276" y="${y - 1}" font-family="${mono}" font-size="16" font-weight="600" fill="${textMain}">${escapeXml(type(field.value, p))}</text>
                    `;
                }).join('')}
                <g opacity="${window01(t, 10.6, 11.2).toFixed(3)}">
                    <rect x="128" y="466" width="240" height="38" rx="8" fill="${sky}" opacity="0.18"/>
                    <text x="248" y="491" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="1" fill="${sky}">TEST CONNECTION</text>
                </g>
                ${tested ? pill(520, 485, 'Connected ✓', emerald) : ''}

                <g opacity="${targetAlpha.toFixed(3)}">
                    ${panel(720, 230, 456, 216, '#334155')}
                    ${panelTitle(744, 264, 'Target connection')}
                    <text x="744" y="316" font-family="${mono}" font-size="16.5" font-weight="600" fill="${textMain}">db-staging.internal:5432</text>
                    <text x="744" y="348" font-family="${mono}" font-size="16.5" font-weight="600" fill="${slate400}">database: staging_masked</text>
                    ${targetOk ? pill(948, 404, 'Connected ✓', emerald) : pill(948, 404, 'Testing…', amber)}
                </g>
            `;
        },
    },
    {
        id: 'schema',
        label: 'Step 2 · Scan schema',
        accent: sky,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.4, text: 'Step two: OwlMask walks the PostgreSQL catalog and maps your schema.' },
            { start: 6.7, end: 13.0, text: 'Tables, columns, types, row estimates — plus every foreign key and sequence.' },
            { start: 13.3, end: 21.2, text: 'This map is what later keeps masked keys consistent and constraints intact.' },
        ],
        render(t) {
            const tables = [
                { name: 'customers', rows: '412,880', at: 2.2 },
                { name: 'orders', rows: '1,204,551', at: 3.6 },
                { name: 'payments', rows: '980,442', at: 5.0 },
                { name: 'addresses', rows: '388,104', at: 6.4 },
                { name: 'support_notes', rows: '96,733', at: 7.8 },
            ];
            return `
                ${panel(104, 160, 640, 356, sky)}
                ${panelTitle(128, 194, 'Schema map · public')}
                <text x="128" y="232" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">TABLE</text>
                <text x="600" y="232" text-anchor="end" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="2" fill="${slate500}">EST. ROWS</text>
                ${tables.map((table, i) => {
                    const alpha = window01(t, table.at, table.at + 0.7);
                    const y = 268 + i * 44;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="128" y="${y}" font-family="${mono}" font-size="17" font-weight="600" fill="${textMain}">${escapeXml(table.name)}</text>
                            <text x="600" y="${y}" text-anchor="end" font-family="${mono}" font-size="16" font-weight="600" fill="${slate400}">${escapeXml(table.rows)}</text>
                            ${check(688, y, emerald, 18)}
                        </g>
                    `;
                }).join('')}
                ${pill(424, 492, '5 tables · 46 columns mapped', sky, { alpha: window01(t, 9.4, 10.2) })}

                <g opacity="${window01(t, 11.4, 12.2).toFixed(3)}">
                    ${panel(790, 220, 386, 236, emerald)}
                    ${panelTitle(814, 254, 'Also captured', 338)}
                    <text x="814" y="304" font-family="${sans}" font-size="17" font-weight="600" fill="${textMain}">7 foreign keys</text>
                    <text x="814" y="340" font-family="${sans}" font-size="17" font-weight="600" fill="${textMain}">5 sequences</text>
                    <text x="814" y="376" font-family="${sans}" font-size="17" font-weight="600" fill="${textMain}">11 unique constraints</text>
                    ${check(1136, 304, emerald, 18)}
                    ${check(1136, 340, emerald, 18)}
                    ${check(1136, 376, emerald, 18)}
                </g>
            `;
        },
    },
    {
        id: 'discover',
        label: 'Step 3 · Discover PII',
        accent: cyan,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Step three: run PII discovery across all 46 columns.' },
            { start: 6.5, end: 12.6, text: 'The classifier reads names, types, and sampled values — not just column names.' },
            { start: 12.9, end: 19.2, text: 'Each hit gets a type and confidence; a jsonb notes field lands in the review queue.' },
            { start: 19.5, end: 25.4, text: 'PostgreSQL types like jsonb, citext, and inet are handled natively.' },
        ],
        render(t) {
            const rows = [
                { col: 'email  citext', kind: 'EMAIL', conf: '98%', color: cyan },
                { col: 'full_name  text', kind: 'PERSON', conf: '97%', color: cyan },
                { col: 'ssn  varchar(11)', kind: 'NATIONAL ID', conf: '99%', color: cyan },
                { col: 'ip_addr  inet', kind: 'IP ADDRESS', conf: '95%', color: cyan },
                { col: 'meta  jsonb', kind: 'FREE TEXT', conf: '71%', color: amber, review: true },
                { col: 'created_at  timestamptz', kind: 'NOT PII', conf: '—', color: slate500 },
            ];
            const scanP = window01(t, 1.6, 15.0);
            const scanPos = scanP * (rows.length + 0.35);
            const scanned = Math.round(46 * easeInOut(window01(t, 1.6, 15.0)));
            return `
                ${statBlock(104, 220, 'Columns scanned', String(scanned), cyan, 1)}
                ${statBlock(104, 330, 'PII columns', String(Math.round(9 * easeInOut(window01(t, 3.0, 15.4)))), emerald, window01(t, 2.6, 3.4))}
                ${pill(206, 420, '1 flagged for review', amber, { alpha: window01(t, 15.8, 16.6) })}

                ${panel(560, 160, 616, 356, cyan)}
                <text x="584" y="192" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">COLUMN · PG TYPE</text>
                <text x="900" y="192" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">CLASSIFICATION</text>
                <line x1="584" y1="206" x2="1152" y2="206" stroke="#1e293b" stroke-width="1.5"/>
                ${rows.map((row, i) => {
                    const y = 240 + i * 46;
                    const done = scanPos > i + 0.6;
                    const scanning = Math.floor(scanPos) === i && scanPos < rows.length;
                    return `
                        ${scanning ? `<rect x="572" y="${y - 21}" width="592" height="36" rx="8" fill="${cyan}" opacity="0.12"/>` : ''}
                        <text x="584" y="${y}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${slate400}">${escapeXml(row.col)}</text>
                        <g opacity="${done ? 1 : 0}">
                            <rect x="900" y="${y - 19}" width="${row.kind.length * 9 + 24}" height="27" rx="13.5" fill="${row.color}" opacity="0.16"/>
                            <text x="${900 + (row.kind.length * 9 + 24) / 2}" y="${y - 1}" text-anchor="middle" font-family="${sans}" font-size="12.5" font-weight="800" letter-spacing="1" fill="${row.color}">${escapeXml(row.kind)}</text>
                            ${row.review ? `<text x="1046" y="${y - 1}" font-family="${sans}" font-size="11.5" font-weight="800" fill="${amber}">REVIEW</text>` : ''}
                            <text x="1152" y="${y}" text-anchor="end" font-family="${mono}" font-size="15" font-weight="700" fill="${row.color}">${escapeXml(row.conf)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'review',
        label: 'Step 4 · Review',
        accent: amber,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.4, text: 'Step four: a human approves the classification before any rule is applied.' },
            { start: 6.7, end: 12.8, text: 'The flagged jsonb field turns out to hold support notes with names — approve it as PII.' },
            { start: 13.1, end: 17.4, text: 'Nothing gets silently skipped, and nothing gets masked by accident.' },
        ],
        render(t) {
            const approved = t > 10.4;
            return `
                ${panel(180, 180, 920, 300, amber)}
                ${panelTitle(204, 214, 'Review queue · 1 item')}
                <text x="204" y="268" font-family="${mono}" font-size="18" font-weight="700" fill="${textMain}">support_notes.meta  <tspan fill="${slate500}">jsonb</tspan></text>
                <rect x="204" y="288" width="672" height="76" rx="8" fill="#111827" stroke="#334155" stroke-width="1.5"/>
                <text x="222" y="318" font-family="${mono}" font-size="14.5" font-weight="600" fill="${slate400}">{"note": "Called Sarah Chen re: refund,</text>
                <text x="222" y="344" font-family="${mono}" font-size="14.5" font-weight="600" fill="${slate400}">  cb +1 415 555 0142", "agent": "mw"}</text>
                <text x="204" y="400" font-family="${sans}" font-size="15.5" font-weight="600" fill="${slate500}">Sampled values contain person names and phone numbers.</text>
                <g opacity="${window01(t, 8.6, 9.2).toFixed(3)}">
                    <rect x="204" y="420" width="220" height="40" rx="8" fill="${emerald}" opacity="${approved ? 0.3 : 0.15}"/>
                    <rect x="204" y="420" width="220" height="40" rx="8" fill="none" stroke="${emerald}" stroke-width="2"/>
                    <text x="314" y="446" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="1" fill="${emerald}">APPROVE AS PII</text>
                    <rect x="444" y="420" width="180" height="40" rx="8" fill="none" stroke="#475569" stroke-width="1.5"/>
                    <text x="534" y="446" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="700" fill="${slate500}">DISMISS</text>
                </g>
                ${approved ? pill(984, 440, 'Approved · Free text', emerald) : ''}
            `;
        },
    },
    {
        id: 'profile',
        label: 'Step 5 · Masking profile',
        accent: violet,
        duration: 28,
        captions: [
            { start: 0.6, end: 6.2, text: 'Step five: build the masking profile — one rule per sensitive column.' },
            { start: 6.5, end: 12.8, text: 'Emails and names get synthetic values; the SSN gets a format-preserving transform.' },
            { start: 13.1, end: 19.4, text: 'customer_id is deterministic, so the same customer masks identically everywhere.' },
            { start: 19.7, end: 27.2, text: 'Save it as a named profile — the next refresh reuses it with one click.' },
        ],
        render(t) {
            const rules = [
                { col: 'email', algo: 'Synthetic email', color: violet, at: 2.2 },
                { col: 'full_name', algo: 'Synthetic name', color: violet, at: 4.6 },
                { col: 'ssn', algo: 'Format-preserving', color: cyan, at: 7.6 },
                { col: 'ip_addr', algo: 'Format-preserving', color: cyan, at: 10.0 },
                { col: 'customer_id', algo: 'Deterministic', color: emerald, at: 13.6 },
                { col: 'meta (jsonb)', algo: 'Text scrub', color: amber, at: 16.2 },
            ];
            const savedAlpha = window01(t, 20.6, 21.6);
            return `
                ${panel(104, 160, 700, 356, violet)}
                ${panelTitle(128, 194, 'Masking profile · rules')}
                ${rules.map((rule, i) => {
                    const alpha = window01(t, rule.at, rule.at + 0.8);
                    const y = 240 + i * 46;
                    const badgeW = rule.algo.length * 9.5 + 26;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <text x="128" y="${y}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${textMain}">${escapeXml(rule.col)}</text>
                            <text x="400" y="${y}" font-family="${sans}" font-size="18" font-weight="800" fill="${slate500}">→</text>
                            <rect x="440" y="${y - 20}" width="${badgeW}" height="28" rx="14" fill="${rule.color}" opacity="0.16"/>
                            <text x="${440 + badgeW / 2}" y="${y - 1}" text-anchor="middle" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="1" fill="${rule.color}">${escapeXml(rule.algo.toUpperCase())}</text>
                            ${check(760, y, emerald, 18)}
                        </g>
                    `;
                }).join('')}

                <g opacity="${savedAlpha.toFixed(3)}">
                    ${panel(850, 240, 326, 200, violet)}
                    <text x="1013" y="300" text-anchor="middle" font-family="${mono}" font-size="18" font-weight="700" fill="#ffffff">pg-prod-to-staging</text>
                    <text x="1013" y="332" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">6 rules · v1</text>
                    ${pill(1013, 392, 'Profile saved', violet)}
                </g>
            `;
        },
    },
    {
        id: 'integrity',
        label: 'Step 6 · Foreign keys',
        accent: emerald,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.6, text: 'Step six is automatic: OwlMask uses the FK map from the schema scan.' },
            { start: 6.9, end: 13.2, text: 'customers.id and every referencing column get the same deterministic mapping.' },
            { start: 13.5, end: 19.2, text: 'orders and payments still join to the right customer after masking.' },
        ],
        render(t) {
            const flip = easeInOut(window01(t, 7.4, 8.6));
            const key = flip > 0.5 ? '88317' : '10042';
            const keyColor = flip > 0.5 ? emerald : textMain;
            const joined = t > 10.0;
            const refs = [
                { table: 'customers', col: 'id', tag: 'PK', x: 120, y: 210 },
                { table: 'orders', col: 'customer_id', tag: 'FK', x: 760, y: 210 },
                { table: 'payments', col: 'customer_id', tag: 'FK', x: 760, y: 370 },
            ];
            return `
                ${refs.map((ref, i) => `
                    <g opacity="${window01(t, 1.0 + i * 0.9, 1.8 + i * 0.9).toFixed(3)}">
                        ${panel(ref.x, ref.y, 400, 120, joined ? emerald : '#334155')}
                        <text x="${ref.x + 24}" y="${ref.y + 40}" font-family="${mono}" font-size="18" font-weight="700" fill="${textMain}">${escapeXml(ref.table)}</text>
                        <text x="${ref.x + 24}" y="${ref.y + 82}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${slate500}">${escapeXml(ref.col)}  <tspan fill="${keyColor}" font-weight="700">${escapeXml(key)}</tspan></text>
                        <text x="${ref.x + 356}" y="${ref.y + 44}" font-family="${sans}" font-size="12" font-weight="800" letter-spacing="1" fill="${ref.tag === 'PK' ? amber : sky}">${ref.tag}</text>
                    </g>
                `).join('')}
                <path d="M 520 292 C 640 292 640 292 760 292" fill="none" stroke="${joined ? emerald : '#475569'}" stroke-width="3" opacity="0.9"/>
                <path d="M 520 292 C 640 292 640 452 760 452" fill="none" stroke="${joined ? emerald : '#475569'}" stroke-width="3" opacity="0.9"/>
                ${joined ? pill(640, 176, 'Joins intact ✓', emerald) : (t > 5.0 ? pill(640, 176, 'Remapping keys…', amber) : '')}
            `;
        },
    },
    {
        id: 'constraints',
        label: 'Step 7 · Constraints',
        accent: emerald,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.6, text: 'Step seven, also automatic: PostgreSQL constraints are respected, not fought.' },
            { start: 6.9, end: 13.0, text: 'Unique columns get collision-free outputs; NOT NULL stays NOT NULL; sequences keep working.' },
            { start: 13.3, end: 17.4, text: 'The masked database restores and runs like the real one.' },
        ],
        render(t) {
            const items = [
                { name: 'UNIQUE (email)', note: 'collision-free masked values', at: 1.6 },
                { name: 'NOT NULL', note: 'no nulls introduced', at: 4.6 },
                { name: 'CHECK (price >= 0)', note: 'numeric ranges respected', at: 7.6 },
                { name: 'SEQUENCES', note: 'nextval keeps working', at: 10.6 },
            ];
            return `
                <text x="104" y="206" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Constraints survive masking</text>
                ${items.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.8);
                    const y = 252 + i * 68;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="104" y="${y}" width="1072" height="52" rx="10" fill="#0f172a" stroke="${emerald}" stroke-width="1.75"/>
                            <text x="132" y="${y + 33}" font-family="${mono}" font-size="17" font-weight="700" fill="${emerald}">${escapeXml(item.name)}</text>
                            <text x="440" y="${y + 33}" font-family="${sans}" font-size="16.5" font-weight="600" fill="${slate400}">${escapeXml(item.note)}</text>
                            ${check(1136, y + 33, emerald, 20)}
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'readiness',
        label: 'Step 8 · Readiness',
        accent: rose,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'Step eight: before the job can start, OwlTable runs its readiness assessment.' },
            { start: 6.7, end: 13.0, text: 'Permissions, target capacity, backups, and rule coverage of every approved PII column.' },
            { start: 13.3, end: 19.2, text: 'A blocking failure here stops the run — warnings ask you to look first.' },
        ],
        render(t) {
            const checks = [
                { text: 'Read access to all 5 tables', at: 1.4 },
                { text: 'Target reachable and empty', at: 3.0 },
                { text: 'All 9 PII columns have rules', at: 4.6 },
                { text: 'Backup plan recorded', at: 6.2 },
                { text: '1 warning — large orders table', warn: true, at: 7.8 },
                { text: '0 blocking failures', at: 9.4 },
            ];
            const ready = window01(t, 11.2, 12.0);
            return `
                ${panel(230, 160, 820, 356, rose)}
                ${panelTitle(254, 194, 'Readiness assessment · pg-prod-to-staging')}
                ${checks.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.7);
                    const y = 240 + i * 40;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            ${item.warn ? warnIcon(268, y - 6, amber) : check(268, y, emerald, 20)}
                            <text x="296" y="${y}" font-family="${sans}" font-size="17.5" font-weight="600" fill="${item.warn ? amber : textMain}">${escapeXml(item.text)}</text>
                        </g>
                    `;
                }).join('')}
                <g opacity="${ready.toFixed(3)}">
                    <rect x="254" y="470" width="772" height="30" rx="8" fill="${emerald}" opacity="0.18"/>
                    <text x="640" y="491" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${emerald}">READY TO RUN</text>
                </g>
            `;
        },
    },
    {
        id: 'run',
        label: 'Step 9 · Run the job',
        accent: rose,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Step nine: run it. OwlMask streams each table through in batches.' },
            { start: 6.5, end: 12.6, text: 'Reads come from the read-only source; masked rows are written to the target.' },
            { start: 12.9, end: 19.0, text: 'Three million rows later, staging_masked holds a full, safe copy.' },
            { start: 19.3, end: 25.2, text: 'Watch it live — per table, per batch, with row counts as they land.' },
        ],
        render(t) {
            const tables = [
                { name: 'customers', p: easeInOut(window01(t, 2.0, 7.0)) },
                { name: 'orders', p: easeInOut(window01(t, 5.0, 13.0)) },
                { name: 'payments', p: easeInOut(window01(t, 9.0, 16.0)) },
                { name: 'addresses', p: easeInOut(window01(t, 13.0, 18.5)) },
                { name: 'support_notes', p: easeInOut(window01(t, 16.0, 20.5)) },
            ];
            const rows = 3082710 * easeInOut(window01(t, 2.0, 21.0));
            const complete = t > 21.6;
            return `
                ${panel(104, 160, 700, 356, rose)}
                ${panelTitle(128, 194, 'Masking job · run #217')}
                ${tables.map((table, i) => {
                    const y = 244 + i * 50;
                    return `
                        <text x="128" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate400}">${escapeXml(table.name)}</text>
                        ${hbar(340, y - 12, 330, table.p, rose)}
                    `;
                }).join('')}
                ${pill(454, 492, complete ? 'Job complete ✓' : 'Streaming batches…', complete ? emerald : rose)}

                ${statBlock(860, 240, 'Rows masked', fmtInt(rows), rose, 1)}
                ${statBlock(860, 360, 'Tables done', String(tables.filter((x) => x.p >= 1).length) + ' / 5', emerald, window01(t, 4.0, 4.8))}
                ${complete ? pill(966, 470, 'staging_masked ready', emerald) : ''}
            `;
        },
    },
    {
        id: 'verify',
        label: 'Step 10 · Verify',
        accent: teal,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Step ten: open psql against the target and look at what your testers will see.' },
            { start: 6.5, end: 13.0, text: 'Same schema, same shapes — but the people in it don’t exist.' },
            { start: 13.3, end: 19.6, text: 'Joins still work: orders line up with their masked customers.' },
            { start: 19.9, end: 25.2, text: 'This is the copy your team can use without a second thought.' },
        ],
        render(t) {
            const lines = [
                { text: 'staging_masked=> SELECT full_name, email FROM customers LIMIT 3;', at: 1.2 },
                { text: '   K. Moreau   | k.moreau@dalvex.io', at: 5.4, out: true, color: teal },
                { text: '   J. Whitely  | j.whitely@corvex.net', at: 6.0, out: true, color: teal },
                { text: '   A. Ferrand  | a.ferrand@lumeo.org', at: 6.6, out: true, color: teal },
                { text: 'staging_masked=> SELECT count(*) FROM orders o', at: 9.0 },
                { text: '  JOIN customers c ON c.id = o.customer_id;', at: 12.2 },
                { text: '   1204551', at: 15.4, out: true, color: emerald },
                { text: '-- every order still joins ✓', at: 17.2, color: slate500 },
            ];
            return `
                ${terminal(140, 160, 1000, 330, 'psql — staging_masked', lines, t)}
                ${pill(640, 522, 'Realistic to the eye, safe by construction', teal, { alpha: window01(t, 20.4, 21.2) })}
            `;
        },
    },
    {
        id: 'validate',
        label: 'Step 11 · Validate',
        accent: teal,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.6, text: 'Step eleven: don’t trust your eyes — run the validation workflow.' },
            { start: 6.9, end: 13.2, text: 'It re-scans staging_masked with the same discovery engine: zero PII findings.' },
            { start: 13.5, end: 19.2, text: 'The report lands in the evidence pack for your next audit.' },
        ],
        render(t) {
            const sweep = window01(t, 1.4, 9.0) * 6.3;
            const done = sweep >= 6;
            const rows = ['email', 'full_name', 'ssn', 'ip_addr', 'meta', 'phone'];
            return `
                ${shieldIcon(250, 290, teal, 2.2)}
                ${statBlock(380, 250, 'PII findings', done ? '0' : '—', teal, window01(t, 9.4, 10.2))}
                ${pill(310, 440, 'validation-report.pdf → evidence pack', violet, { alpha: window01(t, 14.0, 14.8) })}

                ${panel(690, 160, 486, 356, teal)}
                ${panelTitle(714, 194, 'Validation · staging_masked')}
                ${rows.map((col, i) => {
                    const y = 240 + i * 44;
                    const passed = sweep > i + 0.5;
                    return `
                        <text x="714" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(col)}</text>
                        <text x="880" y="${y}" font-family="${mono}" font-size="15" font-weight="600" fill="${slate400}">${escapeXml(maskValue('sample-99'))}</text>
                        ${passed ? check(1146, y + 2, emerald, 19) : ''}
                    `;
                }).join('')}
                ${pill(933, 494, done ? 'Clean — no PII detected' : 'Scanning…', done ? emerald : teal)}
            `;
        },
    },
    {
        id: 'recap',
        label: 'Recap',
        accent: sky,
        duration: 12,
        captions: [
            { start: 0.6, end: 6.0, text: 'That’s the whole flow: connect, classify, mask, verify — with guardrails at every step.' },
            { start: 6.3, end: 11.4, text: 'Next refresh, the saved profile does steps five through eleven for you.' },
        ],
        render(t) {
            const steps = ['Connect', 'Scan', 'Discover', 'Review', 'Profile', 'FKs', 'Constraints', 'Readiness', 'Run', 'Verify', 'Validate'];
            return `
                <text x="640" y="230" text-anchor="middle" font-family="${sans}" font-size="40" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 1.0).toFixed(3)}">Eleven steps, one profile</text>
                ${steps.map((step, i) => {
                    const alpha = window01(t, 1.0 + i * 0.5, 1.5 + i * 0.5);
                    const x = 116 + (i % 6) * 176;
                    const y = 300 + Math.floor(i / 6) * 78;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="${y}" width="160" height="58" rx="9" fill="#0f172a" stroke="${sky}" stroke-width="1.75"/>
                            <text x="${x + 16}" y="${y + 26}" font-family="${sans}" font-size="12" font-weight="800" fill="${sky}">${String(i + 1).padStart(2, '0')}</text>
                            <text x="${x + 16}" y="${y + 46}" font-family="${sans}" font-size="15" font-weight="700" fill="${textMain}">${escapeXml(step)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'outro',
        label: 'OwlMask',
        accent: sky,
        duration: 8,
        captions: [
            { start: 0.5, end: 7.3, text: 'OwlMask for PostgreSQL — realistic test data without the real people.' },
        ],
        render(t) {
            const inP = easeInOut(window01(t, 0.2, 1.1));
            return `
                <g opacity="${inP.toFixed(3)}">
                    ${dbIcon(640, 240, sky, 2.0)}
                    <text x="640" y="356" text-anchor="middle" font-family="${sans}" font-size="56" font-weight="900" fill="#ffffff">PostgreSQL, masked.</text>
                    <text x="640" y="404" text-anchor="middle" font-family="${sans}" font-size="22" font-weight="500" fill="#cbd5e1">OwlMask inside OwlTable — also for MySQL and SQL Server.</text>
                </g>
                <text x="640" y="470" text-anchor="middle" font-family="${mono}" font-size="17" font-weight="600" fill="${sky}" opacity="${window01(t, 2.2, 3.0).toFixed(3)}">www.owltable.net</text>
            `;
        },
    },
];

await runVideo({
    slug: 'postgresql-masking-tutorial',
    scenes,
    poster: { sceneId: 'verify', t: 19 },
    chordPeriod: 48,
    crf: 23,
});
