import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import * as googleTTS from 'google-tts-api';

// Shared engine for the long-form marketing videos. A video is a list of
// scenes; each scene renders its stage content for a local time t (seconds)
// and declares narration captions on its own timeline. The engine draws the
// chrome (brand header, chapter chip, caption band, chaptered progress bar),
// renders frames with sharp, and encodes with ffmpeg.

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..', '..');
const outputDir = join(rootDir, 'public', 'videos');
const frameRoot = process.env.FRAME_DIR || join(tmpdir(), 'owlmask-explainer-frames');

let ffmpegStatic = null;
try {
    ffmpegStatic = require('ffmpeg-static');
} catch {
    // Fall through to PATH lookup.
}
const ffmpeg = process.env.FFMPEG_PATH || ffmpegStatic || 'ffmpeg';

export const width = 1280;
export const height = 720;
export const fps = 24;

export const sans = 'Noto Sans, Arial, sans-serif';
export const mono = 'DejaVu Sans Mono, Menlo, monospace';

export const cyan = '#22d3ee';
export const sky = '#38bdf8';
export const teal = '#2dd4bf';
export const emerald = '#34d399';
export const rose = '#fb7185';
export const violet = '#a78bfa';
export const amber = '#fbbf24';
export const slate400 = '#94a3b8';
export const slate500 = '#64748b';
export const textMain = '#e2e8f0';

export function escapeXml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export function maskValue(raw) {
    return raw.replace(/[A-Za-z0-9]/g, '•');
}

export function clamp01(value) {
    return Math.min(1, Math.max(0, value));
}

export function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Progress 0..1 for a [start, end] window in local scene seconds.
export function window01(t, start, end) {
    return clamp01((t - start) / (end - start));
}

export function type(text, p) {
    return text.slice(0, Math.round(text.length * clamp01(p)));
}

export function fmtInt(value) {
    return Math.round(value).toLocaleString('en-US');
}

export function mmss(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function textLines(text, maxLineLength) {
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

// Centered pill with uppercase label. Width is estimated from label length.
export function pill(cx, cy, label, color, { size = 14, tracking = 2, alpha = 1, bgOpacity = 0.16 } = {}) {
    const w = label.length * (size * 0.72) + 40;
    const h = size + 18;
    return `
        <g opacity="${alpha.toFixed(3)}">
            <rect x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="${h / 2}" fill="${color}" opacity="${bgOpacity}"/>
            <rect x="${(cx - w / 2).toFixed(1)}" y="${(cy - h / 2).toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="${h / 2}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.55"/>
            <text x="${cx}" y="${cy + size * 0.36}" text-anchor="middle" font-family="${sans}" font-size="${size}" font-weight="800" letter-spacing="${tracking}" fill="${color}">${escapeXml(label.toUpperCase())}</text>
        </g>
    `;
}

export function check(x, y, color, size = 22) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${sans}" font-size="${size}" font-weight="900" fill="${color}">✓</text>`;
}

export function cross(x, y, color, size = 20) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-family="${sans}" font-size="${size}" font-weight="900" fill="${color}">✕</text>`;
}

// Drawn warning triangle (avoids relying on the ⚠ glyph).
export function warnIcon(cx, cy, color) {
    return `
        <path d="M ${cx} ${cy - 11} L ${cx + 11} ${cy + 8} L ${cx - 11} ${cy + 8} Z" fill="${color}" opacity="0.22" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
        <text x="${cx}" y="${cy + 6}" text-anchor="middle" font-family="${sans}" font-size="13" font-weight="900" fill="${color}">!</text>
    `;
}

export function lockIcon(x, y, color) {
    return `
        <rect x="${x}" y="${y}" width="16" height="20" rx="3.5" fill="none" stroke="${color}" stroke-width="2.5"/>
        <rect x="${x + 3.5}" y="${y - 4}" width="9" height="8" rx="4.5" fill="none" stroke="${color}" stroke-width="2"/>
    `;
}

export function dbIcon(cx, cy, color, scale = 1) {
    const rx = 20 * scale;
    const ry = 7 * scale;
    const h = 30 * scale;
    return `
        <path d="M ${cx - rx} ${cy - h / 2} v ${h} a ${rx} ${ry} 0 0 0 ${rx * 2} 0 v -${h}" fill="none" stroke="${color}" stroke-width="2.5"/>
        <ellipse cx="${cx}" cy="${cy - h / 2}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="2.5"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.55"/>
    `;
}

export function shieldIcon(cx, cy, color, scale = 1) {
    return `
        <g transform="translate(${cx} ${cy}) scale(${scale})">
            <path d="M 0 -36 L 30 -25 L 30 2 C 30 22 16 34 0 41 C -16 34 -30 22 -30 2 L -30 -25 Z" fill="${color}" opacity="0.14" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>
            <path d="M -13 1 L -4 11 L 15 -11" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
    `;
}

export function clockIcon(cx, cy, color, r = 14) {
    return `
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="2.5"/>
        <path d="M ${cx} ${cy - r * 0.55} L ${cx} ${cy} L ${cx + r * 0.45} ${cy + r * 0.3}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    `;
}

