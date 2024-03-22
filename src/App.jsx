import React, { useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  MarkerType,
  Panel,
  Background,
} from "reactflow";
import { Tooltip } from "react-tooltip";
import InfoImageSvg from "./assets/info-circle.svg";
import PlusImageSvg from "./assets/plus.svg";
import CloseCircleImageSvg from "./assets/close-circle.svg";
import InputColor from "react-input-color";
import Ripples from "react-ripples";
import "reactflow/dist/base.css";
import CustomNode from "./CustomNode";
import { initNodes } from "./initialNodes";
import { initEdges } from "./initialEdges";
import axios from "axios";

const nodeTypes = {
  custom: CustomNode,
};

const Flow = () => {
  // OpenPopup UseState
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  //Nodes and Edges UseState
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  //Function to Conncet Edges
  const onConnect = useCallback((params) => {
    const edge = {
      ...params,
      type: "smoothstep",
      style: { stroke: "black" },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "black",
      },
    };
    setEdges((eds) => addEdge(edge, eds));
  }, []);

  // Input Values to Add Node UseState
  const [nodeName, setNodeName] = useState("");
  const [nodeDetailedDescription, setNodeDetailedDescription] = useState("");
  const [bgColor, setBgColor] = React.useState({});
  const [nodeDetailedImage, setNodeDetailedImage] = useState(null);

  // Upload File in Cloudinary and Get URL
  const uploadFile = async() => {
    const data = new FormData();
    data.append("file",nodeDetailedImage);
    data.append("upload_preset",'sample-lizmotors-preset');
    try{
      let cloudName =   import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const res = await axios.post(api, data);
      const {secure_url} = res.data;
      console.log(secure_url);
      return secure_url;
    }catch(err){
      console.log(err);
    }
  }

  // Function to Add Node
  const handleInputNodeSubmit = async (event) => {
    event.preventDefault();
    try {
      const imgUrl = await uploadFile();
    
    const newNode = {
      id: Date.now().toString(),
      type: "custom",
      data: {
        name: nodeName,
        bgcolor: bgColor.hex,
        hovercontent: nodeDetailedDescription,
        hoverimage: imgUrl,
      },
      sourcePosition: "right",
      targetPosition: "left",
      position: { x: 1000, y: 0 },
    };
    setNodes((prevElements) => [...prevElements, newNode]);
    setIsOpenPopup(false);
    setNodeName("");
    setNodeDetailedDescription("");
    setNodeDetailedImage(null);
  } catch (err) {
    console.log(err);
  }
  };

  // Function to Cancel Add Node
  const handleCancel = () => {
    setIsOpenPopup(false);
    setNodeName("");
    setNodeDetailedDescription("");
    console.log("hello");
  };

  return (
    <div className="w-[100vw] h-[100vh]">
      {isOpenPopup && (
        <div className="absolute w-[100vw] h-[100vh] bg-black/25 z-50 flex">
          <div className="h-min w-[95vw] md:w-min relative my-auto mx-auto bg-white rounded-xl">
            <h3 className="text-3xl font-bold py-5 px-5 md:px-10">Add Node</h3>
            <hr />
            <form className="" onSubmit={handleInputNodeSubmit}>
              <div className="py-5 px-2 md:px-10 flex flex-col gap-5">
                <div className="flex gap-3">
                  <label className="text-base md:text-lg font-medium">
                    Node Name<span className="text-primary-color">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name for Node"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    className="w-44 md:w-96 lg:w-72 xl:w-96 h-9 pl-2 rounded-lg border-transparent focus:border-transparent focus:outline-primary-color shadow-inner bg-zinc-100 focus:bg-white"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <label className="text-base md:text-lg font-medium">
                    Detailed
                    <br />
                    Description<span className="text-primary-color">*</span>
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols={30}
                    rows={5}
                    value={nodeDetailedDescription}
                    onChange={(e) => setNodeDetailedDescription(e.target.value)}
                    placeholder="Enter the Detailed Description"
                    className="w-44 md:w-96 lg:w-72 xl:w-96 rounded-lg pl-2 pt-1 border-transparent  focus:outline-primary-color shadow-inner bg-zinc-100 focus:bg-white"
                    required
                  ></textarea>
                </div>
                <div className="flex gap-5 items-center">
                  <label className="text-lg font-medium">
                    Background
                    <br /> Color<span className="text-primary-color">*</span>
                  </label>
                  <InputColor
                    initialValue="#FD853A"
                    onChange={setBgColor}
                    placement="right"
                  />
                </div>
                <div className="flex gap-3">
                  <label className="text-lg font-medium">Detail Image</label>
                  <input
                    type="file"
                    placeholder="Enter Name of the Node"
                    accept="image/*"
                    onChange={(e) =>
                      setNodeDetailedImage((prev) => e.target.files[0])
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="pt-2 pb-5 flex gap-5 justify-center">
                <Ripples className="rounded-full">
                  <button
                    className="py-3 px-8 border-2 border-primary-color text-white rounded-full bg-primary-color text-lg font-bold"
                    type="submit"
                    on
                  >
                    Save
                  </button>
                </Ripples>
                <Ripples className="rounded-full">
                  <button
                    className="py-3 px-8 border-2 border-primary-color text-primary-color rounded-full bg-white text-lg font-bold"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </Ripples>
              </div>
            </form>
            <div
              className="absolute top-3 right-3 cursor-pointer"
              onClick={() => handleCancel()}
            >
              <img
                src={CloseCircleImageSvg}
                className="w-10"
                alt="close-button"
              />
            </div>
          </div>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel
          position="top-left"
          className="p-1 md:p-2 lg:p-3 bg-[#d0ff28] rounded-full cursor-pointer"
          data-tooltip-id="instruction-tooltip"
        >
          <img src={InfoImageSvg} className="md:w-7 lg:w-10" />
        </Panel>
        <Tooltip
          id="instruction-tooltip"
          html="<ul><li>Hover the nodes to see detailed information.</li><li>Drag the right or left side edges of each<br/>nodes to connect the nodes.</li><li>Click '+' icon to add new nodes.</li></ul>"
          className="z-50"
        />
        <Panel
          position="top-center"
          className="bg-[#d0ff28] text-base  text-center md:text-lg lg:text-2xl font-semibold rounded-md kiwi-maru md:px-6 md:py-3 lg:px-10 lg:py-5 cursor-pointer"
          data-tooltip-id="lizmotors-tooltip"
        >
          Lizmotors Assignment
        </Panel>
        <Tooltip
          id="lizmotors-tooltip"
          html="Thanks for Considering my Application<br/> and I'm Grateful for the Opportunity"
          className="z-50"
        />
        <Panel
          position="top-right"
          className="p-1 md:p-2 lg:p-3 bg-[#d0ff28] rounded-full cursor-pointer"
          data-tooltip-id="addnode-tooltip"
          onClick={() => setIsOpenPopup(true)}
        >
          <img src={PlusImageSvg} className="md:w-7 lg:w-10" />
        </Panel>
        <Tooltip
          id="addnode-tooltip"
          html="Click to add new node"
          className="z-50"
        />
        <Background color="#ccc" variant={"cross"} />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
