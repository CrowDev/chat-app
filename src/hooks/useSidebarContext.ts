import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Must be inside within Provider");
  return context;
};