// Standard dark panel used by most scenes.
export function panel(x, y, w, h, color, { alpha = 1, strokeWidth = 2 } = {}) {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#0f172a" stroke="${color}" stroke-width="${strokeWidth}" opacity="${(0.97 * alpha).toFixed(3)}"/>`;
}

export function panelTitle(x, y, label, w = 428) {
    return `
        <text x="${x}" y="${y}" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${slate500}">${escapeXml(label.toUpperCase())}</text>
        <line x1="${x}" y1="${y + 14}" x2="${x + w}" y2="${y + 14}" stroke="#1e293b" stroke-width="1.5"/>
    `;
}

// Big labelled counter.
export function statBlock(x, y, label, valueText, color, alpha = 1) {
    return `
        <g opacity="${clamp01(alpha).toFixed(3)}">
            <text x="${x}" y="${y}" font-family="${sans}" font-size="15" font-weight="800" letter-spacing="2" fill="${slate400}">${escapeXml(label.toUpperCase())}</text>
            <text x="${x}" y="${y + 48}" font-family="${sans}" font-size="44" font-weight="900" fill="${color}">${escapeXml(valueText)}</text>
        </g>
    `;
}

// Horizontal progress bar with percent readout.
export function hbar(x, y, w, p, color, { track = '#1e293b', showPct = true } = {}) {
    const pct = Math.round(clamp01(p) * 100);
    return `
        <rect x="${x}" y="${y}" width="${w}" height="10" rx="5" fill="${track}"/>
        <rect x="${x}" y="${y}" width="${Math.round(w * clamp01(p))}" height="10" rx="5" fill="${p >= 1 ? emerald : color}"/>
        ${showPct ? `<text x="${x + w + 56}" y="${y + 10}" text-anchor="end" font-family="${mono}" font-size="15" font-weight="700" fill="${p >= 1 ? emerald : slate400}">${pct}%</text>` : ''}
    `;
}

// Terminal window with typewriter lines. Each line: { text, color?, at, out? }.
// Lines type on starting at `at` (local seconds); `out` lines appear instantly
// once reached (command output).
export function terminal(x, y, w, h, title, lines, t) {
    const header = `
        ${panel(x, y, w, h, '#334155', { strokeWidth: 1.5 })}
        <circle cx="${x + 24}" cy="${y + 22}" r="5" fill="${rose}" opacity="0.8"/>
        <circle cx="${x + 44}" cy="${y + 22}" r="5" fill="${amber}" opacity="0.8"/>
        <circle cx="${x + 64}" cy="${y + 22}" r="5" fill="${emerald}" opacity="0.8"/>
        <text x="${x + w / 2}" y="${y + 27}" text-anchor="middle" font-family="${mono}" font-size="13" font-weight="600" fill="${slate500}">${escapeXml(title)}</text>
        <line x1="${x}" y1="${y + 40}" x2="${x + w}" y2="${y + 40}" stroke="#1e293b" stroke-width="1.5"/>
    `;
    const body = lines.map((line, i) => {
        const lineY = y + 70 + i * 28;
        if (lineY > y + h - 14) {
            return '';
        }
        const p = line.out ? (t >= line.at ? 1 : 0) : window01(t, line.at, line.at + Math.max(0.6, line.text.length / 26));
        if (p <= 0) {
            return '';
        }
        const shown = line.out ? line.text : type(line.text, p);
        const caret = !line.out && p < 1 && Math.floor(t * 6) % 2 === 0 ? '▌' : '';
        return `<text x="${x + 24}" y="${lineY}" font-family="${mono}" font-size="15.5" font-weight="600" fill="${line.color || textMain}">${escapeXml(shown)}${caret ? `<tspan fill="${cyan}">${caret}</tspan>` : ''}</text>`;
    }).join('');
    return header + body;
}

