export const rohsMapping: Record<string, string> = {
  // Mock SKUs
  'SPORE-L2-ORD': '/files/rohs/SPORE-L2-ORD.pdf',
  'SPORE-ORD': '/files/rohs/SPORE-ORD.pdf',
  'EDEL-EX-2': '/files/rohs/EDEL-EX-2.pdf',
  'MASK-BLK': '/files/rohs/MASK-BLK.pdf',
  'MASK-ORG': '/files/rohs/MASK-ORG.pdf',
  'SHIELD-GLV': '/files/rohs/SHIELD-GLV.pdf',

  // Supabase CSV SKUs
  'SP028-1': '/files/rohs/SPORE-ORD.pdf',
  'SP022-4': '/files/rohs/SPORE-L2-ORD.pdf',
  'SP022-5': '/files/rohs/SPORE-L2-ORD.pdf',
  'SP025-1': '/files/rohs/MASK-BLK.pdf',
  'SP015-1': '/files/rohs/MASK-ORG.pdf',
  'SP015-2': '/files/rohs/EDEL-EX-2.pdf',
  'SP015-3': '/files/rohs/EDEL-EX-2.pdf',

  // Name fallbacks
  'spore ordinary': '/files/rohs/SPORE-ORD.pdf',
  'spore lite ii clean': '/files/rohs/SPORE-L2-ORD.pdf',
  'spore lite ii chlorinated': '/files/rohs/SPORE-L2-ORD.pdf',
  'mask orange': '/files/rohs/MASK-ORG.pdf',
  'mask black': '/files/rohs/MASK-BLK.pdf',
  'edel ex': '/files/rohs/EDEL-EX-2.pdf',
  'edel ii': '/files/rohs/EDEL-EX-2.pdf',
  'shield': '/files/rohs/SHIELD-GLV.pdf',
};

export const getRohsFileBySku = (sku?: string | null, name?: string | null): string | null => {
  if (sku && rohsMapping[sku]) return rohsMapping[sku];
  if (sku && rohsMapping[sku.toUpperCase()]) return rohsMapping[sku.toUpperCase()];
  if (name && rohsMapping[name.toLowerCase().trim()]) return rohsMapping[name.toLowerCase().trim()];
  return null;
};
