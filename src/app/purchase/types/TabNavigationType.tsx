export interface Tab {
  id: string;
  name: string;
  icon?: string;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}
