import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import { selectNode } from "../../store/features/nodeSlice";

export default function MessageNode({ data }) {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.nodes.selectedNode);
  const { label, id } = data;
  const handleClick = useCallback(() => {
    dispatch(selectNode(id));
  }, [id]);
  const selected = selectedNode?.id === id;
  return (
    <>
      {/* Target Handler */}
      <Handle type="target" position={Position.Left} />
      {/* Custom Message Node as per https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75974f28-7e11-4222-b99f-83ae626dc6b8%2FText_node.jpeg?table=block&id=118525ef-afef-4cf8-b073-d813ce8493b2&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2*/}
      <div
        className={`flex flex-col w-full shadow-2xl rounded-lg ${
          selected && "border-2 border-blue-400"
        }`}
        onClick={handleClick}
      >
        <div className="w-full flex justify-between items-center bg-[#B2F0E3] p-2 rounded-t-lg gap-4 h-4">
          <span className="text-[8px] font-semibold">💬 Send Message</span>
          <img
            className="w-2"
            src="https://cdn.icon-icons.com/icons2/1476/PNG/512/whatsapp_101778.png"
            alt="WhatsApp Icon"
          />
        </div>
        <div className="p-2 text-[12px] bg-white rounded-b-lg">{label}</div>
      </div>
      {/* Source Handler */}
      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
}
