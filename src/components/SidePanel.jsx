import { useSelector } from "react-redux";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";

// based on if a node is clicked, either show side panel or corresponding settings panel
export default function SidePanel() {
  const selectedNode = useSelector((state) => state.nodes.selectedNode);
  const showSettingsPanel = Boolean(selectedNode?.id);

  return showSettingsPanel ? <SettingsPanel /> : <NodesPanel />;
}
