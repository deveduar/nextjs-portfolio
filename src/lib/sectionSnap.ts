export const SCROLL_THRESHOLD = 150;
export const SNAP_DURATION = 300;
export const SNAP_NAV_HEIGHT = 56;
export const ABOUT_EDGE_THRESHOLD = 12;
export const ABOUT_SNAP_VISIBLE_RATIO = 0.2;
export const TOUCH_THRESHOLD_SMALL = 2;
export const TOUCH_SCROLL_TOLERANCE = 24;

export interface SectionViewportInfo {
  top: number;
  bottom: number;
  viewportTop: number;
  viewportBottom: number;
  visibleHeight: number;
  visibleRatio: number;
  isIntersecting: boolean;
  isNearTop: boolean;
  isNearBottom: boolean;
  isAboveViewport: boolean;
  isBelowViewport: boolean;
}

export const getSectionViewportInfo = (
  section: HTMLElement | null,
  navHeight = SNAP_NAV_HEIGHT,
  edgeThreshold = ABOUT_EDGE_THRESHOLD,
): SectionViewportInfo | null => {
  if (!section) return null;

  const top = section.offsetTop - navHeight;
  const height = section.offsetHeight;
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;
  const bottom = top + height;
  const visibleTop = Math.max(top, viewportTop);
  const visibleBottom = Math.min(bottom, viewportBottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);

  return {
    top,
    bottom,
    viewportTop,
    viewportBottom,
    visibleHeight,
    visibleRatio: height > 0 ? visibleHeight / height : 0,
    isIntersecting: bottom > viewportTop && top < viewportBottom,
    isNearTop: viewportTop <= top + edgeThreshold,
    isNearBottom: viewportBottom >= bottom - edgeThreshold,
    isAboveViewport: bottom <= viewportTop,
    isBelowViewport: top >= viewportBottom,
  };
};

export const sectionIntersectsViewport = (
  section: HTMLElement | null,
  navHeight = SNAP_NAV_HEIGHT,
) => {
  if (!section) return false;

  const top = section.offsetTop - navHeight;
  const bottom = top + section.offsetHeight;
  const viewportTop = window.scrollY;
  const viewportBottom = viewportTop + window.innerHeight;

  return bottom > viewportTop && top < viewportBottom;
};

export const sectionContainsTouchPoint = (
  section: HTMLElement | null,
  clientX: number,
  clientY: number,
) => {
  if (!section) return false;

  const touchedElement = document.elementFromPoint(clientX, clientY);
  if (touchedElement && section.contains(touchedElement)) {
    return true;
  }

  const rect = section.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
};

export const getCenteredScrollTop = (
  top: number,
  height: number,
  navHeight = SNAP_NAV_HEIGHT,
) => {
  const viewportHeight = window.innerHeight;
  const availableSpace = viewportHeight - navHeight;

  if (height >= availableSpace) {
    return top;
  }

  const offset = (availableSpace - height) / 2;
  return top - offset;
};
