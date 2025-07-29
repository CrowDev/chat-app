import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { createContext } from "react";

interface IProps {
  children: React.ReactNode;
}

interface IValueContext {
  isMinimized: boolean;
  isDrawerOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const SidebarContext = createContext<IValueContext | undefined>(
  undefined,
);

export const SidebarContextProvider = ({ children }: IProps) => {
  const { isMinimized, isDrawerOpen, isMobile, toggleSidebar, closeSidebar } =
    useSidebarToggle();

  const contextValues: IValueContext = {
    isMinimized,
    isDrawerOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
  };
  return (
    <SidebarContext.Provider value={contextValues}>
      {children}
    </SidebarContext.Provider>
  );
};
