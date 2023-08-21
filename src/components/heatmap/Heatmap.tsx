import { useRef, useState } from "react";
import { Renderer } from "./Renderer";
import { Tooltip } from "./Tooltip";
import { IHeatmapItem } from "../../types";

type HeatmapProps = {
  width: number;
  height: number;
  data: IHeatmapItem[];
};

export type InteractionData = {
  xLabel: string;
  yLabel: string;
  xPos: number;
  yPos: number;
  value: number | string;
};

export const Heatmap = ({ data }: HeatmapProps) => {
  const [hoveredCell, setHoveredCell] = useState<InteractionData | null>(null);
  const DivRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={DivRef}
      style={{
        position: "relative",
        width: "auto",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "rgba(0,0,0,.08)",
      }}
    >
      <Renderer
        width={1140}
        height={600}
        data={data}
        setHoveredCell={setHoveredCell}
      />
      <Tooltip interactionData={hoveredCell} width={1140} height={600} />
    </div>
  );
};
