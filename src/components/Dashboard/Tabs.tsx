
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Index from '@/pages/Index';
import Submissions from '@/components/Submissions';

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="forms" className="w-full">
      <div className="flex justify-center mb-6">
        <TabsList className="bg-gray-800/70 border border-gray-700/50 p-1">
          <TabsTrigger 
            value="forms" 
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 px-8"
          >
            Forms
          </TabsTrigger>
          <TabsTrigger 
            value="submissions" 
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400 px-8"
          >
            Submissions
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="forms" className="mt-0">
        <Index />
      </TabsContent>
      
      <TabsContent value="submissions" className="mt-0">
        <Submissions />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
