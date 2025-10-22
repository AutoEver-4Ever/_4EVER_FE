export interface DashboardWorkflowRes {
  role: string;
  tabs: {
    tabCode: string;
    items: {
      id: string;
      title: string;
      number: string;
      statusCode: string;
      date: string;
      name: string;
    }[];
  }[];
}

export interface DashboardProps {
  $workflowData: DashboardWorkflowRes;
}
