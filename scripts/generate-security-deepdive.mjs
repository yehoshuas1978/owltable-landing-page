import {
    sans, mono,
    cyan, sky, teal, emerald, rose, violet, amber, slate400, slate500, textMain,
    escapeXml, maskValue, clamp01, easeInOut, window01, type, fmtInt,
    pill, check, cross, warnIcon, lockIcon, dbIcon, shieldIcon,
    panel, panelTitle, statBlock, hbar,
    runVideo,
} from './lib/video-engine.mjs';

// "How data masking protects your business" — security deep-dive (~5:00).

const scenes = [
    {
        id: 'hook',
        label: 'Security',
        accent: rose,
        duration: 14,
        captions: [
            { start: 0.8, end: 6.2, text: 'Most teams copy production data into dev, test, and staging to get realistic tests.' },
            { start: 6.5, end: 13.4, text: 'That realism has a price: every copy is a second attack surface with none of production’s defenses.' },
        ],
        render(t) {
            const titleP = window01(t, 0.4, 2.0);
            const caretOn = titleP < 1 && Math.floor(t * 6) % 2 === 0;
            const shown = type('Why data masking matters', titleP);
            const subAlpha = window01(t, 2.4, 3.2);
            const pulse = 0.5 + Math.sin(t * Math.PI * 1.6) * 0.5;
            return `
                <text x="104" y="240" font-family="${sans}" font-size="50" font-weight="900" fill="#ffffff">${escapeXml(shown)}${caretOn ? `<tspan fill="${rose}">|</tspan>` : ''}</text>
                <text x="104" y="292" font-family="${sans}" font-size="25" font-weight="500" fill="#cbd5e1" opacity="${subAlpha.toFixed(3)}">A security deep-dive into protecting non-production data.</text>
                <g opacity="${window01(t, 3.4, 4.2).toFixed(3)}">
                    ${shieldIcon(960, 300, rose, 2.4)}
                    <circle cx="960" cy="300" r="${96 + Math.round(pulse * 10)}" fill="${rose}" opacity="${(0.05 + pulse * 0.05).toFixed(3)}"/>
                </g>
                ${pill(340, 400, 'Production-grade data, test-grade security', amber, { alpha: window01(t, 5.2, 6.0) })}
            `;
        },
    },
    {
        id: 'exposure',
        label: 'The exposure map',
        accent: rose,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'One production database quietly becomes five or more copies across your delivery pipeline.' },
            { start: 6.7, end: 12.8, text: 'Each copy has weaker access control, weaker monitoring, and more people with credentials.' },
            { start: 13.1, end: 19.4, text: 'Attackers know this — non-production systems are a classic path to real customer data.' },
        ],
        render(t) {
            const targets = ['Dev laptops', 'CI pipelines', 'Test env', 'Staging', 'Analytics'];
            const linesP = targets.map((_, i) => easeInOut(window01(t, 1.2 + i * 1.1, 2.4 + i * 1.1)));
            return `
                ${panel(120, 220, 260, 130, rose)}
                ${dbIcon(190, 285, rose, 1.3)}
                <text x="248" y="278" font-family="${sans}" font-size="21" font-weight="800" fill="#ffffff">Production</text>
                <text x="248" y="306" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">hardened, audited</text>

                ${targets.map((name, i) => {
                    const y = 172 + i * 76;
                    const p = linesP[i];
                    const lit = p >= 1;
                    return `
                        <path d="M 380 285 C 560 285 560 ${y + 26} 740 ${y + 26}" fill="none" stroke="${rose}" stroke-width="2.5" opacity="${(p * 0.55).toFixed(3)}" stroke-dasharray="8 7" stroke-dashoffset="-${(t * 30).toFixed(1)}"/>
                        <g opacity="${p.toFixed(3)}">
                            <rect x="740" y="${y}" width="300" height="52" rx="10" fill="#0f172a" stroke="${lit ? rose : '#334155'}" stroke-width="1.75"/>
                            ${lockIcon(764, y + 16, '#475569')}
                            <text x="796" y="${y + 33}" font-family="${sans}" font-size="18" font-weight="600" fill="${textMain}">${escapeXml(name)}</text>
                            <text x="1022" y="${y + 33}" text-anchor="end" font-family="${sans}" font-size="13" font-weight="800" letter-spacing="1" fill="${rose}">RAW PII</text>
                        </g>
                    `;
                }).join('')}
                ${pill(250, 420, '1 source, 5+ exposed copies', rose, { alpha: window01(t, 8.0, 8.8) })}
            `;
        },
    },
    {
        id: 'leak',
        label: 'What leaks',
        accent: rose,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.2, text: 'When a test database leaks, it leaks real people: names, emails, IDs, cards, addresses.' },
            { start: 6.5, end: 12.6, text: 'Regulators and customers don’t care that the breached copy was “only staging”.' },
            { start: 12.9, end: 21.4, text: 'The fines, disclosure duties, and reputational damage are the same as a production breach.' },
        ],
        render(t) {
            const rows = [
                { col: 'full_name', raw: 'Sarah T. Chen' },
                { col: 'email', raw: 'sarah.chen@acme.io' },
                { col: 'ssn', raw: '412-55-0198' },
                { col: 'card', raw: '4716 2290 5514 8391' },
                { col: 'address', raw: '19 Harbor Lane, Austin' },
                { col: 'phone', raw: '+1 415 555 0142' },
            ];
            const reveal = window01(t, 1.0, 9.0) * rows.length;
            const pulse = 0.5 + Math.sin(t * Math.PI * 1.4) * 0.5;
            return `
                <text x="104" y="216" font-family="${sans}" font-size="38" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">A breach of test data</text>
                <text x="104" y="250" font-family="${sans}" font-size="38" font-weight="900" fill="${rose}" opacity="${window01(t, 0.5, 1.2).toFixed(3)}">is a breach of people</text>
                ${statBlock(104, 320, 'Records in a typical staging copy', fmtInt(2400000 * easeInOut(window01(t, 2.0, 8.0))), rose, window01(t, 1.8, 2.6))}
                ${pill(238, 430, 'Same fines as production', amber, { alpha: window01(t, 13.4, 14.2) })}
                ${pill(238, 478, 'Same disclosure duties', amber, { alpha: window01(t, 15.0, 15.8) })}

                ${panel(640, 160, 536, 356, rose)}
                <text x="664" y="192" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">LEAKED STAGING DUMP</text>
                <circle cx="1108" cy="187" r="6" fill="${rose}" opacity="${(0.4 + pulse * 0.6).toFixed(3)}"/>
                <text x="1152" y="192" text-anchor="end" font-family="${sans}" font-size="13" font-weight="800" fill="#fda4af">LIVE</text>
                <line x1="664" y1="206" x2="1152" y2="206" stroke="#1e293b" stroke-width="1.5"/>
                ${rows.map((row, i) => {
                    const y = 240 + i * 46;
                    const on = reveal > i;
                    return `
                        <g opacity="${on ? 1 : 0.12}">
                            ${lockIcon(664, y - 16, rose)}
                            <text x="696" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="880" y="${y}" font-family="${mono}" font-size="17" font-weight="600" fill="#fda4af">${escapeXml(row.raw)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'compliance',
        label: 'Compliance',
        accent: amber,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.4, text: 'Privacy law treats personal data the same wherever it lives — production or not.' },
            { start: 6.7, end: 13.2, text: 'GDPR data minimisation, HIPAA safeguards, PCI scope, SOC 2 controls: all reach your test environments.' },
            { start: 13.5, end: 21.4, text: 'Masking shrinks the problem: environments with no real PII drop out of most of this scope.' },
        ],
        render(t) {
            const cards = [
                { name: 'GDPR', line1: 'Data minimisation:', line2: 'don’t spread personal data', color: sky },
                { name: 'HIPAA', line1: 'Safeguards apply to', line2: 'PHI in any environment', color: teal },
                { name: 'PCI DSS', line1: 'Card data expands', line2: 'audit scope everywhere', color: amber },
                { name: 'SOC 2', line1: 'Access controls on', line2: 'all data stores', color: violet },
            ];
            return `
                <text x="104" y="212" font-family="${sans}" font-size="38" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Regulation follows the data</text>
                ${cards.map((card, i) => {
                    const alpha = window01(t, 1.2 + i * 1.4, 2.1 + i * 1.4);
                    const x = 104 + (i % 2) * 548;
                    const y = 250 + Math.floor(i / 2) * 128;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="${y}" width="524" height="104" rx="12" fill="#0f172a" stroke="${card.color}" stroke-width="2"/>
                            <text x="${x + 26}" y="${y + 44}" font-family="${sans}" font-size="24" font-weight="900" fill="${card.color}">${escapeXml(card.name)}</text>
                            <text x="${x + 190}" y="${y + 40}" font-family="${sans}" font-size="16.5" font-weight="600" fill="${textMain}">${escapeXml(card.line1)}</text>
                            <text x="${x + 190}" y="${y + 68}" font-family="${sans}" font-size="16.5" font-weight="600" fill="${slate400}">${escapeXml(card.line2)}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(640, 528, 'No real PII → out of scope for most of it', emerald, { alpha: window01(t, 14.2, 15.0) })}
            `;
        },
    },
    {
        id: 'approaches',
        label: 'Your options',
        accent: cyan,
        duration: 12,
        captions: [
            { start: 0.6, end: 5.8, text: 'So how do you keep tests realistic without keeping the risk?' },
            { start: 6.1, end: 11.4, text: 'Teams typically weigh three approaches.' },
        ],
        render(t) {
            const options = [
                { name: 'Strip the data', color: slate400 },
                { name: 'Generate synthetic', color: violet },
                { name: 'Mask production', color: cyan },
            ];
            return `
                <text x="640" y="250" text-anchor="middle" font-family="${sans}" font-size="44" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.3, 1.1).toFixed(3)}">Three ways to protect test data</text>
                ${options.map((option, i) => {
                    const alpha = window01(t, 1.6 + i * 1.4, 2.4 + i * 1.4);
                    const x = 128 + i * 360;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="320" width="328" height="88" rx="12" fill="#0f172a" stroke="${option.color}" stroke-width="2"/>
                            <text x="${x + 24}" y="358" font-family="${sans}" font-size="19" font-weight="800" fill="${option.color}">0${i + 1}</text>
                            <text x="${x + 62}" y="360" font-family="${sans}" font-size="21" font-weight="700" fill="#ffffff">${escapeXml(option.name)}</text>
                            <text x="${x + 62}" y="388" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">${i === 2 ? 'realistic + safe' : i === 1 ? 'safe, less realistic' : 'safe, breaks tests'}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'comparison',
        label: 'Comparison',
        accent: cyan,
        duration: 26,
        captions: [
            { start: 0.6, end: 6.2, text: 'Stripping or nulling data is safe — and quietly breaks every realistic test you had.' },
            { start: 6.5, end: 12.8, text: 'Fully synthetic data is safe too, but misses the odd shapes and edge cases of real records.' },
            { start: 13.1, end: 19.6, text: 'Masking keeps production’s structure and distributions, with the sensitive values replaced.' },
            { start: 19.9, end: 25.4, text: 'That’s why masking is the default for provisioning realistic test databases.' },
        ],
        render(t) {
            const criteria = ['Realistic structure', 'Real edge cases', 'No PII risk', 'Referential integrity'];
            const columns = [
                { name: 'Strip', color: slate400, marks: ['x', 'x', 'ok', 'x'] },
                { name: 'Synthetic', color: violet, marks: ['ok', 'x', 'ok', 'ok'] },
                { name: 'Masking', color: cyan, marks: ['ok', 'ok', 'ok', 'ok'] },
            ];
            const rowP = criteria.map((_, r) => window01(t, 2.0 + r * 2.6, 2.8 + r * 2.6));
            const winner = window01(t, 20.4, 21.2);
            return `
                ${panel(150, 168, 980, 348, cyan)}
                <text x="190" y="214" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${slate500}">CRITERION</text>
                ${columns.map((col, c) => `
                    <text x="${640 + c * 170}" y="214" text-anchor="middle" font-family="${sans}" font-size="17" font-weight="800" fill="${col.color}">${escapeXml(col.name)}</text>
                `).join('')}
                <line x1="190" y1="232" x2="1090" y2="232" stroke="#1e293b" stroke-width="1.5"/>
                ${criteria.map((criterion, r) => {
                    const y = 274 + r * 58;
                    return `
                        <g opacity="${rowP[r].toFixed(3)}">
                            <text x="190" y="${y}" font-family="${sans}" font-size="18" font-weight="600" fill="${textMain}">${escapeXml(criterion)}</text>
                            ${columns.map((col, c) => col.marks[r] === 'ok'
                                ? check(640 + c * 170, y + 2, c === 2 ? cyan : emerald, 22)
                                : cross(640 + c * 170, y + 1, '#64748b', 19)).join('')}
                        </g>
                    `;
                }).join('')}
                <rect x="962" y="240" width="156" height="256" rx="10" fill="${cyan}" opacity="${(winner * 0.08).toFixed(3)}"/>
                <rect x="962" y="240" width="156" height="256" rx="10" fill="none" stroke="${cyan}" stroke-width="2" opacity="${winner.toFixed(3)}"/>
                ${pill(1040, 150, 'Best of both', cyan, { alpha: winner, size: 12 })}
            `;
        },
    },
    {
        id: 'transforms',
        label: 'How masking works',
        accent: cyan,
        duration: 24,
        captions: [
            { start: 0.6, end: 6.0, text: 'Masking replaces each sensitive value with a safe stand-in of the same shape.' },
            { start: 6.3, end: 12.4, text: 'A masked email is still an email. A masked card still passes format checks.' },
            { start: 12.7, end: 18.6, text: 'The original values never travel to the target — there is nothing to steal.' },
            { start: 18.9, end: 23.4, text: 'Your tests keep behaving like production, minus the liability.' },
        ],
        render(t) {
            const rows = [
                { col: 'email', raw: 'sarah.chen@acme.io', masked: 'k.moreau@dalvex.io', at: 1.6 },
                { col: 'ssn', raw: '412-55-0198', masked: '837-21-4406', at: 5.2 },
                { col: 'card', raw: '4716 2290 5514 8391', masked: '4485 7301 2296 4410', at: 8.8 },
                { col: 'phone', raw: '+1 415 555 0142', masked: '+1 628 555 0177', at: 12.4 },
            ];
            return `
                <text x="104" y="196" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Same shape, zero risk</text>
                ${rows.map((row, i) => {
                    const y = 254 + i * 66;
                    const appear = window01(t, row.at - 0.6, row.at);
                    const flipP = easeInOut(window01(t, row.at, row.at + 1.2));
                    return `
                        <g opacity="${appear.toFixed(3)}">
                            <rect x="104" y="${y - 32}" width="1072" height="52" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
                            <rect x="104" y="${y - 32}" width="1072" height="52" rx="10" fill="${cyan}" opacity="${(flipP * 0.05).toFixed(3)}"/>
                            ${lockIcon(128, y - 22, flipP > 0.5 ? cyan : rose)}
                            <text x="170" y="${y}" font-family="${mono}" font-size="17" font-weight="600" fill="${slate500}">${escapeXml(row.col)}</text>
                            <text x="360" y="${y}" font-family="${mono}" font-size="18" font-weight="600" fill="${slate400}" opacity="${(1 - flipP * 0.68).toFixed(3)}">${escapeXml(row.raw)}</text>
                            <text x="700" y="${y}" font-family="${sans}" font-size="21" font-weight="800" fill="${cyan}" opacity="${flipP.toFixed(3)}">→</text>
                            <text x="744" y="${y}" font-family="${mono}" font-size="18" font-weight="700" fill="${cyan}" opacity="${flipP.toFixed(3)}">${escapeXml(type(row.masked, flipP))}</text>
                        </g>
                    `;
                }).join('')}
                ${pill(640, 528, 'Originals never leave production', emerald, { alpha: window01(t, 13.6, 14.4) })}
            `;
        },
    },
    {
        id: 'determinism',
        label: 'Keeping utility',
        accent: emerald,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.2, text: 'Safe data is useless if it breaks your joins, reports, and reproducible bugs.' },
            { start: 6.5, end: 12.8, text: 'Deterministic masking maps each input to the same output, every run, every table.' },
            { start: 13.1, end: 21.2, text: 'Customer C-10042 becomes C-88317 everywhere — analytics and foreign keys keep working.' },
        ],
        render(t) {
            const flip = easeInOut(window01(t, 6.8, 8.0));
            const key = flip > 0.5 ? 'C-88317' : 'C-10042';
            const keyColor = flip > 0.5 ? emerald : textMain;
            const tables = ['customers', 'orders', 'payments', 'invoices'];
            return `
                <text x="104" y="206" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Consistency preserves utility</text>
                ${tables.map((name, i) => {
                    const x = 104 + (i % 2) * 548;
                    const y = 250 + Math.floor(i / 2) * 120;
                    const alpha = window01(t, 1.4 + i * 0.8, 2.2 + i * 0.8);
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="${y}" width="524" height="96" rx="12" fill="#0f172a" stroke="${flip > 0.5 ? emerald : '#334155'}" stroke-width="2"/>
                            <text x="${x + 24}" y="${y + 38}" font-family="${mono}" font-size="18" font-weight="700" fill="${textMain}">${escapeXml(name)}</text>
                            <text x="${x + 24}" y="${y + 70}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">customer_id  <tspan fill="${keyColor}" font-weight="700">${escapeXml(key)}</tspan></text>
                            ${flip > 0.5 ? check(x + 490, y + 60, emerald, 20) : ''}
                        </g>
                    `;
                }).join('')}
                ${pill(640, 520, 'Same input → same output, across every table', emerald, { alpha: window01(t, 9.0, 9.8) })}
            `;
        },
    },
    {
        id: 'guardrails',
        label: 'Guardrails',
        accent: rose,
        duration: 24,
        captions: [
            { start: 0.6, end: 6.4, text: 'Masking jobs touch a lot of data, so OwlTable refuses to run them blind.' },
            { start: 6.7, end: 13.0, text: 'Every operational job starts with a readiness assessment: permissions, prerequisites, backups, impact.' },
            { start: 13.3, end: 19.2, text: 'Warnings ask for review. Blocking failures stop the run before a single row changes.' },
            { start: 19.5, end: 23.4, text: 'Safety is enforced in the backend — not just suggested in the UI.' },
        ],
        render(t) {
            const checks = [
                { text: 'Permissions verified', ok: true, at: 1.4 },
                { text: 'Prerequisites met', ok: true, at: 3.0 },
                { text: 'Backup available', ok: true, at: 4.6 },
                { text: 'Destructive impact assessed', ok: true, at: 6.2 },
                { text: '2 warnings — review advised', warn: true, at: 7.8 },
                { text: '0 blocking failures', ok: true, at: 9.4 },
            ];
            const readyAlpha = window01(t, 11.0, 11.8);
            const blockAlpha = window01(t, 14.2, 15.0);
            return `
                ${panel(104, 160, 560, 356, rose)}
                ${panelTitle(128, 194, 'Readiness assessment')}
                ${checks.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.7);
                    const y = 236 + i * 40;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            ${item.warn ? warnIcon(142, y - 6, amber) : check(142, y, emerald, 20)}
                            <text x="168" y="${y}" font-family="${sans}" font-size="17.5" font-weight="600" fill="${item.warn ? amber : textMain}">${escapeXml(item.text)}</text>
                        </g>
                    `;
                }).join('')}
                <g opacity="${readyAlpha.toFixed(3)}">
                    <rect x="128" y="470" width="512" height="30" rx="8" fill="${emerald}" opacity="0.18"/>
                    <text x="384" y="491" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${emerald}">READY TO RUN</text>
                </g>

                <g opacity="${blockAlpha.toFixed(3)}">
                    ${panel(720, 220, 456, 236, '#334155')}
                    ${panelTitle(744, 254, 'If a blocker is found')}
                    ${cross(756, 302, rose, 22)}
                    <text x="782" y="302" font-family="${sans}" font-size="17.5" font-weight="600" fill="${textMain}">Missing backup plan</text>
                    <rect x="744" y="330" width="408" height="42" rx="8" fill="${rose}" opacity="0.14"/>
                    <text x="948" y="357" text-anchor="middle" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${rose}">JOB BLOCKED — NOTHING RAN</text>
                    <text x="744" y="412" font-family="${sans}" font-size="15" font-weight="600" fill="${slate400}">Enforced server-side on every</text>
                    <text x="744" y="436" font-family="${sans}" font-size="15" font-weight="600" fill="${slate400}">execution path.</text>
                </g>
            `;
        },
    },
    {
        id: 'access',
        label: 'Least privilege',
        accent: sky,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.2, text: 'The masking platform itself follows least privilege.' },
            { start: 6.5, end: 12.4, text: 'Sources are read by a read-only account; writes go only to the target you chose.' },
            { start: 12.7, end: 17.4, text: 'Role-based access and SSO keep the people side under control too.' },
        ],
        render(t) {
            const items = [
                { icon: 'db', title: 'Read-only source account', sub: 'SELECT-only against production', at: 1.2 },
                { icon: 'lock', title: 'Writes only to the target', sub: 'masked copies, never the source', at: 4.4 },
                { icon: 'shield', title: 'Roles + SSO', sub: 'per-user permissions, central identity', at: 7.6 },
            ];
            return `
                <text x="104" y="206" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">Least privilege by default</text>
                ${items.map((item, i) => {
                    const alpha = window01(t, item.at, item.at + 0.8);
                    const y = 254 + i * 92;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="104" y="${y}" width="1072" height="72" rx="12" fill="#0f172a" stroke="${sky}" stroke-width="1.75"/>
                            ${item.icon === 'db' ? dbIcon(150, y + 36, sky, 0.9) : item.icon === 'lock' ? lockIcon(140, y + 26, sky) : shieldIcon(150, y + 36, sky, 0.62)}
                            <text x="196" y="${y + 32}" font-family="${sans}" font-size="19" font-weight="700" fill="#ffffff">${escapeXml(item.title)}</text>
                            <text x="196" y="${y + 58}" font-family="${sans}" font-size="15" font-weight="600" fill="${slate500}">${escapeXml(item.sub)}</text>
                            ${check(1136, y + 44, sky, 22)}
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'validation',
        label: 'Prove it',
        accent: teal,
        duration: 22,
        captions: [
            { start: 0.6, end: 6.4, text: '“We masked it” is a claim. Security teams need evidence.' },
            { start: 6.7, end: 13.0, text: 'OwlTable re-scans the masked output with the same PII discovery engine that scanned the source.' },
            { start: 13.3, end: 21.2, text: 'The result is a provable statement: zero PII findings in the provisioned database.' },
        ],
        render(t) {
            const rows = ['email', 'full_name', 'ssn', 'card', 'phone', 'address'];
            const sweep = window01(t, 1.4, 10.0) * (rows.length + 0.3);
            const done = sweep >= rows.length;
            return `
                ${shieldIcon(240, 290, teal, 2.2)}
                ${statBlock(370, 250, 'PII findings', done ? '0' : '—', teal, window01(t, 10.4, 11.2))}
                ${pill(300, 440, 'Proven, not assumed', teal, { alpha: window01(t, 13.8, 14.6) })}

                ${panel(680, 160, 496, 356, teal)}
                ${panelTitle(704, 194, 'Re-scan of masked output')}
                ${rows.map((col, i) => {
                    const y = 236 + i * 44;
                    const passed = sweep > i + 0.5;
                    const scanning = Math.floor(sweep) === i && !done;
                    return `
                        ${scanning ? `<rect x="692" y="${y - 20}" width="472" height="34" rx="8" fill="${teal}" opacity="0.12"/>` : ''}
                        <text x="704" y="${y}" font-family="${mono}" font-size="16" font-weight="600" fill="${slate500}">${escapeXml(col)}</text>
                        <text x="880" y="${y}" font-family="${mono}" font-size="15" font-weight="600" fill="${slate400}">${escapeXml(maskValue('sample-value-99'))}</text>
                        ${passed ? check(1136, y + 2, emerald, 19) : ''}
                    `;
                }).join('')}
                ${pill(928, 494, done ? 'Clean — no PII detected' : 'Scanning…', done ? emerald : teal)}
            `;
        },
    },
    {
        id: 'evidence',
        label: 'Audit evidence',
        accent: violet,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.4, text: 'Audits ask the same questions every year. OwlTable packages the answers.' },
            { start: 6.7, end: 13.2, text: 'The compliance evidence pack bundles rule coverage, job history, and validation results.' },
            { start: 13.5, end: 19.4, text: 'Hand your auditor a pack, not a week of screenshots.' },
        ],
        render(t) {
            const files = [
                { name: 'masking-rule-coverage.pdf', at: 2.0 },
                { name: 'pii-discovery-report.pdf', at: 3.4 },
                { name: 'job-run-history.csv', at: 4.8 },
                { name: 'validation-results.pdf', at: 6.2 },
                { name: 'access-control-summary.pdf', at: 7.6 },
            ];
            const zipP = window01(t, 9.6, 11.0);
            return `
                <text x="104" y="206" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">The compliance evidence pack</text>
                ${panel(104, 240, 620, 276, violet)}
                ${files.map((file, i) => {
                    const alpha = window01(t, file.at, file.at + 0.7);
                    const y = 288 + i * 44;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="132" y="${y - 20}" width="18" height="24" rx="3" fill="none" stroke="${violet}" stroke-width="2"/>
                            <line x1="136" y1="${y - 10}" x2="146" y2="${y - 10}" stroke="${violet}" stroke-width="1.5"/>
                            <line x1="136" y1="${y - 4}" x2="146" y2="${y - 4}" stroke="${violet}" stroke-width="1.5"/>
                            <text x="168" y="${y}" font-family="${mono}" font-size="16.5" font-weight="600" fill="${textMain}">${escapeXml(file.name)}</text>
                            ${check(688, y, emerald, 18)}
                        </g>
                    `;
                }).join('')}

                <g opacity="${zipP.toFixed(3)}">
                    <path d="M 724 380 C 780 380 780 380 812 380" fill="none" stroke="${violet}" stroke-width="2.5" stroke-dasharray="7 6"/>
                    ${panel(820, 300, 356, 160, violet)}
                    <text x="998" y="360" text-anchor="middle" font-family="${sans}" font-size="22" font-weight="800" fill="#ffffff">evidence-pack.zip</text>
                    <text x="998" y="394" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="600" fill="${slate500}">generated per job run</text>
                    ${pill(998, 432, 'Auditor-ready', violet, { alpha: window01(t, 12.0, 12.8) })}
                </g>
            `;
        },
    },
    {
        id: 'posture',
        label: 'Risk posture',
        accent: emerald,
        duration: 18,
        captions: [
            { start: 0.6, end: 6.6, text: 'The security outcome is simple to state: real PII lives in production, and nowhere else.' },
            { start: 6.9, end: 12.8, text: 'A leaked laptop or staging box now exposes realistic — but fake — records.' },
            { start: 13.1, end: 17.4, text: 'Your attack surface shrinks back to the systems built to defend it.' },
        ],
        render(t) {
            const beforeAlpha = window01(t, 0.8, 1.6);
            const afterAlpha = window01(t, 4.4, 5.2);
            return `
                <g opacity="${beforeAlpha.toFixed(3)}">
                    ${panel(120, 190, 500, 300, rose)}
                    ${pill(370, 232, 'Before masking', rose)}
                    ${statBlock(160, 300, 'Environments with real PII', '6', rose, 1)}
                    ${statBlock(160, 408, 'Copies outside prod controls', '5', rose, 1)}
                </g>
                <text x="640" y="352" text-anchor="middle" font-family="${sans}" font-size="34" font-weight="900" fill="${slate500}" opacity="${window01(t, 3.4, 4.2).toFixed(3)}">→</text>
                <g opacity="${afterAlpha.toFixed(3)}">
                    ${panel(660, 190, 500, 300, emerald)}
                    ${pill(910, 232, 'After masking', emerald)}
                    ${statBlock(700, 300, 'Environments with real PII', '1', emerald, 1)}
                    ${statBlock(700, 408, 'Copies outside prod controls', '0', emerald, 1)}
                </g>
            `;
        },
    },
    {
        id: 'practices',
        label: 'Checklist',
        accent: cyan,
        duration: 20,
        captions: [
            { start: 0.6, end: 6.2, text: 'If you take one slide to your team, take this checklist.' },
            { start: 6.5, end: 13.0, text: 'Discover before you mask, validate after, and gate every run behind readiness checks.' },
            { start: 13.3, end: 19.2, text: 'Do that on every refresh — not once a year before the audit.' },
        ],
        render(t) {
            const items = [
                'Inventory where production data is copied today',
                'Run PII discovery — don’t trust column names',
                'Mask with deterministic, format-preserving rules',
                'Gate refreshes behind readiness assessments',
                'Validate output and keep the evidence pack',
            ];
            return `
                <text x="104" y="206" font-family="${sans}" font-size="34" font-weight="900" fill="#ffffff" opacity="${window01(t, 0.2, 0.9).toFixed(3)}">The test-data security checklist</text>
                ${items.map((item, i) => {
                    const alpha = window01(t, 1.4 + i * 1.8, 2.2 + i * 1.8);
                    const y = 254 + i * 56;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="104" y="${y - 30}" width="1072" height="46" rx="9" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
                            ${check(132, y, cyan, 20)}
                            <text x="160" y="${y}" font-family="${sans}" font-size="18.5" font-weight="600" fill="${textMain}">${escapeXml(item)}</text>
                        </g>
                    `;
                }).join('')}
            `;
        },
    },
    {
        id: 'outro',
        label: 'OwlTable',
        accent: cyan,
        duration: 16,
        captions: [
            { start: 0.6, end: 7.0, text: 'OwlTable automates all of it: discovery, masking, guardrails, validation, and evidence.' },
            { start: 7.3, end: 14.8, text: 'Keep production data in production — and give every other environment safe, realistic data.' },
        ],
        render(t) {
            const inP = easeInOut(window01(t, 0.2, 1.1));
            const chips = ['Discover', 'Mask', 'Guard', 'Validate', 'Prove'];
            const colors = [cyan, sky, rose, teal, violet];
            return `
                <g opacity="${inP.toFixed(3)}">
                    <text x="640" y="272" text-anchor="middle" font-family="${sans}" font-size="64" font-weight="900" fill="#ffffff">Mask the risk away</text>
                    <text x="640" y="330" text-anchor="middle" font-family="${sans}" font-size="24" font-weight="500" fill="#cbd5e1">Safe, realistic test data with OwlTable + OwlMask.</text>
                </g>
                ${chips.map((chip, i) => {
                    const alpha = window01(t, 1.4 + i * 0.35, 1.9 + i * 0.35);
                    const w = 190;
                    const x = 128 + i * 210;
                    return `
                        <g opacity="${alpha.toFixed(3)}">
                            <rect x="${x}" y="392" width="${w}" height="48" rx="9" fill="#0f172a" stroke="${colors[i]}" stroke-width="1.75"/>
                            ${check(x + 28, 422, colors[i], 17)}
                            <text x="${x + 48}" y="422" font-family="${sans}" font-size="17" font-weight="700" fill="${textMain}">${escapeXml(chip)}</text>
                        </g>
                    `;
                }).join('')}
                <text x="640" y="496" text-anchor="middle" font-family="${mono}" font-size="17" font-weight="600" fill="${cyan}" opacity="${window01(t, 3.6, 4.4).toFixed(3)}">www.owltable.net</text>
            `;
        },
    },
];

await runVideo({
    slug: 'data-masking-security-deepdive',
    scenes,
    poster: { sceneId: 'transforms', t: 15 },
    chordPeriod: 40,
    crf: 23,
});
