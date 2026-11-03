import { rm } from 'node:fs/promises';
// Never retain routes from an older build in the upload directory.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
