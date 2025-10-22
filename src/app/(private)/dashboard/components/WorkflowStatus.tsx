'use client';

import { useState } from 'react';
import { getOrderStatusColor, getOrderStatusText } from '../../sales/utils';
import { useQuery } from '@tanstack/react-query';
import { getWorkflowStatus } from '../dashboard.api';
import { DashboardProps, DashboardWorkflowRes } from '../types/DashboardWorkflowType';
import { getTabCodeText } from '../dashboard.utils';

const WorkflowStatus = ({ $workflowData }: DashboardProps) => {
  // const {
  //   data: workflowRes,
  //   isLoading,
  //   isError,
  // } = useQuery<DashboardWorkflowRes>({
  //   queryKey: ['workflowStatus'],
  //   queryFn: () => getWorkflowStatus('SD_USER'),
  //   staleTime: 1000,
  // });

  const [activeTab, setActiveTab] = useState('first');

  const firstTabCode = $workflowData?.tabs[0].tabCode;
  const secondTabCode = $workflowData?.tabs[1].tabCode;

  const firstTabItems = $workflowData?.tabs[0].items ?? [];
  const secondTabItems = $workflowData?.tabs[1].items ?? [];

  const currentWorkflows = activeTab === 'first' ? firstTabItems : secondTabItems;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <i className="ri-flow-chart text-blue-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-900">워크플로우 현황</h2>
        </div>

        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('first')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'first'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {getTabCodeText(firstTabCode)}
          </button>
          <button
            onClick={() => setActiveTab('second')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'second'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {getTabCodeText(secondTabCode)}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {currentWorkflows.map((workflow) => (
          <div
            key={workflow.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <i className="ri-file-text-line text-gray-600"></i>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-medium text-gray-900">{workflow.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{workflow.code}</p>
                <p className="text-xs text-gray-500 mt-1">{workflow.date}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${workflow.statusCode}`}>
              {workflow.statusCode}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowStatus;
