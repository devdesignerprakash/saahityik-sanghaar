

const consonantRules = {
  ksh: 'क्ष्', gy: 'ज्ञ्', kh: 'ख्', gh: 'घ्', chh: 'छ्', ch: 'च्',
  jh: 'झ्', th: 'थ्', dh: 'ध्', ph: 'फ्', bh: 'भ्', sh: 'श्', gn: 'ङ्', tr: 'त्र्',
  k: 'क्', g: 'ग्', ng: 'ङ्', c: 'च्', j: 'ज्', t: 'त्', d: 'द्', n: 'न्',
  p: 'प्', b: 'ब्', m: 'म्', y: 'य्', r: 'र्', l: 'ल्', v: 'व्', s: 'स्', h: 'ह्'
};

const vowelRules = {
  aa: 'आ', ai: 'ऐ', au: 'औ', a: 'अ', i: 'इ', ee: 'ई',
  u: 'उ', oo: 'ऊ', e: 'ए', o: 'ओ', ri: 'ऋ'
};

const matraRules = {
  aa: 'ा', ai: 'ै', au: 'ौ', i: 'ि', ee: 'ी',
  u: 'ु', oo: 'ू', e: 'े', o: 'ो', ri: 'ृ'
};

const miscRules = {
  OM: 'ॐ', '.': '।', '|': '।',
  '0': '०', '1': '१', '2': '२', '3': '३',
  '4': '४', '5': '५', '6': '६', '7': '७',
  '8': '८', '9': '९'
};

export function convertRomanToUnicode(input) {
  let output = '';
  let i = 0;
  
  // Create sorted rule keys (longest first for greedy matching)
  const sortedConsonants = Object.keys(consonantRules).sort((a, b) => b.length - a.length);
  const sortedVowels = Object.keys(vowelRules).sort((a, b) => b.length - a.length);
  const sortedMisc = Object.keys(miscRules).sort((a, b) => b.length - a.length);

  while (i < input.length) {
    let matched = false;

    // 1. Check for special characters and numbers
    for (const misc of sortedMisc) {
      if (input.startsWith(misc, i)) {
        output += miscRules[misc];
        i += misc.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 2. Check for standalone vowels
    for (const vowel of sortedVowels) {
      if (input.startsWith(vowel, i)) {
        output += vowelRules[vowel];
        i += vowel.length;
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 3. Check for consonants (with optional vowel)
    for (const consonant of sortedConsonants) {
      if (input.startsWith(consonant, i)) {
        const base = consonantRules[consonant];
        const nextIndex = i + consonant.length;
        let foundVowel = null;

        // Check for following vowel
        for (const vowel of sortedVowels) {
          if (input.startsWith(vowel, nextIndex)) {
            foundVowel = vowel;
            break;
          }
        }

        if (foundVowel) {
          // Handle consonant-vowel combination
          output += base.slice(0, -1); // Remove halant
          if (foundVowel !== 'a') {
            output += matraRules[foundVowel]; // Add vowel matra
          }
          i = nextIndex + foundVowel.length;
        } else {
          // Consonant without vowel
          output += base;
          i = nextIndex;
        }
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 4. No rules matched - add character as-is
    output += input[i];
    i++;
  }

  return output;
}

