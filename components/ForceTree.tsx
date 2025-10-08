"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type TreeNode = {
  name: string;
  children?: TreeNode[];
};

type NodeDatum = d3.HierarchyNode<TreeNode> & d3.SimulationNodeDatum;

export default function ForceTree() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const container = ref.current!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const data: TreeNode = {
      name: "Company",
      children: [
        {
          name: "Engineering",
          children: [
            {
              name: "Frontend",
              children: [
                { name: "React" },
                { name: "Next.js" },
                { name: "TailwindCSS" },
              ],
            },
            {
              name: "Backend",
              children: [
                { name: "Node.js" },
                { name: "Express" },
                { name: "MongoDB" },
              ],
            },
          ],
        },
        { name: "Design", children: [{ name: "UI/UX" }, { name: "Figma" }] },
      ],
    };

    const root = d3.hierarchy<TreeNode>(data);
    const nodes: NodeDatum[] = root.descendants();
    const links: d3.HierarchyLink<TreeNode>[] = root.links();

    const svg = d3
      .select(container)
      .attr("width", "100%")
      .attr("height", "100%")
      .style(
        "background",
        document.documentElement.classList.contains("dark")
          ? "#111827"
          : "#f9fafb"
      );

    const defs = svg.append("defs");
    const g = svg.append("g");

    // Radial gradients for nodes
    nodes.forEach((d, i) => {
      const grad = defs
        .append("radialGradient")
        .attr("id", `grad-${i}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      grad.append("stop").attr("offset", "0%").attr("stop-color", "#fff");
      grad
        .append("stop")
        .attr("offset", "100%")
        .attr(
          "stop-color",
          d.depth === 0 ? "#4f46e5" : d.depth === 1 ? "#6366f1" : "#818cf8"
        );
    });

    const simulation = d3
      .forceSimulation<NodeDatum>(nodes)
      .force(
        "link",
        d3
          .forceLink<NodeDatum, d3.HierarchyLink<TreeNode>>(links)
          .id((d) => d.data.name)
          .distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide<NodeDatum>(
          (d) => 20 + (d.children ? d.children.length * 5 : 0)
        )
      );

    const link = g
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 2)
      .attr(
        "stroke",
        document.documentElement.classList.contains("dark") ? "#9ca3af" : "#999"
      );

    const node = g
      .append("g")
      .selectAll<SVGCircleElement, NodeDatum>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => 15 + (d.children ? d.children.length * 5 : 0))
      .attr("fill", (_, i) => `url(#grad-${i})`)
      .call(
        d3
          .drag<SVGCircleElement, NodeDatum, unknown>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    const label = g
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.data.name)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("font-size", 12)
      .attr("font-weight", (d) => (d.depth === 1 ? "bold" : "normal"))
      .attr("fill", "#000");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("display", "none")
      .style("padding", "6px")
      .style(
        "background",
        document.documentElement.classList.contains("dark")
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.7)"
      )
      .style(
        "color",
        document.documentElement.classList.contains("dark") ? "#f3f4f6" : "#fff"
      )
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("font-size", "12px");

    node
      .on("mouseover", (event, d) => {
        tooltip.style("display", "block").text(d.data.name);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", () => {
        tooltip.style("display", "none");
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x!)
        .attr("y1", (d) => d.source.y!)
        .attr("x2", (d) => d.target.x!)
        .attr("y2", (d) => d.target.y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
      label.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    });

    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains("dark");
      svg.style("background", isDark ? "#111827" : "#f9fafb");
      link.attr("stroke", isDark ? "#9ca3af" : "#999");
      label.attr("fill", "#000");
      tooltip
        .style(
          "background",
          isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.7)"
        )
        .style("color", isDark ? "#f3f4f6" : "#fff");
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      simulation.stop();
      svg.selectAll("*").remove();
      tooltip.remove();
      observer.disconnect();
    };
  }, []);

  return <svg ref={ref} style={{ width: "100%", height: "100vh" }} />;
}
