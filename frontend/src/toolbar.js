// toolbar.js

import { DraggableNode } from "./draggableNode";
import { Search, Filter, Settings } from 'lucide-react';

export const PipelineToolbar = () => {
    return (
        <div className="h-full w-64 bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-4 shadow-lg">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">Node Library</span>
                </h2>

                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        className="w-full bg-dark-800 text-white rounded-xl py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>

            <div className="space-y-6">
                {/* Input/Output Nodes */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Filter className="w-3 h-3" />
                        Data Flow
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <DraggableNode type="customInput" label="Input" />
                        <DraggableNode type="customOutput" label="Output" />
                        <DraggableNode type="text" label="Text" />
                    </div>
                </div>

                {/* Processing Nodes */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Settings className="w-3 h-3" />
                        Processing
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <DraggableNode type="llm" label="LLM" />
                        <DraggableNode type="filter" label="Filter" />
                        <DraggableNode type="transform" label="Transform" />
                        <DraggableNode type="conditional" label="Conditional" />
                    </div>
                </div>

                {/* Integration Nodes */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2v20M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" />
                        </svg>
                        Integrations
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <DraggableNode type="api" label="API" />
                        <DraggableNode type="webhook" label="Webhook" />
                        <DraggableNode type="database" label="Database" />
                    </div>
                </div>

                {/* Utility Nodes */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v4l2 2" />
                        </svg>
                        Utilities
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <DraggableNode type="email" label="Email" />
                        <DraggableNode type="notification" label="Notification" />
                        <DraggableNode type="analytics" label="Analytics" />
                        <DraggableNode type="scheduler" label="Scheduler" />
                    </div>
                </div>
            </div>
        </div>
    );
};
