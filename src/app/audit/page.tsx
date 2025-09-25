'use client';

import React from 'react';
import { Download, RefreshCcw } from 'lucide-react';
import { usePageAudit } from '../../hooks/usePageAudit';
import AuditChecklist from '../../components/audit/AuditChecklist';
import AuditProgress from '../../components/audit/AuditProgress';

export default function AuditPage() {
  const {
    checklist,
    notes,
    updateItemStatus,
    updateItemNotes,
    getProgress,
    exportAuditReport
  } = usePageAudit();

  const progress = getProgress();
  const passed = checklist.reduce((acc, category) => 
    acc + category.items.filter(item => item.status === 'passed').length, 0
  );
  const failed = checklist.reduce((acc, category) => 
    acc + category.items.filter(item => item.status === 'failed').length, 0
  );
  const pending = progress.total - passed - failed;

  const handleExport = () => {
    const report = exportAuditReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Page Audit Checklist</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-outline flex items-center"
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Reset Audit
          </button>
          <button 
            onClick={handleExport}
            className="btn btn-primary flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <AuditProgress
        total={progress.total}
        completed={progress.completed}
        percentage={progress.percentage}
        passed={passed}
        failed={failed}
        pending={pending}
      />

      <AuditChecklist
        categories={checklist}
        notes={notes}
        onUpdateStatus={updateItemStatus}
        onUpdateNotes={updateItemNotes}
      />
    </div>
  );
}