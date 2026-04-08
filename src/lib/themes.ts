export type ThemeFamily = "dracula" | "catppuccin";
export type ThemeMode = "light" | "dark";
export type ColorSchemeName = "default" | "rosewater" | "flamingo" | "pink" | "mauve" | "red" | "maroon" | "peach" | "yellow" | "green" | "teal" | "sky" | "sapphire" | "blue" | "lavender" | "cyan";
export type ThemeName =
  | "dracula-classic"
  | "alucard-classic"
  | "catppuccin-mocha"
  | "catppuccin-macchiato"
  | "catppuccin-frappe"
  | "catppuccin-latte";

export interface ThemePalette {
  id: ThemeName;
  name: string;
  family: ThemeFamily;
  mode: ThemeMode;
  colors: {
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceAlt: string;
    surfaceMuted: string;
    border: string;
    borderStrong: string;
    foreground: string;
    mutedForeground: string;
    accent: string;
    accentAlt: string;
    accentHover: string;
    accentForeground: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    overlay: string;
    shadow: string;
    scrollbar: string;
    scrollbarHover: string;
  };
  projectAccents: string[];
  techTones: Record<string, string>;
}

export const catppuccinColorSchemeOptions: Array<{ id: ColorSchemeName; label: string }> = [
  { id: "default", label: "Default (Mauve)" },
  { id: "rosewater", label: "Rosewater" },
  { id: "flamingo", label: "Flamingo" },
  { id: "pink", label: "Pink" },
  { id: "red", label: "Red" },
  { id: "maroon", label: "Maroon" },
  { id: "peach", label: "Peach" },
  { id: "yellow", label: "Yellow" },
  { id: "green", label: "Green" },
  { id: "teal", label: "Teal" },
  { id: "sky", label: "Sky" },
  { id: "sapphire", label: "Sapphire" },
  { id: "blue", label: "Blue" },
  { id: "lavender", label: "Lavender" },
];

export const draculaColorSchemeOptions: Array<{ id: ColorSchemeName; label: string }> = [
  { id: "default", label: "Default (Purple)" },
  { id: "red", label: "Red" },
  { id: "green", label: "Green" },
  { id: "yellow", label: "Yellow" },
  { id: "pink", label: "Pink" },
  { id: "cyan", label: "Cyan" },
];

const draculaDark: ThemePalette = {
  id: "dracula-classic",
  name: "Dracula",
  family: "dracula",
  mode: "dark",
  colors: {
    background: "#282A36",
    backgroundAlt: "#21222C",
    surface: "#343746",
    surfaceAlt: "#424450",
    surfaceMuted: "#191A21",
    border: "#44475A",
    borderStrong: "#6272A4",
    foreground: "#F8F8F2",
    mutedForeground: "#CBD0E8",
    accent: "#BD93F9",
    accentAlt: "#FF79C6",
    accentHover: "#D6ACFF",
    accentForeground: "#191A21",
    success: "#50FA7B",
    warning: "#FFB86C",
    danger: "#FF5555",
    info: "#8BE9FD",
    overlay: "#44475A",
    shadow: "#191A21",
    scrollbar: "#6272A4",
    scrollbarHover: "#8BE9FD",
  },
  projectAccents: ["#8BE9FD", "#BD93F9", "#50FA7B", "#FF79C6", "#FFB86C"],
  techTones: {
    blue: "#8BE9FD",
    cyan: "#8BE9FD",
    green: "#50FA7B",
    yellow: "#F1FA8C",
    orange: "#FFB86C",
    pink: "#FF79C6",
    purple: "#BD93F9",
    red: "#FF5555",
    neutral: "#6272A4",
  },
};

const draculaLight: ThemePalette = {
  id: "alucard-classic",
  name: "Alucard",
  family: "dracula",
  mode: "light",
  colors: {
    background: "#FFFBEB",
    backgroundAlt: "#EFEDDC",
    surface: "#ECE9DF",
    surfaceAlt: "#DEDCCF",
    surfaceMuted: "#CECCC0",
    border: "#CFCFDE",
    borderStrong: "#6C664B",
    foreground: "#1F1F1F",
    mutedForeground: "#6C664B",
    accent: "#644AC9",
    accentAlt: "#A3144D",
    accentHover: "#7862D0",
    accentForeground: "#FFFBEB",
    success: "#14710A",
    warning: "#A34D14",
    danger: "#CB3A2A",
    info: "#036A96",
    overlay: "#CFCFDE",
    shadow: "#BCBAB3",
    scrollbar: "#6C664B",
    scrollbarHover: "#644AC9",
  },
  projectAccents: ["#036A96", "#644AC9", "#14710A", "#A3144D", "#A34D14"],
  techTones: {
    blue: "#036A96",
    cyan: "#036A96",
    green: "#14710A",
    yellow: "#846E15",
    orange: "#A34D14",
    pink: "#A3144D",
    purple: "#644AC9",
    red: "#CB3A2A",
    neutral: "#6C664B",
  },
};

