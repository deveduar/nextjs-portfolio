"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  ABOUT_SNAP_VISIBLE_RATIO,
  SCROLL_THRESHOLD,
  SNAP_DURATION,
  SNAP_NAV_HEIGHT,
  TOUCH_SCROLL_TOLERANCE,
  TOUCH_THRESHOLD_SMALL,
  getCenteredScrollTop,
  getSectionViewportInfo,
  sectionContainsTouchPoint,
  sectionIntersectsViewport,
} from "@/lib/sectionSnap";

interface UseHomeSectionSnapArgs {
  projectCount: number;
}

export const useHomeSectionSnap = ({ projectCount }: UseHomeSectionSnapArgs) => {
  const isScrolling = useRef(false);
  const activeSectionRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastScrollTime = useRef(0);

  const touchStartY = useRef(0);
  const touchAccumulator = useRef(0);
  const touchCooldown = useRef(false);
  const touchStartSection = useRef(0);
  const touchStartScrollY = useRef(0);

  const heroRef = useRef<HTMLElement>(null);
  const viewAllRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const aboutRef2 = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const backToTopRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);

  const totalSections = projectCount + 6;
  const viewAllSectionIndex = totalSections - 5;
  const aboutSectionIndex = totalSections - 4;
  const aboutSectionIndex2 = totalSections - 3;
  const contactSectionIndex = totalSections - 2;
  const backToTopSectionIndex = totalSections - 1;

  const getSectionPosition = useCallback((index: number) => {
    if (index === 0 && heroRef.current) {
      return { top: heroRef.current.offsetTop - SNAP_NAV_HEIGHT, height: heroRef.current.offsetHeight };
    }

    if (index === viewAllSectionIndex && viewAllRef.current) {
      return { top: viewAllRef.current.offsetTop - SNAP_NAV_HEIGHT, height: viewAllRef.current.offsetHeight };
    }

    if (index === aboutSectionIndex && aboutRef.current) {
      return { top: aboutRef.current.offsetTop - SNAP_NAV_HEIGHT, height: aboutRef.current.offsetHeight };
    }

    if (index === aboutSectionIndex2 && aboutRef2.current) {
      return { top: aboutRef2.current.offsetTop - SNAP_NAV_HEIGHT, height: aboutRef2.current.offsetHeight };
    }

    if (index === contactSectionIndex && contactRef.current) {
      return { top: contactRef.current.offsetTop - SNAP_NAV_HEIGHT, height: contactRef.current.offsetHeight };
    }

    if (index === backToTopSectionIndex && backToTopRef.current) {
      return { top: backToTopRef.current.offsetTop - SNAP_NAV_HEIGHT, height: backToTopRef.current.offsetHeight };
    }

    const projectIndex = index - 1;
    const projectEl = projectRefs.current[projectIndex];
    if (projectEl) {
      return { top: projectEl.offsetTop - SNAP_NAV_HEIGHT, height: projectEl.offsetHeight };
    }

    return { top: 0, height: 0 };
  }, [viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex]);

  const snapToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections) return;
    if (isScrolling.current) return;

    const { top, height } = getSectionPosition(index);
    const scrollTop = getCenteredScrollTop(top, height, SNAP_NAV_HEIGHT);

    isScrolling.current = true;
    activeSectionRef.current = index;
    scrollAccumulator.current = 0;
    lastScrollTime.current = Date.now();

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, SNAP_DURATION);
  }, [getSectionPosition, totalSections]);

  const scrollToProjects = useCallback(() => {
    snapToSection(1);
  }, [snapToSection]);

  const completeTouchSnap = useCallback((index: number) => {
    touchCooldown.current = true;
    snapToSection(index);
    setTimeout(() => {
      touchCooldown.current = false;
    }, SNAP_DURATION);
  }, [snapToSection]);

  const getViewportSectionIndex = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = scrollY + viewportHeight / 2;

    if (heroRef.current) {
      const top = heroRef.current.offsetTop - SNAP_NAV_HEIGHT;
      const bottom = top + heroRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        return 0;
      }
    }

    for (let i = 0; i < projectRefs.current.length; i += 1) {
      const el = projectRefs.current[i];
      if (!el) continue;

      const top = el.offsetTop - SNAP_NAV_HEIGHT;
      const bottom = top + el.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        return i + 1;
      }
    }

    if (viewAllRef.current) {
      const top = viewAllRef.current.offsetTop - SNAP_NAV_HEIGHT;
      const bottom = top + viewAllRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        return viewAllSectionIndex;
      }
    }

    if (contactRef.current) {
      const top = contactRef.current.offsetTop - SNAP_NAV_HEIGHT;
      const bottom = top + contactRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        return contactSectionIndex;
      }
    }

    if (backToTopRef.current) {
      const top = backToTopRef.current.offsetTop - SNAP_NAV_HEIGHT;
      const bottom = top + backToTopRef.current.clientHeight;
      if (viewportCenter >= top && viewportCenter <= bottom) {
        return backToTopSectionIndex;
      }
    }

    if (sectionIntersectsViewport(viewAllRef.current, SNAP_NAV_HEIGHT)) {
      return viewAllSectionIndex;
    }

    if (sectionIntersectsViewport(contactRef.current, SNAP_NAV_HEIGHT)) {
      return contactSectionIndex;
    }

    if (sectionIntersectsViewport(backToTopRef.current, SNAP_NAV_HEIGHT)) {
      return backToTopSectionIndex;
    }

    if (sectionIntersectsViewport(aboutRef.current, SNAP_NAV_HEIGHT)) {
      return aboutSectionIndex;
    }

    if (sectionIntersectsViewport(aboutRef2.current, SNAP_NAV_HEIGHT)) {
      return aboutSectionIndex2;
    }

    return activeSectionRef.current;
  }, [aboutSectionIndex, aboutSectionIndex2, viewAllSectionIndex, contactSectionIndex, backToTopSectionIndex]);

  const getTouchStartSectionIndex = useCallback((clientX: number, clientY: number) => {
    if (sectionContainsTouchPoint(viewAllRef.current, clientX, clientY)) {
      return viewAllSectionIndex;
    }

    if (sectionContainsTouchPoint(aboutRef.current, clientX, clientY)) {
      return aboutSectionIndex;
    }

    if (sectionContainsTouchPoint(aboutRef2.current, clientX, clientY)) {
      return aboutSectionIndex2;
    }

    if (sectionContainsTouchPoint(contactRef.current, clientX, clientY)) {
      return contactSectionIndex;
    }

    if (sectionContainsTouchPoint(backToTopRef.current, clientX, clientY)) {
      return backToTopSectionIndex;
    }

    if (sectionContainsTouchPoint(heroRef.current, clientX, clientY)) {
      return 0;
    }

    for (let i = 0; i < projectRefs.current.length; i += 1) {
      if (sectionContainsTouchPoint(projectRefs.current[i], clientX, clientY)) {
        return i + 1;
      }
    }

    return getViewportSectionIndex();
  }, [viewAllSectionIndex, aboutSectionIndex, aboutSectionIndex2, contactSectionIndex, backToTopSectionIndex, getViewportSectionIndex]);

  const handleAboutTouch = useCallback((
    section: HTMLElement | null,
    currentSectionIndex: number,
    distance: number,
    didNativeScroll: boolean,
    previousSectionIndex: number,
    nextSectionIndex: number,
  ) => {
    if (Math.abs(distance) < TOUCH_THRESHOLD_SMALL) {
      return;
    }

    const sectionInfo = getSectionViewportInfo(section, SNAP_NAV_HEIGHT);
    if (!sectionInfo) {
      return;
    }

    if (didNativeScroll) {
      if (distance < 0 && currentSectionIndex < previousSectionIndex + 1) {
        completeTouchSnap(previousSectionIndex);
        return;
      }

      if (distance > 0 && currentSectionIndex > nextSectionIndex - 1) {
        completeTouchSnap(nextSectionIndex);
        return;
      }
    }

    if (didNativeScroll && !sectionInfo.isIntersecting) {
      if (distance < 0 && sectionInfo.isBelowViewport) {
        completeTouchSnap(previousSectionIndex);
        return;
      }

      if (distance > 0 && sectionInfo.isAboveViewport) {
        completeTouchSnap(nextSectionIndex);
        return;
      }
    }

    if (didNativeScroll && sectionInfo.visibleRatio <= ABOUT_SNAP_VISIBLE_RATIO) {
      if (distance < 0 && sectionInfo.viewportTop < sectionInfo.top) {
        completeTouchSnap(previousSectionIndex);
        return;
      }

      if (distance > 0 && sectionInfo.viewportBottom > sectionInfo.bottom) {
        completeTouchSnap(nextSectionIndex);
        return;
      }
    }

    if (distance < 0 && sectionInfo.isNearTop) {
      completeTouchSnap(previousSectionIndex);
      return;
    }

    if (distance > 0 && sectionInfo.isNearBottom) {
      completeTouchSnap(nextSectionIndex);
    }
  }, [completeTouchSnap]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      return;
    }

    const currentSection = getViewportSectionIndex();
    const lastProjectIndex = totalSections - 6;
    const viewAllInfo = getSectionViewportInfo(viewAllRef.current, SNAP_NAV_HEIGHT);
    const viewportCenter = window.scrollY + window.innerHeight / 2;
    const isViewAllDominant = !!viewAllInfo &&
      (viewAllInfo.visibleRatio >= 0.6 || (viewportCenter >= viewAllInfo.top && viewportCenter <= viewAllInfo.bottom));

    if (isViewAllDominant) {
      if (e.deltaY < 0) {
        e.preventDefault();
        snapToSection(lastProjectIndex);
        return;
      }

      if (e.deltaY > 0) {
        e.preventDefault();
        snapToSection(aboutSectionIndex);
        return;
      }
    }

    if (sectionIntersectsViewport(aboutRef2.current, SNAP_NAV_HEIGHT)) {
      if (e.deltaY > 0) {
        if (!isScrolling.current && getSectionViewportInfo(aboutRef2.current, SNAP_NAV_HEIGHT)?.isNearBottom) {
          e.preventDefault();
          snapToSection(contactSectionIndex);
        }
        return;
      }

      if (e.deltaY < 0) {
        if (!isScrolling.current && getSectionViewportInfo(aboutRef2.current, SNAP_NAV_HEIGHT)?.isNearTop) {
          e.preventDefault();
          snapToSection(aboutSectionIndex);
        }
        return;
      }
    }

    if (sectionIntersectsViewport(aboutRef.current, SNAP_NAV_HEIGHT)) {
      if (e.deltaY > 0) {
        if (!isScrolling.current && getSectionViewportInfo(aboutRef.current, SNAP_NAV_HEIGHT)?.isNearBottom) {
          e.preventDefault();
          snapToSection(aboutSectionIndex2);
        }
        return;
      }

      if (e.deltaY < 0) {
        if (!isScrolling.current && getSectionViewportInfo(aboutRef.current, SNAP_NAV_HEIGHT)?.isNearTop) {
          e.preventDefault();
          snapToSection(viewAllSectionIndex);
        }
        return;
      }
    }

    if (currentSection === backToTopSectionIndex && e.deltaY < 0) {
      snapToSection(contactSectionIndex);
      return;
    }

    if (currentSection === backToTopSectionIndex && e.deltaY > 0) {
      return;
    }

    if (currentSection === contactSectionIndex && e.deltaY < 0) {
      snapToSection(aboutSectionIndex);
      return;
    }

    if (currentSection === contactSectionIndex && e.deltaY > 0) {
      snapToSection(backToTopSectionIndex);
      return;
    }

    if (currentSection === viewAllSectionIndex && e.deltaY < 0) {
      snapToSection(lastProjectIndex);
      return;
    }

    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const now = Date.now();
    if (now - lastScrollTime.current < 150) {
      e.preventDefault();
      return;
    }

    scrollAccumulator.current += e.deltaY;
    e.preventDefault();

    if (Math.abs(scrollAccumulator.current) >= SCROLL_THRESHOLD) {
      const direction = scrollAccumulator.current > 0 ? 1 : -1;
      const nextSection = direction > 0
        ? Math.min(currentSection + 1, totalSections - 1)
        : Math.max(currentSection - 1, 0);

      if (nextSection !== currentSection) {
        snapToSection(nextSection);
      } else {
        scrollAccumulator.current = 0;
      }
    }
  }, [
    totalSections,
    getViewportSectionIndex,
    aboutSectionIndex,
    aboutSectionIndex2,
    contactSectionIndex,
    backToTopSectionIndex,
    viewAllSectionIndex,
    snapToSection,
  ]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartSection.current = getTouchStartSectionIndex(e.touches[0].clientX, e.touches[0].clientY);
    touchAccumulator.current = 0;
    touchCooldown.current = false;
    touchStartScrollY.current = window.scrollY;
  }, [getTouchStartSectionIndex]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchCooldown.current) return;

    const currentY = e.touches[0].clientY;
    touchAccumulator.current = touchStartY.current - currentY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchCooldown.current) {
      return;
    }

    const startSection = touchStartSection.current;
    const currentSection = getViewportSectionIndex();
    const distance = touchAccumulator.current;
    const absDistance = Math.abs(distance);
    const didNativeScroll = Math.abs(window.scrollY - touchStartScrollY.current) > TOUCH_SCROLL_TOLERANCE;
    const lastProjectIndex = totalSections - 6;

    if (
      (startSection === backToTopSectionIndex ||
        currentSection === backToTopSectionIndex ||
        sectionIntersectsViewport(backToTopRef.current, SNAP_NAV_HEIGHT)) &&
      distance < 0 &&
      absDistance >= TOUCH_THRESHOLD_SMALL
    ) {
      completeTouchSnap(contactSectionIndex);
      return;
    }

    if (startSection === contactSectionIndex && distance > 0 && absDistance >= TOUCH_THRESHOLD_SMALL) {
      if (contactRef.current) {
        const contactTop = contactRef.current.offsetTop - SNAP_NAV_HEIGHT;
        const contactHeight = contactRef.current.offsetHeight;
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;

        if (viewportTop + viewportHeight >= contactTop + contactHeight - 150) {
          completeTouchSnap(backToTopSectionIndex);
        } else {
          completeTouchSnap(aboutSectionIndex2);
        }
      }
      return;
    }

    if (startSection === contactSectionIndex && distance < 0 && absDistance >= TOUCH_THRESHOLD_SMALL) {
      completeTouchSnap(aboutSectionIndex2);
      return;
    }

    if (
      (startSection === aboutSectionIndex || currentSection === aboutSectionIndex) &&
      distance < 0 &&
      absDistance >= TOUCH_THRESHOLD_SMALL &&
      sectionIntersectsViewport(viewAllRef.current, SNAP_NAV_HEIGHT)
    ) {
      completeTouchSnap(viewAllSectionIndex);
      return;
    }

    if ((startSection === viewAllSectionIndex || currentSection === viewAllSectionIndex) && distance < 0 && absDistance >= TOUCH_THRESHOLD_SMALL) {
      completeTouchSnap(lastProjectIndex);
      return;
    }

    if ((startSection === viewAllSectionIndex || currentSection === viewAllSectionIndex) && distance > 0 && absDistance >= TOUCH_THRESHOLD_SMALL) {
      completeTouchSnap(aboutSectionIndex);
      return;
    }

    if (startSection === aboutSectionIndex2) {
      handleAboutTouch(
        aboutRef2.current,
        getViewportSectionIndex(),
        distance,
        didNativeScroll,
        aboutSectionIndex,
        contactSectionIndex,
      );
      return;
    }

    if (startSection === aboutSectionIndex) {
      handleAboutTouch(
        aboutRef.current,
        getViewportSectionIndex(),
        distance,
        didNativeScroll,
        viewAllSectionIndex,
        aboutSectionIndex2,
      );
      return;
    }

    if (absDistance >= TOUCH_THRESHOLD_SMALL) {
      const direction = distance > 0 ? 1 : -1;
      const nextSection = direction > 0
        ? Math.min(startSection + 1, totalSections - 1)
        : Math.max(startSection - 1, 0);

      completeTouchSnap(nextSection);
    }
  }, [
    totalSections,
    getViewportSectionIndex,
    completeTouchSnap,
    handleAboutTouch,
    viewAllSectionIndex,
    aboutSectionIndex,
    aboutSectionIndex2,
    contactSectionIndex,
    backToTopSectionIndex,
  ]);

  const updateActiveSection = useCallback(() => {
    activeSectionRef.current = getViewportSectionIndex();
  }, [getViewportSectionIndex]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, updateActiveSection, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    heroRef,
    viewAllRef,
    aboutRef,
    aboutRef2,
    contactRef,
    backToTopRef,
    projectRefs,
    scrollToProjects,
  };
};
