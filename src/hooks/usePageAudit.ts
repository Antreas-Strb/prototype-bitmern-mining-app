import { useState } from 'react';

export interface AuditItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'pending' | 'passed' | 'failed';
  notes?: string;
}

export interface AuditCategory {
  id: string;
  name: string;
  items: AuditItem[];
}

export const defaultAuditChecklist: AuditCategory[] = [
  {
    id: 'structure',
    name: 'Page Structure',
    items: [
      {
        id: 'title-meta',
        category: 'structure',
        title: 'Page Title & Meta Description',
        description: 'Check page title and meta description for SEO optimization',
        status: 'pending'
      },
      {
        id: 'heading-hierarchy',
        category: 'structure',
        title: 'Heading Hierarchy',
        description: 'Verify all headings follow proper hierarchy (H1, H2, H3)',
        status: 'pending'
      },
      {
        id: 'breadcrumbs',
        category: 'structure',
        title: 'Navigation Breadcrumbs',
        description: 'Ensure navigation breadcrumbs are present and accurate',
        status: 'pending'
      },
      {
        id: 'layout-consistency',
        category: 'structure',
        title: 'Layout Consistency',
        description: 'Confirm page layout is consistent with brand guidelines',
        status: 'pending'
      }
    ]
  },
  {
    id: 'content',
    name: 'Content Quality',
    items: [
      {
        id: 'spelling-grammar',
        category: 'content',
        title: 'Spelling and Grammar',
        description: 'Review all text for spelling and grammar errors',
        status: 'pending'
      },
      {
        id: 'project-descriptions',
        category: 'content',
        title: 'Project Descriptions',
        description: 'Verify project descriptions are clear and complete',
        status: 'pending'
      },
      {
        id: 'dates-timelines',
        category: 'content',
        title: 'Dates and Timelines',
        description: 'Check that all dates and timelines are current',
        status: 'pending'
      },
      {
        id: 'data-accuracy',
        category: 'content',
        title: 'Data Accuracy',
        description: 'Ensure all statistics and data points are accurate',
        status: 'pending'
      },
      {
        id: 'links-references',
        category: 'content',
        title: 'Links and References',
        description: 'Validate all links and references',
        status: 'pending'
      }
    ]
  },
  {
    id: 'visual',
    name: 'Visual Elements',
    items: [
      {
        id: 'image-optimization',
        category: 'visual',
        title: 'Image Optimization',
        description: 'Optimize all images with alt text and proper sizing',
        status: 'pending'
      },
      {
        id: 'graphics-quality',
        category: 'visual',
        title: 'Graphics Quality',
        description: 'Check that all graphics are high-resolution',
        status: 'pending'
      },
      {
        id: 'image-captions',
        category: 'visual',
        title: 'Image Captions',
        description: 'Verify image captions are accurate',
        status: 'pending'
      },
      {
        id: 'visual-hierarchy',
        category: 'visual',
        title: 'Visual Hierarchy',
        description: 'Ensure visual hierarchy guides users effectively',
        status: 'pending'
      },
      {
        id: 'icons-logos',
        category: 'visual',
        title: 'Icons and Logos',
        description: 'Confirm all icons and logos are current versions',
        status: 'pending'
      }
    ]
  },
  {
    id: 'technical',
    name: 'Technical Requirements',
    items: [
      {
        id: 'loading-speed',
        category: 'technical',
        title: 'Page Loading Speed',
        description: 'Test page loading speed',
        status: 'pending'
      },
      {
        id: 'mobile-responsive',
        category: 'technical',
        title: 'Mobile Responsiveness',
        description: 'Verify mobile responsiveness',
        status: 'pending'
      },
      {
        id: 'interactive-elements',
        category: 'technical',
        title: 'Interactive Elements',
        description: 'Check all interactive elements function properly',
        status: 'pending'
      },
      {
        id: 'form-submissions',
        category: 'technical',
        title: 'Form Submissions',
        description: 'Validate form submissions if applicable',
        status: 'pending'
      },
      {
        id: 'browser-compatibility',
        category: 'technical',
        title: 'Browser Compatibility',
        description: 'Test cross-browser compatibility',
        status: 'pending'
      }
    ]
  },
  {
    id: 'ux',
    name: 'User Experience',
    items: [
      {
        id: 'cta-buttons',
        category: 'ux',
        title: 'Call-to-Action Buttons',
        description: 'Verify call-to-action buttons are prominent',
        status: 'pending'
      },
      {
        id: 'contact-info',
        category: 'ux',
        title: 'Contact Information',
        description: 'Check that contact information is easily accessible',
        status: 'pending'
      },
      {
        id: 'status-indicators',
        category: 'ux',
        title: 'Status Indicators',
        description: 'Ensure project status indicators are clear',
        status: 'pending'
      },
      {
        id: 'downloadable-resources',
        category: 'ux',
        title: 'Downloadable Resources',
        description: 'Test all downloadable resources',
        status: 'pending'
      },
      {
        id: 'social-sharing',
        category: 'ux',
        title: 'Social Sharing',
        description: 'Verify social sharing functionality',
        status: 'pending'
      }
    ]
  },
  {
    id: 'documentation',
    name: 'Documentation',
    items: [
      {
        id: 'changelog',
        category: 'documentation',
        title: 'Project Changelog',
        description: 'Update project changelog',
        status: 'pending'
      },
      {
        id: 'major-changes',
        category: 'documentation',
        title: 'Major Changes',
        description: 'Record any major changes made',
        status: 'pending'
      },
      {
        id: 'outstanding-issues',
        category: 'documentation',
        title: 'Outstanding Issues',
        description: 'Document any outstanding issues',
        status: 'pending'
      },
      {
        id: 'future-improvements',
        category: 'documentation',
        title: 'Future Improvements',
        description: 'Note areas for future improvement',
        status: 'pending'
      },
      {
        id: 'backup',
        category: 'documentation',
        title: 'Page Backup',
        description: 'Create backup of original pages',
        status: 'pending'
      }
    ]
  },
  {
    id: 'final',
    name: 'Final Review',
    items: [
      {
        id: 'page-preview',
        category: 'final',
        title: 'Full Page Preview',
        description: 'Conduct full page preview',
        status: 'pending'
      },
      {
        id: 'stakeholder-approval',
        category: 'final',
        title: 'Stakeholder Approval',
        description: 'Get stakeholder approval',
        status: 'pending'
      },
      {
        id: 'staging-test',
        category: 'final',
        title: 'Staging Environment',
        description: 'Test all updates in staging environment',
        status: 'pending'
      },
      {
        id: 'publication-date',
        category: 'final',
        title: 'Publication Date',
        description: 'Schedule publication date',
        status: 'pending'
      },
      {
        id: 'maintenance-checks',
        category: 'final',
        title: 'Maintenance Checks',
        description: 'Plan for regular maintenance checks',
        status: 'pending'
      }
    ]
  }
];

export function usePageAudit() {
  const [checklist, setChecklist] = useState<AuditCategory[]>(defaultAuditChecklist);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const updateItemStatus = (itemId: string, status: 'pending' | 'passed' | 'failed') => {
    setChecklist(prevChecklist => 
      prevChecklist.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId ? { ...item, status } : item
        )
      }))
    );
  };

  const updateItemNotes = (itemId: string, note: string) => {
    setNotes(prevNotes => ({
      ...prevNotes,
      [itemId]: note
    }));
  };

  const getProgress = () => {
    let total = 0;
    let completed = 0;

    checklist.forEach(category => {
      category.items.forEach(item => {
        total++;
        if (item.status === 'passed' || item.status === 'failed') {
          completed++;
        }
      });
    });

    return {
      total,
      completed,
      percentage: Math.round((completed / total) * 100)
    };
  };

  const exportAuditReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      progress: getProgress(),
      categories: checklist.map(category => ({
        name: category.name,
        items: category.items.map(item => ({
          title: item.title,
          status: item.status,
          notes: notes[item.id] || ''
        }))
      }))
    };

    return report;
  };

  return {
    checklist,
    notes,
    updateItemStatus,
    updateItemNotes,
    getProgress,
    exportAuditReport
  };
}