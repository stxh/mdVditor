// import i18next from "/dist/js/i18next/i18next.min.js";
// import i18nextBrowserLanguageDetector from "/dist/js/i18next/i18next-browser-languagedetector.min.js";

async function fetchJson(url, defaultValue = null) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return defaultValue;
  }
}

async function loadResouse() {
  const translationEN = await fetchJson("./js/locales/en.json");
  const translationZH = await fetchJson("./js/locales/zh.json");
  const resources = {
    en: {
      translation: translationEN,
    },
    "zh-CN": {
      translation: translationZH,
    },
  };
  return resources;
}
