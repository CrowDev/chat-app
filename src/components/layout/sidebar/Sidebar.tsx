import { HamburgerButton } from "@/components/ui/sidebar/HamburgerButton";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { DesktopSidebar } from "@/components/ui/sidebar/DesktopSidebar";
import { MobileSidebar } from "@/components/ui/sidebar/MobileSidebar";

export const Sidebar = () => {
  const { isDrawerOpen, isMobile, toggleSidebar } = useSidebarContext();

  if (isMobile && !isDrawerOpen) {
    return <HamburgerButton onClick={toggleSidebar} />;
  }

  if (isMobile && isDrawerOpen) {
    return <MobileSidebar />;
  }

  return <DesktopSidebar />;
};
