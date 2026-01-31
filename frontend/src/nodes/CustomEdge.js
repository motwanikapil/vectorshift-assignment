import { EdgeProps, getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={{
          strokeWidth: 2,
          fill: 'none',
        }}
        className="animated-edge"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <defs>
        <linearGradient id={`gradient-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <path
        id={id}
        style={{
          strokeWidth: 2,
          fill: 'none',
          stroke: `url(#gradient-${id})`,
        }}
        className="animated-edge"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: '12px',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            color: '#cbd5e1',
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {data?.label || ''}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;