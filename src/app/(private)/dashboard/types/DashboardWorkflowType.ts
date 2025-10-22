export interface DashboardWorkflowRes {
  role: string;
  tabs: {
    tabCode: string;
    items: {
      id: string;
      title: string;
      code: string;
      statusCode: string;
      date: string;
    }[];
  }[];
}

export interface DashboardProps {
  $workflowData: DashboardWorkflowRes;
}
