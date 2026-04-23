export function slugify(text) {
  let result = "";
  text = text.toLowerCase();

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    
    if ( (char >= "a" && char <= "z") || (char >= "0" && char <= "9")) {
      result += char;
    }else if (char === " ") {
      result += "-";
    }
  }

  return result;
}
export function truncate(text, max) {
  if (text.length <= max) return text;

  let cut = text.slice(0, max);
  let lastSpace = cut.lastIndexOf(" ");

  return cut.slice(0, lastSpace) + "...";
}
export function countWords(text) {
  text = text.trim();
    if (text === "") {
        return 0;
    }
    
    let count = 1;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === " " && text[i + 1] !== " ") {
      count++;
    }
  }

  return count;
}
export function escapeHTML(text) {
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char === "&") result += "&amp;";
    else if (char === "<") result += "&lt;";
    else if (char === ">") result += "&gt;";
    else if (char === '"') result += "&quot;";
    else if (char === "'") result += "&#39;";
    else result += char;
  }

  return result;
}