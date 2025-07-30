import { useState, useEffect, useCallback } from "react";

const MD_BREAKPOINT = 768;

export const useSidebarToggle = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      const mobile = window.innerWidth < MD_BREAKPOINT;
      setIsMobile(mobile);

      if (mobile) {
        setIsMinimized(false);
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(false);
      }
    };

    checkDeviceType();

    const handleResize = () => {
      checkDeviceType();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsDrawerOpen(!isDrawerOpen);
    } else {
      setIsMinimized(!isMinimized);
    }
  }, [isMobile, isDrawerOpen, isMinimized]);

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsDrawerOpen(false);
    } else {
      setIsMinimized(true);
    }
  }, [isMobile]);

  const openSidebar = useCallback(() => {
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      setIsMinimized(false);
    }
  }, [isMobile]);

  return {
    isMinimized,
    isDrawerOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
};
