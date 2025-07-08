import { preetiToUnicodeMap } from "./preetiToUnicodeMap";

export function convertPreetiToUnicode(text) {
  let output = '';
  let i = 0;

  // Sort keys by length descending to match longer keys like "O{" before "O"
  const keys = Object.keys(preetiToUnicodeMap).sort((a, b) => b.length - a.length);

  while (i < text.length) {
    let matched = false;

    for (const key of keys) {
      if (text.startsWith(key, i)) {
        output += preetiToUnicodeMap[key];
        i += key.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      output += text[i]; // fallback for unmapped chars
      i++;
    }
  }

  return output;
}
