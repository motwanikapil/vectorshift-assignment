from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float] = {}
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Determines if the given nodes and edges form a directed acyclic graph (DAG).
    """
    # Create adjacency list representation of the graph
    graph = {node.id: [] for node in nodes}

    for edge in edges:
        if edge.source in graph and edge.target in graph:
            graph[edge.source].append(edge.target)

    # Detect cycles using DFS with recursion stack
    visited = set()
    rec_stack = set()

    def dfs(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)

        for neighbor in graph[node_id]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True  # Cycle detected

        rec_stack.remove(node_id)
        return False

    # Check for cycles starting from each unvisited node
    for node in nodes:
        if node.id not in visited:
            if dfs(node.id):
                return False  # Cycle detected

    return True  # No cycles found

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    # Parse the JSON payload
    data = await request.json()

    # Validate and parse nodes and edges
    pipeline_data = PipelineData(**data)

    # Calculate number of nodes and edges
    num_nodes = len(pipeline_data.nodes)
    num_edges = len(pipeline_data.edges)

    # Check if the graph is a DAG
    is_dag_result = is_dag(pipeline_data.nodes, pipeline_data.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
