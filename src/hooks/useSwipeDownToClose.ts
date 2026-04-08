import { useEffect, useRef } from "react";

export function useSwipeDownToClose(
  onClose: () => void,
  containerRef: React.RefObject<HTMLElement | null>,
  enabled: boolean = true
) {
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = handleRef.current;
    const container = containerRef.current;
    if (!handle || !container || !enabled) return;

    let startY = 0;
    let isDragging = false;

    const handlePointerDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      // Desactiva el drag en pantallas de escritorio (tooltip modal)
      if (window.innerWidth >= 640) return;
      
      startY = e.clientY;
      isDragging = true;
      handle.setPointerCapture(e.pointerId);
      
      // Prevent transitions while dragging
      container.style.transition = 'none';
      container.style.transform = 'translateY(0)';
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const diffY = e.clientY - startY;
      
      if (diffY > 0) {
        container.style.transform = `translateY(${diffY}px)`;
      }

      if (diffY > 5 && e.cancelable) {
        e.preventDefault();
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      handle.releasePointerCapture(e.pointerId);
      
      const diffY = e.clientY - startY;
      container.style.transition = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)';
      
      // Close if dragged more than 80px (approx 20% of drawer)
      if (diffY > 80) {
        container.style.transform = `translateY(100vh)`;
        setTimeout(() => {
          onClose();
          container.style.transform = '';
        }, 250);
      } else {
        container.style.transform = 'translateY(0)';
        setTimeout(() => {
          if (container) container.style.transform = '';
        }, 250);
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      handle.releasePointerCapture(e.pointerId);
      
      // Revert position
      container.style.transition = 'transform 0.25s cubic-bezier(0.32, 0.72, 0, 1)';
      container.style.transform = 'translateY(0)';
      setTimeout(() => {
        if (container) container.style.transform = '';
      }, 250);
    };

    handle.addEventListener("pointerdown", handlePointerDown, { passive: false });
    handle.addEventListener("pointermove", handlePointerMove, { passive: false });
    handle.addEventListener("pointerup", handlePointerUp, { passive: true });
    handle.addEventListener("pointercancel", handlePointerCancel, { passive: true });

    return () => {
      handle.removeEventListener("pointerdown", handlePointerDown);
      handle.removeEventListener("pointermove", handlePointerMove);
      handle.removeEventListener("pointerup", handlePointerUp);
      handle.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [onClose, containerRef, enabled]);

  return handleRef;
}
