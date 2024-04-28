// List of all custom nodes that can be dragged and dropped info the flow area
const nodes = [
  {
    id: "msg",
    name: "Message",
    type: "messageNode",
    icon: "💬",
  },
];

// Component to render the NodesPanel with the dragable widgets
export default function NodesPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 p-1 flex flex-wrap">
      {nodes.map(({ name, type, icon, id }) => (
        <div
          key={id}
          className="flex flex-col text-2xl items-center w-28 h-24 border-2 border-gray-400 rounded-md p-2 cursor-pointer"
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          <p>{icon}</p>
          <p>{name}</p>
        </div>
      ))}
    </aside>
  );
}
