
import React from 'react';
import DashboardTabs from './Tabs';
import DashboardOverview from './Overview';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <DashboardOverview />
        <div className="mt-8">
          <DashboardTabs />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
