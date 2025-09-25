import React, { useState } from 'react';
import { Book, FileText, Video, HelpCircle, Search, ChevronRight, ExternalLink, BookOpen, GraduationCap, PenTool as Tool, AlertCircle, ArrowRight, Clock, Play } from 'lucide-react';

const InfoCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for resources
  const quickGuides = [
    {
      title: 'Getting Started with Mining',
      description: 'Learn the basics of Bitcoin mining and how to set up your first miner.',
      category: 'Beginner',
      readTime: '5 min',
      type: 'guide'
    },
    {
      title: 'Optimizing Mining Efficiency',
      description: 'Advanced techniques to improve your mining operation\'s efficiency.',
      category: 'Advanced',
      readTime: '8 min',
      type: 'guide'
    },
    {
      title: 'Mining Pool Selection',
      description: 'How to choose the right mining pool for your needs.',
      category: 'Intermediate',
      readTime: '6 min',
      type: 'guide'
    },
    {
      title: 'Hardware Maintenance',
      description: 'Best practices for maintaining your mining hardware.',
      category: 'Intermediate',
      readTime: '7 min',
      type: 'guide'
    }
  ];

  const tutorials = [
    {
      title: 'Platform Overview',
      description: 'A complete walkthrough of the MiningVerse platform features.',
      duration: '10:25',
      type: 'video'
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep dive into mining analytics and reporting.',
      duration: '15:40',
      type: 'video'
    },
    {
      title: 'Troubleshooting Guide',
      description: 'Common issues and how to resolve them.',
      duration: '12:15',
      type: 'video'
    }
  ];

  const documentation = [
    {
      title: 'API Documentation',
      description: 'Complete API reference for developers.',
      lastUpdated: '2 days ago',
      category: 'Technical'
    },
    {
      title: 'Security Best Practices',
      description: 'Guidelines for securing your mining operation.',
      lastUpdated: '1 week ago',
      category: 'Security'
    },
    {
      title: 'Hardware Compatibility',
      description: 'List of supported mining hardware and specifications.',
      lastUpdated: '3 days ago',
      category: 'Hardware'
    }
  ];

  const faqs = [
    {
      question: 'How do I connect my first miner?',
      answer: 'Follow our step-by-step guide to connect your mining hardware to the platform...',
      category: 'Getting Started'
    },
    {
      question: 'What are the recommended pool settings?',
      answer: 'The optimal pool settings depend on your specific hardware and mining goals...',
      category: 'Configuration'
    },
    {
      question: 'How is profitability calculated?',
      answer: 'Our profitability calculations take into account multiple factors including...',
      category: 'Analytics'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Information Center</h1>
        <button className="btn btn-primary">
          Contact Support
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-900 w-5 h-5" />
        <input
          type="text"
          placeholder="Search guides, tutorials, and documentation..."
          className="input pl-12 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-primary-500/20 rounded-lg mr-4">
              <Book className="w-6 h-6 text-primary-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Guides</h3>
              <p className="text-sm text-light-700">Step-by-step tutorials</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-secondary-500/20 rounded-lg mr-4">
              <Video className="w-6 h-6 text-secondary-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Video Tutorials</h3>
              <p className="text-sm text-light-700">Watch and learn</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-accent-500/20 rounded-lg mr-4">
              <FileText className="w-6 h-6 text-accent-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">Documentation</h3>
              <p className="text-sm text-light-700">Technical references</p>
            </div>
          </div>
        </button>

        <button className="card hover:bg-dark-700/50 transition-colors">
          <div className="flex items-center">
            <div className="p-3 bg-warning-500/20 rounded-lg mr-4">
              <HelpCircle className="w-6 h-6 text-warning-500" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">FAQs</h3>
              <p className="text-sm text-light-700">Common questions</p>
            </div>
          </div>
        </button>
      </div>

      {/* Quick Start Guides */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BookOpen className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-lg font-semibold">Quick Start Guides</h2>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickGuides.map((guide, index) => (
            <div key={index} className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium">{guide.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  guide.category === 'Beginner' 
                    ? 'bg-success-500/20 text-success-500'
                    : guide.category === 'Intermediate'
                      ? 'bg-warning-500/20 text-warning-500'
                      : 'bg-error-500/20 text-error-500'
                }`}>
                  {guide.category}
                </span>
              </div>
              <p className="text-sm text-light-700 mb-3">{guide.description}</p>
              <div className="flex items-center text-sm text-light-900">
                <Clock className="w-4 h-4 mr-1" />
                {guide.readTime} read
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <GraduationCap className="w-6 h-6 text-secondary-400 mr-2" />
            <h2 className="text-lg font-semibold">Video Tutorials</h2>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            View Library <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <div key={index} className="group relative">
              <div className="aspect-video bg-dark-700 rounded-lg overflow-hidden">
                <img 
                  src={`https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark-900/60 group-hover:bg-dark-900/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="font-medium mt-3">{tutorial.title}</h3>
              <p className="text-sm text-light-700 mt-1">{tutorial.description}</p>
              <p className="text-xs text-light-900 mt-2">{tutorial.duration}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Tool className="w-6 h-6 text-accent-400 mr-2" />
            <h2 className="text-lg font-semibold">Technical Documentation</h2>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            Browse Docs <ExternalLink className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="space-y-4">
          {documentation.map((doc, index) => (
            <div key={index} className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-light-700 mt-1">{doc.description}</p>
                </div>
                <span className="px-2 py-1 rounded text-xs bg-dark-800 text-light-700">
                  {doc.category}
                </span>
              </div>
              <p className="text-xs text-light-900 mt-2">Last updated: {doc.lastUpdated}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-warning-500 mr-2" />
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm flex items-center">
            View All FAQs <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-dark-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{faq.question}</h3>
                <span className="px-2 py-1 rounded text-xs bg-dark-800 text-light-700">
                  {faq.category}
                </span>
              </div>
              <p className="text-sm text-light-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCenterPage;