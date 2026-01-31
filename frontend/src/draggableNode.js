// draggableNode.js

import { MousePointer2, Database, Zap, Code, MessageSquare, Filter as FilterIcon, Settings, Mail, Bell, Activity, Clock } from 'lucide-react';

// Mapping node types to icons
const nodeIcons = {
  customInput: MousePointer2,
  customOutput: MousePointer2,
  text: MessageSquare,
  llm: Zap,
  api: Code,
  database: Database,
  filter: FilterIcon,
  transform: Settings,
  conditional: Settings,
  email: Mail,
  webhook: Zap,
  analytics: Activity,
  notification: Bell,
  scheduler: Clock,
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const IconComponent = nodeIcons[type] || MousePointer2;

    return (
      <div
        className="flex items-center gap-2 p-3 bg-dark-800/50 hover:bg-dark-700/70 border border-dark-600/50 rounded-xl cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-blue-500/30 hover:shadow-md"
        onDragStart={(event) => onDragStart(event, type)}
        draggable
      >
        <IconComponent className="w-4 h-4 text-blue-400" />
        <span className="text-sm text-gray-200">{label}</span>
      </div>
    );
  };
  