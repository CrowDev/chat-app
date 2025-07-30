import { HamburgerButton } from "@/components/ui/sidebar/HamburgerButton";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { DesktopSidebar } from "@/components/ui/sidebar/DesktopSidebar";
import { MobileSidebar } from "@/components/ui/sidebar/MobileSidebar";

export const Sidebar = () => {
  const { isMobile, toggleSidebar } = useSidebarContext();

  if (isMobile) {
    return (
      <>
        <HamburgerButton onClick={toggleSidebar} />
        <MobileSidebar />
      </>
    );
  }

  return <DesktopSidebar />;
};
