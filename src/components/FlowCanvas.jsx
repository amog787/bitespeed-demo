import { useState, useCallback, useMemo, useRef } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import MessageNode from "./nodes/MessageNode";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addNode, addNodes } from "../store/features/nodeSlice";
import SidePanel from "./SidePanel";
import Topbar from "./Topbar";

// random id generator for new message node dropped
const getId = () => `dndnode_${uuid()}`;

const initialEdges = [];

// custom nodes defined here (Message Node for now)
const nodeTypes = { messageNode: MessageNode };

function Flow() {
  // Using reduxtoolkit to manage node state and update data
  const nodes = useSelector((state) => state.nodes.nodes);
  const reactFlowWrapper = useRef(null);
  const dispatch = useDispatch();
  // update redux store with new or modified nodes
  const setNodes = (node, all = false) => {
    if (all) {
      dispatch(addNodes(node));
      return;
    }
    dispatch(addNode(node));
  };
  const [edges, setEdges] = useState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [error, setError] = useState(false);

  // function to validate and save flow (Shows an error if there are more than one Nodes and more than one Node has empty target handles)
  const handleSave = () => {
    const allNodes = nodes.map(({ id }) => id);
    const { sourceSet, targetSet } = edges.reduce(
      (acc, edge) => {
        return {
          sourceSet: acc.sourceSet.add(edge.source),
          targetSet: acc.targetSet.add(edge.target),
        };
      },
      {
        sourceSet: new Set(),
        targetSet: new Set(),
      }
    );
    const nodesLength = nodes.length;
    if (nodesLength < 2) {
      alert("Saved Successfully");
      return;
    }
    const connected = allNodes.filter((node) => {
      return !sourceSet.has(node) && !targetSet.has(node);
    });
    if (connected.length > 0) {
      setError(true);
      return;
    }
    setError(false);
    alert("Saved Successfully");
  };

  const onNodesChange = (changes) =>
    setNodes(applyNodeChanges(changes, nodes), true);
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const id = getId();
      const newNode = {
        id,
        type,
        position,
        data: { label: "Click to edit message", id },
      };

      setNodes(newNode);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      {/* Top nav to show error if it exists, and button to save the flow */}
      <Topbar showError={error} onSave={handleSave} />
      <div className="flex h-full" ref={reactFlowWrapper}>
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <SidePanel />
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