function captionLayer(scene, t) {
    const active = scene.captions.find((caption) => t >= caption.start && t <= caption.end);
    if (!active) {
        return '';
    }
    const alpha = Math.min(1, (t - active.start) / 0.35, (active.end - t) / 0.35);
    const lines = textLines(active.text, 64);
    const lineHeight = 30;
    const firstY = lines.length === 2 ? 586 : 601;
    return `
        <g opacity="${clamp01(alpha).toFixed(3)}">
            <rect x="88" y="556" width="1104" height="72" rx="10" fill="#0b1120" opacity="0.92"/>
            <rect x="88" y="556" width="1104" height="72" rx="10" fill="none" stroke="#1e293b" stroke-width="1.5"/>
            ${lines.map((line, i) => `<text x="640" y="${firstY + i * lineHeight}" text-anchor="middle" font-family="${sans}" font-size="24" font-weight="600" fill="${textMain}">${escapeXml(line)}</text>`).join('')}
        </g>
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

// Build and run a video (or probe frames with --probe). Config:
//   slug            output basename in public/videos
//   scenes          scene list ({ id, label, accent, duration, captions, render })
//   poster          { sceneId, t } — frame used for the .jpg poster
//   brandTspan      SVG snippet after "OwlTable " in the header
//   chordPeriod     seconds per ambient chord crossfade
//   crf             x264 quality (higher = smaller)
export async function runVideo({ slug, scenes, poster, brandTspan = `<tspan fill="${cyan}">OwlMask</tspan>`, chordPeriod = 44, crf = 21 }) {
    const durationSeconds = scenes.reduce((sum, scene) => sum + scene.duration, 0);
    const totalFrames = durationSeconds * fps;
    const boundaries = [];
    {
        let acc = 0;
        for (const scene of scenes) {
            scene.start = acc;
            acc += scene.duration;
            boundaries.push(acc);
        }
    }

    function sceneAt(globalT) {
        for (const scene of scenes) {
            if (globalT < scene.start + scene.duration) {
                return scene;
            }
        }
        return scenes[scenes.length - 1];
    }

    function frameSvg(frame) {
        const globalT = frame / fps;
        const scene = sceneAt(globalT);
        const t = globalT - scene.start;
        const fade = clamp01(Math.min(t / 0.45, (scene.duration - t) / 0.45));
        const globalP = totalFrames > 1 ? frame / (totalFrames - 1) : 1;
        const progressWidth = Math.round(1072 * globalP);
        const chapterW = scene.label.length * 10.5 + 44;

        return `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#070b14"/>
                <rect x="64" y="40" width="1152" height="640" rx="20" fill="#111827"/>
                <rect x="64" y="40" width="1152" height="640" rx="20" fill="${scene.accent}" opacity="0.05"/>
                <rect x="64" y="40" width="1152" height="640" rx="20" fill="none" stroke="${scene.accent}" stroke-width="3" opacity="0.35"/>

                <text x="104" y="98" font-family="${sans}" font-size="28" font-weight="800" fill="${textMain}">OwlTable ${brandTspan}</text>
                <rect x="${1176 - chapterW}" y="70" width="${chapterW}" height="34" rx="17" fill="${scene.accent}" opacity="0.16"/>
                <text x="${1176 - chapterW / 2}" y="93" text-anchor="middle" font-family="${sans}" font-size="14" font-weight="800" letter-spacing="2" fill="${scene.accent}">${escapeXml(scene.label.toUpperCase())}</text>
                <line x1="104" y1="122" x2="1176" y2="122" stroke="#1e293b" stroke-width="1.5"/>

                <g opacity="${fade.toFixed(3)}">
                    ${scene.render(t)}
                </g>

                ${captionLayer(scene, t)}

                <rect x="104" y="648" width="1072" height="6" rx="3" fill="#334155"/>
                <rect x="104" y="648" width="${progressWidth}" height="6" rx="3" fill="${scene.accent}"/>
                ${boundaries.slice(0, -1).map((b) => `<line x1="${(104 + 1072 * (b / durationSeconds)).toFixed(1)}" y1="645" x2="${(104 + 1072 * (b / durationSeconds)).toFixed(1)}" y2="659" stroke="#475569" stroke-width="2"/>`).join('')}
                <circle cx="${104 + progressWidth}" cy="651" r="9" fill="${scene.accent}"/>
                <text x="1176" y="674" text-anchor="end" font-family="${mono}" font-size="13" font-weight="600" fill="${slate500}">${mmss(globalT)} / ${mmss(durationSeconds)}</text>
            </svg>
        `;
    }

    const posterScene = scenes.find((scene) => scene.id === poster.sceneId);
    const posterFrame = Math.round((posterScene.start + poster.t) * fps);

    if (process.argv.includes('--probe')) {
        const probeDir = join(frameRoot, 'probe', slug);
        rmSync(probeDir, { recursive: true, force: true });
        mkdirSync(probeDir, { recursive: true });

        for (const scene of scenes) {
            for (const [tag, p] of [['a', 0.3], ['b', 0.65], ['c', 0.92]]) {
                const frame = Math.min(totalFrames - 1, Math.round((scene.start + scene.duration * p) * fps));
                const file = join(probeDir, `${scene.id}-${tag}.jpg`);
                await sharp(Buffer.from(frameSvg(frame))).jpeg({ quality: 90 }).toFile(file);
            }
        }
        console.log(`Probe frames written to ${probeDir}`);
        return;
    }

    const frameDir = join(frameRoot, slug);
    const mp4Path = join(outputDir, `${slug}.mp4`);
    const posterPath = join(outputDir, `${slug}.jpg`);

    mkdirSync(outputDir, { recursive: true });
    rmSync(frameDir, { recursive: true, force: true });
    mkdirSync(frameDir, { recursive: true });

    console.log(`[${slug}] rendering ${totalFrames} frames (${mmss(durationSeconds)}) ...`);
    for (let frame = 0; frame < totalFrames; frame += 1) {
        const framePath = join(frameDir, `frame-${String(frame).padStart(5, '0')}.jpg`);
        await sharp(Buffer.from(frameSvg(frame))).jpeg({ quality: 88 }).toFile(framePath);

        if (frame === posterFrame) {
            await sharp(Buffer.from(frameSvg(frame))).jpeg({ quality: 90 }).toFile(posterPath);
        }
        if (frame % 480 === 0) {
            console.log(`[${slug}]   frame ${frame}/${totalFrames} (${mmss(frame / fps)})`);
        }
    }

    // Extract all captions with their global start times.
    const allCaptions = [];
    let currentSceneStart = 0;
    for (const scene of scenes) {
        if (scene.captions) {
            for (const cap of scene.captions) {
                if (cap.text && cap.text.trim()) {
                    allCaptions.push({
                        text: cap.text.trim(),
                        globalStart: currentSceneStart + cap.start,
                        globalEnd: currentSceneStart + cap.end,
                    });
                }
            }
        }
        currentSceneStart += scene.duration;
    }

    // Ambient bed: low D drone with two chord colors slowly crossfading so the
    // pad evolves over the full runtime without clicks.
    const audioExpr = [
        '0.12*sin(2*PI*73.42*t)',
        '0.10*sin(2*PI*146.83*t)',
        `(0.5+0.5*cos(2*PI*t/${chordPeriod}))*(0.075*sin(2*PI*220.00*t)+0.06*sin(2*PI*293.66*t)+0.045*sin(2*PI*369.99*t))`,
        `(0.5-0.5*cos(2*PI*t/${chordPeriod}))*(0.07*sin(2*PI*196.00*t)+0.055*sin(2*PI*246.94*t)+0.04*sin(2*PI*392.00*t))`,
    ].join('+');

    if (allCaptions.length === 0) {
        const audioFilter = [
            'tremolo=f=0.15:d=0.4',
            'aecho=0.8:0.85:90:0.22',
            'lowpass=f=2200',
            'afade=t=in:st=0:d=1.6',
            `afade=t=out:st=${durationSeconds - 2.2}:d=2.2`,
            'volume=1.25',
            'alimiter=limit=0.9',
        ].join(',');

        run([
            '-y',
            '-framerate', String(fps),
            '-i', join(frameDir, 'frame-%05d.jpg'),
            '-f', 'lavfi',
            '-i', `aevalsrc=${audioExpr}:s=44100:d=${durationSeconds}`,
            '-c:v', 'libx264',
            '-crf', String(crf),
            '-preset', 'medium',
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            '-af', audioFilter,
            '-c:a', 'aac',
            '-b:a', '128k',
            '-shortest',
            mp4Path,
        ], `Generating ${mp4Path}`);
    } else {
        const ttsDir = join(frameDir, 'tts');
        mkdirSync(ttsDir, { recursive: true });

        console.log(`[${slug}] downloading ${allCaptions.length} TTS captions...`);
        const fetchWithRetry = async (url, retries = 3) => {
            for (let attempt = 1; attempt <= retries; attempt++) {
                try {
                    const res = await fetch(url);
                    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                    return res;
                } catch (err) {
                    if (attempt === retries) throw err;
                    console.warn(`TTS download attempt ${attempt} failed, retrying...`);
                    await new Promise(resolve => setTimeout(resolve, 500 * attempt));
                }
            }
        };

        await Promise.all(
            allCaptions.map(async (cap, i) => {
                const url = googleTTS.getAudioUrl(cap.text, {
                    lang: 'en',
                    slow: false,
                    host: 'https://translate.google.com',
                });
                const res = await fetchWithRetry(url);
                const buffer = await res.arrayBuffer();
                const filePath = join(ttsDir, `caption-${i}.mp3`);
                writeFileSync(filePath, Buffer.from(buffer));
                cap.filePath = filePath;
            })
        );

        const inputArgs = [
            '-y',
            '-framerate', String(fps),
            '-i', join(frameDir, 'frame-%05d.jpg'),
            '-f', 'lavfi',
            '-i', `aevalsrc=${audioExpr}:s=44100:d=${durationSeconds}`,
        ];

        for (const cap of allCaptions) {
            inputArgs.push('-i', cap.filePath);
        }

        const filterComplex = [
            `[1:a]tremolo=f=0.15:d=0.4,aecho=0.8:0.85:90:0.22,lowpass=f=2200,afade=t=in:st=0:d=1.6,afade=t=out:st=${durationSeconds - 2.2}:d=2.2,volume=0.06[bg]`,
            ...allCaptions.map((cap, i) => {
                const delayMs = Math.round(cap.globalStart * 1000);
                return `[${i + 2}:a]adelay=${delayMs}|${delayMs}[a${i}]`;
            }),
            `[bg]${allCaptions.map((_, i) => `[a${i}]`).join('')}amix=inputs=${allCaptions.length + 1}:normalize=0,volume=1.5,alimiter=limit=0.9[mixa]`,
        ].join('; ');

        run([
            ...inputArgs,
            '-filter_complex', filterComplex,
            '-map', '0:v',
            '-map', '[mixa]',
            '-c:v', 'libx264',
            '-crf', String(crf),
            '-preset', 'medium',
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-shortest',
            mp4Path,
        ], `Generating ${mp4Path}`);
    }

    // Frames are large; drop them as soon as the encode is done.
    rmSync(frameDir, { recursive: true, force: true });
    console.log(`[${slug}] done: ${mp4Path} (${mmss(durationSeconds)}), poster ${posterPath}`);
}