const catppuccinMocha: ThemePalette = {
  id: "catppuccin-mocha",
  name: "Catppuccin Mocha",
  family: "catppuccin",
  mode: "dark",
  colors: {
    background: "#1E1E2E",
    backgroundAlt: "#181825",
    surface: "#313244",
    surfaceAlt: "#45475A",
    surfaceMuted: "#11111B",
    border: "#585B70",
    borderStrong: "#7F849C",
    foreground: "#CDD6F4",
    mutedForeground: "#A6ADC8",
    accent: "#CBA6F7",
    accentAlt: "#89B4FA",
    accentHover: "#B4BEFE",
    accentForeground: "#11111B",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    overlay: "#45475A",
    shadow: "#11111B",
    scrollbar: "#6C7086",
    scrollbarHover: "#89B4FA",
  },
  projectAccents: ["#89B4FA", "#CBA6F7", "#A6E3A1", "#F5C2E7", "#FAB387"],
  techTones: {
    blue: "#89B4FA",
    cyan: "#89DCEB",
    green: "#A6E3A1",
    yellow: "#F9E2AF",
    orange: "#FAB387",
    pink: "#F5C2E7",
    purple: "#CBA6F7",
    red: "#F38BA8",
    neutral: "#7F849C",
  },
};

const catppuccinMacchiato: ThemePalette = {
  id: "catppuccin-macchiato",
  name: "Catppuccin Macchiato",
  family: "catppuccin",
  mode: "dark",
  colors: {
    background: "#24273A",
    backgroundAlt: "#1E2030",
    surface: "#363A4F",
    surfaceAlt: "#494D64",
    surfaceMuted: "#181926",
    border: "#5B6078",
    borderStrong: "#8087A2",
    foreground: "#CAD3F5",
    mutedForeground: "#B8C0E0",
    accent: "#C6A0F6",
    accentAlt: "#8AADF4",
    accentHover: "#B7BDF8",
    accentForeground: "#181926",
    success: "#A6DA95",
    warning: "#F5A97F",
    danger: "#ED8796",
    info: "#91D7E3",
    overlay: "#6E738D",
    shadow: "#181926",
    scrollbar: "#6E738D",
    scrollbarHover: "#8AADF4",
  },
  projectAccents: ["#8AADF4", "#C6A0F6", "#A6DA95", "#F5BDE6", "#F5A97F"],
  techTones: {
    blue: "#8AADF4",
    cyan: "#91D7E3",
    green: "#A6DA95",
    yellow: "#EED49F",
    orange: "#F5A97F",
    pink: "#F5BDE6",
    purple: "#C6A0F6",
    red: "#ED8796",
    neutral: "#8087A2",
  },
};

const catppuccinFrappe: ThemePalette = {
  id: "catppuccin-frappe",
  name: "Catppuccin Frappe",
  family: "catppuccin",
  mode: "dark",
  colors: {
    background: "#303446",
    backgroundAlt: "#292C3C",
    surface: "#414559",
    surfaceAlt: "#51576D",
    surfaceMuted: "#232634",
    border: "#626880",
    borderStrong: "#838BA7",
    foreground: "#C6D0F5",
    mutedForeground: "#B5BFE2",
    accent: "#CA9EE6",
    accentAlt: "#8CAAEE",
    accentHover: "#BABBF1",
    accentForeground: "#232634",
    success: "#A6D189",
    warning: "#EF9F76",
    danger: "#E78284",
    info: "#99D1DB",
    overlay: "#737994",
    shadow: "#232634",
    scrollbar: "#737994",
    scrollbarHover: "#8CAAEE",
  },
  projectAccents: ["#8CAAEE", "#CA9EE6", "#A6D189", "#F4B8E4", "#EF9F76"],
  techTones: {
    blue: "#8CAAEE",
    cyan: "#99D1DB",
    green: "#A6D189",
    yellow: "#E5C890",
    orange: "#EF9F76",
    pink: "#F4B8E4",
    purple: "#CA9EE6",
    red: "#E78284",
    neutral: "#838BA7",
  },
};

