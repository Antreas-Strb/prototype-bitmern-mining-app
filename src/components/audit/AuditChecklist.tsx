import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import type { AuditCategory, AuditItem } from '../../hooks/usePageAudit';

interface AuditChecklistProps {
  categories: AuditCategory[];
  notes: Record<string, string>;
  onUpdateStatus: (itemId: string, status: 'pending' | 'passed' | 'failed') => void;
  onUpdateNotes: (itemId: string, note: string) => void;
}

const AuditChecklist: React.FC<AuditChecklistProps> = ({
  categories,
  notes,
  onUpdateStatus,
  onUpdateNotes
}) => {
  const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>(
    categories.reduce((acc, category) => ({ ...acc, [category.id]: true }), {})
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-error-500" />;
      default:
        return <Clock className="w-5 h-5 text-light-700" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-success-500/20 text-success-500';
      case 'failed':
        return 'bg-error-500/20 text-error-500';
      default:
        return 'bg-light-700/20 text-light-700';
    }
  };

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="card">
          <button
            onClick={() => toggleCategory(category.id)}
            className="w-full flex items-center justify-between p-4 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <span className="ml-3 px-2 py-1 text-xs rounded-full bg-dark-700">
                {category.items.filter(item => item.status === 'passed').length} / {category.items.length}
              </span>
            </div>
            {expandedCategories[category.id] ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedCategories[category.id] && (
            <div className="mt-4 space-y-4">
              {category.items.map((item) => (
                <div key={item.id} className="p-4 bg-dark-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-light-700">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateStatus(item.id, 'passed')}
                        className={`p-2 rounded-lg transition-colors ${
                          item.status === 'passed' ? 'bg-success-500/20' : 'hover:bg-dark-600'
                        }`}
                      >
                        <CheckCircle className={`w-5 h-5 ${
                          item.status === 'passed' ? 'text-success-500' : 'text-light-700'
                        }`} />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(item.id, 'failed')}
                        className={`p-2 rounded-lg transition-colors ${
                          item.status === 'failed' ? 'bg-error-500/20' : 'hover:bg-dark-600'
                        }`}
                      >
                        <XCircle className={`w-5 h-5 ${
                          item.status === 'failed' ? 'text-error-500' : 'text-light-700'
                        }`} />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(item.id, 'pending')}
                        className={`p-2 rounded-lg transition-colors ${
                          item.status === 'pending' ? 'bg-light-700/20' : 'hover:bg-dark-600'
                        }`}
                      >
                        <Clock className={`w-5 h-5 ${
                          item.status === 'pending' ? 'text-light-700' : 'text-light-900'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <textarea
                      value={notes[item.id] || ''}
                      onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                      placeholder="Add notes..."
                      className="w-full bg-dark-800 border border-dark-600 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      rows={3}
                    />
                  </div>

                  {item.status === 'failed' && !notes[item.id] && (
                    <div className="mt-2 flex items-center text-warning-500 text-sm">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span>Please add notes for failed items</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AuditChecklist;