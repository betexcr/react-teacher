import type { SystemDesignProblem } from './types';
import infiniteScroll from './content/infinite-scroll.md?raw';
import formBuilder from './content/form-builder.md?raw';
import stateStore from './content/state-store.md?raw';
import chatApplication from './content/chat-application.md?raw';
import authSystem from './content/auth-system.md?raw';
import googleDocsClone from './content/google-docs-clone.md?raw';
import videoPlayer from './content/video-player.md?raw';
import kanbanBoard from './content/kanban-board.md?raw';
import autocompleteSearch from './content/autocomplete-search.md?raw';
import dataTable from './content/data-table.md?raw';
import fileUpload from './content/file-upload.md?raw';
import analyticsDashboard from './content/analytics-dashboard.md?raw';

export const systemDesignProblems: SystemDesignProblem[] = [
  {
    slug: 'infinite-scroll',
    title: 'Twitter Feed',
    subtitle: 'Infinite Scroll Feed',
    pageTitle: 'High-Performance Infinite Scroll Feed',
    content: infiniteScroll,
  },
  {
    slug: 'form-builder',
    title: 'Form Builder',
    subtitle: 'Dynamic Form Generation and Validation',
    pageTitle: 'Dynamic Form Generation and Validation',
    content: formBuilder,
  },
  {
    slug: 'state-store',
    title: 'State Store',
    subtitle: 'Custom State Management Implementation',
    pageTitle: 'Custom State Management Implementation',
    content: stateStore,
  },
  {
    slug: 'chat-application',
    title: 'Chat Application',
    subtitle: 'WebSocket-based Chat App',
    pageTitle: 'WebSocket-based Chat Application',
    content: chatApplication,
  },
  {
    slug: 'auth-system',
    title: 'Auth System',
    subtitle: 'Role-based Authentication System',
    pageTitle: 'Role-based Authentication System',
    content: authSystem,
  },
  {
    slug: 'google-docs-clone',
    title: 'Google Docs Clone',
    subtitle: 'Real-time Collaboration Editor',
    pageTitle: 'Real-time Collaboration Editor',
    content: googleDocsClone,
  },
  {
    slug: 'video-player',
    title: 'Video Player',
    subtitle: 'Custom Video Player',
    pageTitle: 'Custom Video Player',
    content: videoPlayer,
  },
  {
    slug: 'kanban-board',
    title: 'Kanban Board',
    subtitle: 'Complex Drag-and-Drop Interactions',
    pageTitle: 'Complex Drag-and-Drop Kanban Board',
    content: kanbanBoard,
  },
  {
    slug: 'autocomplete-search',
    title: 'Search Autocomplete',
    subtitle: 'Debounced API, keyboard navigation, caching',
    pageTitle: 'Search Autocomplete (Typeahead)',
    content: autocompleteSearch,
  },
  {
    slug: 'data-table',
    title: 'Admin Data Table',
    subtitle: 'Sort, filter, pagination, bulk actions',
    pageTitle: 'Admin Data Table',
    content: dataTable,
  },
  {
    slug: 'file-upload',
    title: 'File Upload',
    subtitle: 'Chunked upload, progress, presigned URLs',
    pageTitle: 'File Upload Pipeline',
    content: fileUpload,
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    subtitle: 'Widgets, time ranges, lazy chart loading',
    pageTitle: 'Analytics Dashboard',
    content: analyticsDashboard,
  },
];

export function getProblemBySlug(slug: string): SystemDesignProblem | undefined {
  return systemDesignProblems.find((p) => p.slug === slug);
}