const catppuccinLight: ThemePalette = {
  id: "catppuccin-latte",
  name: "Catppuccin Latte",
  family: "catppuccin",
  mode: "light",
  colors: {
    background: "#EFF1F5",
    backgroundAlt: "#E6E9EF",
    surface: "#CCD0DA",
    surfaceAlt: "#BCC0CC",
    surfaceMuted: "#DCE0E8",
    border: "#ACB0BE",
    borderStrong: "#9CA0B0",
    foreground: "#4C4F69",
    mutedForeground: "#5C5F77",
    accent: "#8839EF",
    accentAlt: "#1E66F5",
    accentHover: "#7287FD",
    accentForeground: "#EFF1F5",
    success: "#40A02B",
    warning: "#FE640B",
    danger: "#D20F39",
    info: "#04A5E5",
    overlay: "#8C8FA1",
    shadow: "#ACB0BE",
    scrollbar: "#9CA0B0",
    scrollbarHover: "#1E66F5",
  },
  projectAccents: ["#1E66F5", "#8839EF", "#40A02B", "#EA76CB", "#FE640B"],
  techTones: {
    blue: "#1E66F5",
    cyan: "#179299",
    green: "#40A02B",
    yellow: "#DF8E1D",
    orange: "#FE640B",
    pink: "#EA76CB",
    purple: "#8839EF",
    red: "#D20F39",
    neutral: "#6C6F85",
  },
};

const canonicalThemeRegistry: Record<ThemeName, ThemePalette> = {
  "dracula-classic": draculaDark,
  "alucard-classic": draculaLight,
  "catppuccin-mocha": catppuccinMocha,
  "catppuccin-macchiato": catppuccinMacchiato,
  "catppuccin-frappe": catppuccinFrappe,
  "catppuccin-latte": catppuccinLight,
};

export const defaultThemeName: ThemeName = "catppuccin-mocha";

export const themeOptions: Array<{ id: ThemeName; label: string; family: ThemeFamily }> = [
  { id: "catppuccin-mocha", label: "Mocha", family: "catppuccin" },
  { id: "catppuccin-macchiato", label: "Macchiato", family: "catppuccin" },
  { id: "catppuccin-frappe", label: "Frappe", family: "catppuccin" },
  { id: "dracula-classic", label: "Dracula", family: "dracula" },
];

const darkPairByTheme: Record<ThemeName, ThemeName> = {
  "catppuccin-mocha": "catppuccin-mocha",
  "catppuccin-macchiato": "catppuccin-macchiato",
  "catppuccin-frappe": "catppuccin-frappe",
  "catppuccin-latte": "catppuccin-latte",
  "dracula-classic": "dracula-classic",
  "alucard-classic": "dracula-classic",
};

const lightPairByTheme: Record<ThemeName, ThemeName> = {
  "catppuccin-mocha": "catppuccin-latte",
  "catppuccin-macchiato": "catppuccin-latte",
  "catppuccin-frappe": "catppuccin-latte",
  "catppuccin-latte": "catppuccin-latte",
  "dracula-classic": "alucard-classic",
  "alucard-classic": "alucard-classic",
};

export function getThemePalette(themeName: ThemeName, mode: ThemeMode): ThemePalette {
  const resolvedThemeName = mode === "dark" ? darkPairByTheme[themeName] : lightPairByTheme[themeName];
  return canonicalThemeRegistry[resolvedThemeName];
}

