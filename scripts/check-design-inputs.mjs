import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const issues = [];
const strict = process.argv.includes('--strict');
const nodeIdPattern = /^\d+:\d+$/;
const assetNodeIdPattern = /^I?\d+:\d+(?:;\d+:\d+)*$/;

function localPath(value, prefix) {
  if (typeof value !== 'string' || !value.startsWith(prefix) || value.includes('\\')) return null;
  const path = resolve(root, value);
  const rel = relative(resolve(root, prefix), path);
  return rel && !rel.startsWith('..') && !isAbsolute(rel) ? path : null;
}

async function nonEmptyFile(path) {
  if (!path) return false;
  try { const info = await stat(path); return info.isFile() && info.size > 0; }
  catch { return false; }
}

try {
  const source = JSON.parse(await readFile(resolve(root, 'design/figma-source.json'), 'utf8'));
  const manifest = JSON.parse(await readFile(resolve(root, 'design/assets.json'), 'utf8'));
  if (source.schemaVersion !== 1 || manifest.schemaVersion !== 1) issues.push('Unsupported manifest version.');
  if (typeof source.fileKey !== 'string' || !source.fileKey || !nodeIdPattern.test(source.nodeId)) issues.push('Figma target is missing or invalid.');
  if (source.status !== 'captured') issues.push('Current high-fidelity Figma context has not been captured.');
  if (typeof source.capturedAt !== 'string' || !Number.isFinite(Date.parse(source.capturedAt))) issues.push('Capture timestamp is missing.');
  if (!(source.frame?.width > 0 && source.frame?.height > 0)) issues.push('Current frame dimensions have not been measured.');
  if (!Array.isArray(source.sections) || !source.sections.length) issues.push('Current section node IDs have not been recorded.');

  const sectionIds = new Set();
  for (const section of Array.isArray(source.sections) ? source.sections : []) {
    if (!nodeIdPattern.test(section.nodeId) || sectionIds.has(section.nodeId)) issues.push('Section node IDs must be valid and unique.');
    sectionIds.add(section.nodeId);
    if (!section.name || section.contextQuality !== 'high-fidelity') issues.push(`Section ${section.nodeId ?? '?'} needs high-fidelity context.`);
    if (!await nonEmptyFile(localPath(section.contextFile, 'design/context/'))) issues.push(`Missing local context for section ${section.nodeId ?? '?'}.`);
  }

  const mobile = JSON.parse(await readFile(resolve(root, 'design/mobile-home.json'), 'utf8'));
  if (mobile.fileKey !== source.fileKey || !nodeIdPattern.test(mobile.nodeId)) issues.push('Mobile target is invalid.');
  if (!Array.isArray(mobile.contexts) || !mobile.contexts.length) issues.push('Mobile section contexts are missing.');
  for (const section of mobile.contexts ?? []) {
    if (!nodeIdPattern.test(section.nodeId) || sectionIds.has(section.nodeId)) issues.push('Mobile section IDs must be valid and unique.');
    sectionIds.add(section.nodeId);
    if (section.quality !== 'high-fidelity' || !await nonEmptyFile(localPath(section.contextFile, 'design/context/'))) issues.push(`Missing high-fidelity mobile context: ${section.nodeId}.`);
  }

  const catalogue = JSON.parse(await readFile(resolve(root, 'design/catalogue.json'), 'utf8'));
  if (catalogue.fileKey !== source.fileKey || !nodeIdPattern.test(catalogue.desktop?.nodeId) || !nodeIdPattern.test(catalogue.mobile?.nodeId)) issues.push('Catalogue targets are invalid.');
  for (const section of catalogue.contexts ?? []) {
    if (!nodeIdPattern.test(section.nodeId) || sectionIds.has(section.nodeId)) issues.push('Catalogue section IDs must be valid and unique.');
    sectionIds.add(section.nodeId);
    if (section.quality !== 'high-fidelity' || !await nonEmptyFile(localPath(section.contextFile, 'design/context/'))) issues.push(`Missing catalogue context: ${section.nodeId}.`);
  }
  if (!catalogue.contexts?.length) issues.push('Catalogue contexts are missing.');
  const infoPages = JSON.parse(await readFile(resolve(root, 'design/info-pages.json'), 'utf8'));
  if (infoPages.fileKey !== source.fileKey || infoPages.contexts?.length !== 6) issues.push('Six informational page contexts are required.');
  for (const section of infoPages.contexts ?? []) {
    if (!nodeIdPattern.test(section.nodeId) || sectionIds.has(section.nodeId)) issues.push('Informational section IDs must be valid and unique.');
    sectionIds.add(section.nodeId);
    if (section.quality !== 'high-fidelity' || !await nonEmptyFile(localPath(section.contextFile, 'design/context/'))) issues.push(`Missing informational context: ${section.nodeId}.`);
  }
  const popups = JSON.parse(await readFile(resolve(root, 'design/popups.json'), 'utf8'));
  if (popups.fileKey !== source.fileKey || popups.contexts?.length !== 6) issues.push('Six popup contexts are required.');
  for (const section of popups.contexts ?? []) {
    if (!nodeIdPattern.test(section.nodeId) || sectionIds.has(section.nodeId)) issues.push('Popup section IDs must be valid and unique.');
    sectionIds.add(section.nodeId);
    if (section.quality !== 'high-fidelity' || !await nonEmptyFile(localPath(section.contextFile, 'design/context/'))) issues.push(`Missing popup context: ${section.nodeId}.`);
  }
  if (manifest.status !== 'imported') issues.push('Original assets have not been imported.');
  if (!Array.isArray(manifest.assets) || !manifest.assets.length) issues.push('Asset manifest is empty.');
  const assetIds = new Set();
  for (const asset of Array.isArray(manifest.assets) ? manifest.assets : []) {
    if (!asset.id || assetIds.has(asset.id)) issues.push('Asset IDs must be present and unique.');
    assetIds.add(asset.id);
    if (!assetNodeIdPattern.test(asset.nodeId)) issues.push(`Asset ${asset.id ?? '?'} has no source node.`);
    if (!['source-image', 'exported-svg', 'exported-raster'].includes(asset.kind)) issues.push(`Asset ${asset.id ?? '?'} has no supported origin kind.`);
    if (!await nonEmptyFile(localPath(asset.localPath, 'public/assets/'))) issues.push(`Missing or empty local asset: ${asset.id ?? '?'}.`);
    if (!Array.isArray(asset.slots) || !asset.slots.length) issues.push(`Asset ${asset.id ?? '?'} has no design slots.`);
    for (const slot of Array.isArray(asset.slots) ? asset.slots : []) {
      if (!assetNodeIdPattern.test(slot.nodeId) || !sectionIds.has(slot.sectionNodeId)) issues.push(`Asset ${asset.id ?? '?'} has an invalid design slot.`);
    }
  }

  const ready = issues.length === 0;
  console.log(JSON.stringify({
    target: { fileKey: source.fileKey, nodeId: source.nodeId },
    readyForImplementation: ready,
    sectionCount: Array.isArray(source.sections) ? source.sections.length : 0,
    mobileSectionCount: mobile.contexts?.length ?? 0,
    assetCount: Array.isArray(manifest.assets) ? manifest.assets.length : 0,
    issues,
    note: 'Checks local input completeness only. Visual, source-content and browser verification remain required.'
  }, null, 2));
  if (strict && !ready) process.exitCode = 1;
} catch (error) {
  console.error(`Cannot read design manifests: ${error.message}`);
  process.exitCode = 1;
}
