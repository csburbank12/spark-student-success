
import React from 'react';
import QATestUtility from '@/utils/QATestUtility';
import PageHeader from '@/components/layout/PageHeader';

const QADashboard = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="QA Dashboard" />
      <QATestUtility />
    </div>
  );
};

export default QADashboard;