const darkColorSchemeRegistry: Record<string, Partial<ThemePalette["colors"]>> = {
  default: {},
  rosewater: {
    accent: "#F5E0DC",
    accentAlt: "#F2CDCD",
    accentHover: "#EBC7D3",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#C9A090",
  },
  flamingo: {
    accent: "#F2CDCD",
    accentAlt: "#F5C2E7",
    accentHover: "#E8B4BC",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#C99696",
  },
  pink: {
    accent: "#F5C2E7",
    accentAlt: "#CBA6F7",
    accentHover: "#E8B4DC",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#C986B3",
  },
  mauve: {
    accent: "#CBA6F7",
    accentAlt: "#89B4FA",
    accentHover: "#B4BEFE",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#9F85D4",
  },
  red: {
    accent: "#F38BA8",
    accentAlt: "#F5C2E7",
    accentHover: "#E89AAD",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#D47A8C",
  },
  maroon: {
    accent: "#EBA0AC",
    accentAlt: "#F5C2E7",
    accentHover: "#D7949A",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#C98791",
  },
  peach: {
    accent: "#FAB387",
    accentAlt: "#F9E2AF",
    accentHover: "#E8C291",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#D4996C",
  },
  yellow: {
    accent: "#F9E2AF",
    accentAlt: "#FAB387",
    accentHover: "#DFCE9A",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#D4C294",
  },
  green: {
    accent: "#A6E3A1",
    accentAlt: "#94E2D5",
    accentHover: "#95CD8F",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#8BC285",
  },
  teal: {
    accent: "#94E2D5",
    accentAlt: "#89DCEB",
    accentHover: "#8AD4C5",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#7DBCB0",
  },
  sky: {
    accent: "#89DCEB",
    accentAlt: "#89B4FA",
    accentHover: "#82D0DC",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#74B8C2",
  },
  sapphire: {
    accent: "#74C7EC",
    accentAlt: "#89B4FA",
    accentHover: "#6BB2D6",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#62A3C4",
  },
  blue: {
    accent: "#89B4FA",
    accentAlt: "#74C7EC",
    accentHover: "#82A6E0",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#7498D0",
  },
  lavender: {
    accent: "#B4BEFE",
    accentAlt: "#CBA6F7",
    accentHover: "#A8ADE8",
    success: "#A6E3A1",
    warning: "#FAB387",
    danger: "#F38BA8",
    info: "#89DCEB",
    borderStrong: "#9AA2D0",
  },
};

const lightColorSchemeRegistry: Record<string, Partial<ThemePalette["colors"]>> = {
  default: {},
  rosewater: {
    accent: "#dc8a78",
    accentAlt: "#dd7878",
    accentHover: "#c67c6c",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#bda8a3",
  },
  flamingo: {
    accent: "#dd7878",
    accentAlt: "#ea76cb",
    accentHover: "#c76c6c",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#bda1a1",
  },
  pink: {
    accent: "#ea76cb",
    accentAlt: "#8839ef",
    accentHover: "#d36ab7",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#c4a3b7",
  },
  mauve: {
    accent: "#8839ef",
    accentAlt: "#1e66f5",
    accentHover: "#7a33d7",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#9f8ebe",
  },
  red: {
    accent: "#d20f39",
    accentAlt: "#ea76cb",
    accentHover: "#bd0d33",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#b58790",
  },
  maroon: {
    accent: "#e64553",
    accentAlt: "#ea76cb",
    accentHover: "#cf3e4a",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#bf9499",
  },
  peach: {
    accent: "#fe640b",
    accentAlt: "#df8e1d",
    accentHover: "#e45a0a",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#c4a088",
  },
  yellow: {
    accent: "#df8e1d",
    accentAlt: "#fe640b",
    accentHover: "#c8801a",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#b9a78e",
  },
  green: {
    accent: "#40a02b",
    accentAlt: "#179299",
    accentHover: "#399026",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#84a67b",
  },
  teal: {
    accent: "#179299",
    accentAlt: "#04a5e5",
    accentHover: "#14838a",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#7aabac",
  },
  sky: {
    accent: "#04a5e5",
    accentAlt: "#1e66f5",
    accentHover: "#0394ce",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#75b0be",
  },
  sapphire: {
    accent: "#209fb5",
    accentAlt: "#1e66f5",
    accentHover: "#1c8fa3",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#81aebd",
  },
  blue: {
    accent: "#1e66f5",
    accentAlt: "#209fb5",
    accentHover: "#1b5cdd",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#809bd2",
  },
  lavender: {
    accent: "#7287fd",
    accentAlt: "#8839ef",
    accentHover: "#6679e4",
    success: "#40a02b",
    warning: "#fe640b",
    danger: "#d20f39",
    info: "#04a5e5",
    borderStrong: "#9aa3d4",
  },
};

const draculaDarkColorSchemeRegistry: Record<string, Partial<ThemePalette["colors"]>> = {
  default: {},
  red: {
    accent: "#FF5555",
    accentAlt: "#FF6E6E",
    accentHover: "#FF6E6E",
    borderStrong: "#FF5555",
  },
  green: {
    accent: "#50FA7B",
    accentAlt: "#69FF94",
    accentHover: "#69FF94",
    borderStrong: "#50FA7B",
  },
  yellow: {
    accent: "#F1FA8C",
    accentAlt: "#FFFFA5",
    accentHover: "#FFFFA5",
    borderStrong: "#F1FA8C",
  },
  pink: {
    accent: "#FF79C6",
    accentAlt: "#FF92DF",
    accentHover: "#FF92DF",
    borderStrong: "#FF79C6",
  },
  cyan: {
    accent: "#8BE9FD",
    accentAlt: "#A4FFFF",
    accentHover: "#A4FFFF",
    borderStrong: "#8BE9FD",
  },
};

