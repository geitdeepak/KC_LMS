import type { ReactNode } from "react";

export interface NavigationItem {

  id: string;

  label: string;

  icon: ReactNode;

  path?: string;

  children?: NavigationItem[];

  permission?: string;

}