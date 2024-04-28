import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nodes: [],
    selectedNode: null,
};

export const nodeSlice = createSlice({
    name: "nodes",
    initialState,
    reducers: {
        addNode: (state, action) => {
            state.nodes.push(action.payload);
        },
        addNodes: (state, action) => {
            state.nodes = action.payload;
        },
        updateNode: (state, action) => {
            const { nodeId, dataKey, dataValue } = action.payload;
            state.nodes.map(node => {
                if (node.id === nodeId) {
                    node.data[dataKey] = dataValue
                    state.selectedNode = node
                }
                return node
            })
        },
        selectNode: (state, action) => {
            state.selectedNode = state.nodes.find(({ id }) => id === action.payload);
        },
        removeSelectedNode: (state) => {
            state.selectedNode = null
        }
    },
});

export const { addNode, addNodes, updateNode, selectNode, removeSelectedNode } = nodeSlice.actions;
