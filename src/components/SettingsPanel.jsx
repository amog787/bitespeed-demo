import { useDispatch, useSelector } from "react-redux";
import { removeSelectedNode, updateNode } from "../store/features/nodeSlice";

// Settings panel to update message node text
export default function SettingsPanel() {
  const selectedNode = useSelector((state) => state.nodes.selectedNode);
  const dispatch = useDispatch();

  const {
    type,
    data: { label },
    id,
  } = selectedNode;

  const handleChange = (e) => {
    dispatch(
      updateNode({
        nodeId: id,
        dataKey: e.target.name,
        dataValue: e.target.value,
      })
    );
  };

  return (
    <aside className="w-64 p-1 flex flex-col gap-2">
      <button
        className="flex w-full items-center hover:bg-gray-200"
        onClick={() => dispatch(removeSelectedNode())}
      >
        <img
          className="h-6 mix-blend-darken"
          src="https://w7.pngwing.com/pngs/825/110/png-transparent-computer-icons-arrow-symbol-icon-design-back-angle-text-triangle-thumbnail.png"
          alt="Back"
        />
        <span>Back</span>
      </button>
      <div className="flex flex-col">
        <label htmlFor="message-text" className="text-xs">
          Text
        </label>
        <textarea
          id="message-text"
          value={label}
          name="label"
          onChange={handleChange}
          className="border-2 border-gray-200"
        />
      </div>
    </aside>
  );
}
