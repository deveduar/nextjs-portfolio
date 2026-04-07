export type ThemeFamily = "dracula" | "catppuccin";
export type ThemeMode = "light" | "dark";

export interface ThemePalette {
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

const draculaDark: ThemePalette = {
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

const catppuccinDark: ThemePalette = {
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

const catppuccinLight: ThemePalette = {
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
    mutedForeground: "#6C6F85",
    accent: "#8839EF",
    accentAlt: "#1E66F5",
    accentHover: "#7287FD",
    accentForeground: "#EFF1F5",
    success: "#40A02B",
    warning: "#FE640B",
    danger: "#D20F39",
    info: "#179299",
    overlay: "#CCD0DA",
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

export const themeRegistry: Record<ThemeFamily, Record<ThemeMode, ThemePalette>> = {
  dracula: {
    dark: draculaDark,
    light: draculaLight,
  },
  catppuccin: {
    dark: catppuccinDark,
    light: catppuccinLight,
  },
};

export const defaultThemeFamily: ThemeFamily = "dracula";

export function getThemePalette(family: ThemeFamily, mode: ThemeMode): ThemePalette {
  return themeRegistry[family][mode];
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