const draculaLightColorSchemeRegistry: Record<string, Partial<ThemePalette["colors"]>> = {
  default: {},
  red: {
    accent: "#CB3A2A",
    accentAlt: "#D74C3D",
    accentHover: "#D74C3D",
    borderStrong: "#CB3A2A",
  },
  green: {
    accent: "#14710A",
    accentAlt: "#198D0C",
    accentHover: "#198D0C",
    borderStrong: "#14710A",
  },
  yellow: {
    accent: "#846E15",
    accentAlt: "#9E841A",
    accentHover: "#9E841A",
    borderStrong: "#846E15",
  },
  pink: {
    accent: "#A3144D",
    accentAlt: "#BF185A",
    accentHover: "#BF185A",
    borderStrong: "#A3144D",
  },
  cyan: {
    accent: "#036A96",
    accentAlt: "#047FB4",
    accentHover: "#047FB4",
    borderStrong: "#036A96",
  },
};

export function applyColorScheme(palette: ThemePalette, scheme: ColorSchemeName): ThemePalette {
  if (scheme === "default") {
    return palette;
  }

  let registry;
  if (palette.family === "dracula") {
    registry = palette.mode === "light" ? draculaLightColorSchemeRegistry : draculaDarkColorSchemeRegistry;
  } else {
    registry = palette.mode === "light" ? lightColorSchemeRegistry : darkColorSchemeRegistry;
  }

  return {
    ...palette,
    colors: {
      ...palette.colors,
      ...registry[scheme],
    },
  };
}

export function getSchemeAccentHex(basePalette: ThemePalette, scheme: ColorSchemeName): string {
  if (scheme === "default") {
    return basePalette.colors.accent;
  }

  let registry;
  if (basePalette.family === "dracula") {
    registry = basePalette.mode === "light" ? draculaLightColorSchemeRegistry : draculaDarkColorSchemeRegistry;
  } else {
    registry = basePalette.mode === "light" ? lightColorSchemeRegistry : darkColorSchemeRegistry;
  }

  return registry[scheme]?.accent || basePalette.colors.accent;
}

export function hexToRgbChannels(hex: string): string {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized;

  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);

  return `${r} ${g} ${b}`;
}

export function mixHex(baseHex: string, blendHex: string, weight: number): string {
  const clampWeight = Math.min(1, Math.max(0, weight));
  const base = baseHex.replace("#", "");
  const blend = blendHex.replace("#", "");

  const toRgb = (hex: string) => [
    Number.parseInt(hex.slice(0, 2), 16),
    Number.parseInt(hex.slice(2, 4), 16),
    Number.parseInt(hex.slice(4, 6), 16),
  ];

  const [br, bg, bb] = toRgb(base);
  const [lr, lg, lb] = toRgb(blend);

  const mixed = [br, bg, bb].map((value, index) => {
    const target = [lr, lg, lb][index];
    return Math.round(value * (1 - clampWeight) + target * clampWeight);
  });

  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function getProjectSectionGradient(palette: ThemePalette, index: number): {
  from: string;
  to: string;
} {
  const accent = palette.projectAccents[index % palette.projectAccents.length];
  const accentAlt = palette.projectAccents[(index + 1) % palette.projectAccents.length];
  const blendTarget = palette.mode === "dark" ? "#000000" : "#FFFFFF";
  const accentWeight = palette.mode === "dark" ? 0.78 : 0.88;
  const accentAltWeight = palette.mode === "dark" ? 0.7 : 0.84;

  return {
    from: mixHex(accent, palette.colors.background, accentWeight),
    to: mixHex(accentAlt, blendTarget, accentAltWeight),
  };
}

export function getTechTone(tech: string, palette: ThemePalette): string {
  const value = tech.toLowerCase();

  if (value.includes("react") || value.includes("next") || value.includes("css") || value.includes("docker")) {
    return palette.techTones.blue;
  }
  if (value.includes("tailwind")) {
    return palette.techTones.cyan;
  }
  if (value.includes("node") || value.includes("mongo") || value.includes("django")) {
    return palette.techTones.green;
  }
  if (value.includes("javascript") || value.includes("python")) {
    return palette.techTones.yellow;
  }
  if (value.includes("html") || value.includes("git")) {
    return palette.techTones.orange;
  }
  if (value.includes("sass")) {
    return palette.techTones.pink;
  }
  if (value.includes("typescript") || value.includes("postgres")) {
    return palette.techTones.purple;
  }

  return palette.techTones.neutral;
}
