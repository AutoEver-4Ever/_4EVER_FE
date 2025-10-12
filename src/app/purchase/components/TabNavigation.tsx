import { TabNavigationProps } from '../types/TabNavigationType';

export default function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <i className={`${tab.icon} mr-2 text-lg`}></i>
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );
}
