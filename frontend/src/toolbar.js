// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
    return (
        <div style={{ padding: "10px" }}>
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    flexDirection: "column",
                }}
            >
                <DraggableNode type="customInput" label="Input" />
                <DraggableNode type="llm" label="LLM" />
                <DraggableNode type="customOutput" label="Output" />
                <DraggableNode type="text" label="Text" />
                <DraggableNode type="filter" label="Filter" />
                <DraggableNode type="api" label="API" />
                <DraggableNode type="transform" label="Transform" />
                <DraggableNode type="database" label="Database" />
                <DraggableNode type="conditional" label="Conditional" />
                <DraggableNode type="email" label="Email" />
                <DraggableNode type="webhook" label="Webhook" />
                <DraggableNode type="analytics" label="Analytics" />
                <DraggableNode type="notification" label="Notification" />
                <DraggableNode type="scheduler" label="Scheduler" />
            </div>
        </div>
    );
};
