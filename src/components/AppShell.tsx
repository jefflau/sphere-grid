"use client";

import { useEffect, useState } from "react";
import {
  DomainTabs,
  HowToRead,
  MapChrome,
  NodeSheet,
  StatusCards,
  TopBar,
} from "@/components/hud/Hud";
import { GridFallback } from "@/components/sphere/GridFallback";
import { SphereCanvas } from "@/components/sphere/SphereCanvas";
import { isNamed, useGrid, useGridDerived } from "@/lib/grid/store";

export function AppShell() {
  const selected = useGrid((s) => s.selected);
  const { graph } = useGridDerived();
  const [canvasOn, setCanvasOn] = useState(false);
  const named =
    selected != null &&
    graph.nodes.some((n) => n.id === selected && isNamed(n.kind));

  useEffect(() => {
    const t = window.setTimeout(() => setCanvasOn(true), 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") useGrid.getState().select(null);
      if (e.key === "Enter" || e.key === " ") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
        if (e.key === " ") e.preventDefault();
        useGrid.getState().learn();
      }
      if (e.key === "1") useGrid.getState().setDomain("method");
      if (e.key === "2") useGrid.getState().setDomain("ml");
      if (e.key === "3") useGrid.getState().setDomain("physics");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="sphere-stage relative h-dvh overflow-hidden bg-void text-paper">
      <div className="absolute inset-0 z-0">
        <GridFallback />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: canvasOn ? 1 : 0 }}
        >
          <SphereCanvas onReady={() => setCanvasOn(true)} />
        </div>
        <div className="film-grain" />
        <div className="stage-vignette" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-30">
        <TopBar />
        <DomainTabs />
        <MapChrome />
        {named ? (
          <div className="pointer-events-auto absolute inset-x-3 bottom-[7.5rem] z-40 max-h-[42%] overflow-auto sm:inset-x-auto sm:left-5 sm:bottom-28 sm:max-w-[26rem]">
            <NodeSheet />
          </div>
        ) : (
          <HowToRead />
        )}
        <StatusCards />
      </div>
    </div>
  );
}
