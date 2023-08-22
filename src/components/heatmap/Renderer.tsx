import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { StoreContext } from "../../store.context";
import { IHeatmapItem, IStatus } from "../../types";

import * as d3 from "d3";
import { InteractionData } from "./Heatmap";
import UpdateStatusModal from "../UpdateStatusModal";
import { Timestamp } from "firebase/firestore";

const MARGIN = { top: 20, right: 0, bottom: 60, left: 120 };
const clickedItemInitialState = {
  id: "",
  x: "",
  y: "",
  value: { statusTitle: "", statusValue: 0 },
  createdAt: Timestamp.now(),
};

type RendererProps = {
  width: number;
  height: number;
  data: IHeatmapItem[];
  setHoveredCell: (hoveredCell: InteractionData | null) => void;
};

const RendererView = ({
  width,
  height,
  data,
  setHoveredCell,
}: RendererProps) => {
  const [statusColors, setStatusColors] = useState<string[]>([]);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [clickedItemData, setClieckedItemdata] = useState<IHeatmapItem>(
    clickedItemInitialState
  );

  const myStore = useContext(StoreContext);
  const { salesStatus } = myStore.heatmapStore.getHeatmapStoreState_method();

  useEffect(() => {
    setStatusColors(() => salesStatus.map((status: IStatus) => status.color));
    setThresholds(() => salesStatus.map((status: IStatus) => status.value));
  }, [salesStatus]);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setClieckedItemdata(clickedItemInitialState);
  };

  const gap = 50;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(gap / boundsWidth);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(gap / boundsHeight);
  }, [allYGroups, boundsHeight]);

  const colorScale = d3
    .scaleLinear<string>()
    .domain(thresholds)
    .range(statusColors);

  // Build the rectangles
  const allShapes = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value.statusValue === null || !x || !y) {
      return;
    }

    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        opacity={1}
        fill={String(colorScale(d.value.statusValue))}
        rx={10}
        stroke={"white"}
        onMouseEnter={() => {
          setHoveredCell({
            xLabel: d.x,
            yLabel: d.y,
            xPos: x + xScale.bandwidth(),
            yPos: y + 50,
            value: d.value.statusTitle,
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        onClick={() => {
          setClieckedItemdata({
            id: d.id,
            x: d.x,
            y: d.y,
            value: d.value,
            createdAt: d.createdAt,
          });
          handleOpen();
        }}
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
        key={i}
        x={x + xScale.bandwidth() / 2 - 20}
        y={boundsHeight + 20}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(-45, ${x + xScale.bandwidth() / 2}, ${
          boundsHeight + 5
        })`}
        fontSize={10}
        style={{
          textTransform: "uppercase",
          fill: "black",
          fontWeight: "lighter",
        }}
      >
        {/* {"name pakistan abc".split(" ")[0]} */}
        {name}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const y = yScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={i}
        x={-10}
        y={y + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
        style={{
          textTransform: "uppercase",
          fill: "black",
          fontWeight: "lighter",
        }}
      >
        {name}
      </text>
    );
  });

  return (
    <>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {allShapes}
          {xLabels}
          {yLabels}
        </g>
      </svg>
      <UpdateStatusModal
        openModal={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        clickedItemData={clickedItemData}
        salesStatus={salesStatus}
        dataSet={data}
      />
    </>
  );
};

export const Renderer = observer(RendererView);
