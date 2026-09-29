"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export function JudgeTourModal() {
  const router = useRouter();
  const {
    isJudgeTourOpen,
    judgeSceneIndex,
    judgeScenes,
    nextJudgeScene,
    prevJudgeScene,
    closeJudgeTour,
    jumpToJudgeScene,
  } = useApp();

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const currentScene = judgeScenes[judgeSceneIndex];

  // Navigate when scene changes
  useEffect(() => {
    if (isJudgeTourOpen && currentScene) {
      router.push(currentScene.route);
    }
  }, [judgeSceneIndex, isJudgeTourOpen, currentScene, router]);

  // 90-second total tour = ~9 seconds per scene in auto-play mode
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isJudgeTourOpen && isAutoPlaying) {
      timer = setTimeout(() => {
        if (judgeSceneIndex < judgeScenes.length - 1) {
          nextJudgeScene();
        } else {
          setIsAutoPlaying(false);
        }
      }, 9000);
    }
    return () => clearTimeout(timer);
  }, [isJudgeTourOpen, isAutoPlaying, judgeSceneIndex, judgeScenes.length, nextJudgeScene]);

  if (!isJudgeTourOpen || !currentScene) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl">
      <div className="bg-slate-900/95 backdrop-blur-xl border-2 border-emerald-500/80 rounded-2xl shadow-2xl p-4 sm:p-5 text-white animate-in fade-in slide-in-from-bottom-6 duration-300">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
              {currentScene.sceneNumber}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {currentScene.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
                  {currentScene.badge}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors ${
                isAutoPlaying
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
              }`}
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="hidden sm:inline">{isAutoPlaying ? "Pause" : "Auto-Play"}</span>
            </button>

            <button
              onClick={closeJudgeTour}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Narration Body */}
        <div className="py-3 space-y-2.5">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentScene.narration}
          </p>

          {/* Presenter / Judge Insight Box */}
          <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-2.5 sm:p-3 flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300 block mb-0.5">Judge Takeaway:</span>
              <p className="text-slate-300">{currentScene.judgeInsight}</p>
            </div>
          </div>
        </div>

        {/* Scene Action Button (if any) */}
        {currentScene.actionLabel && currentScene.onAction && (
          <div className="pb-3 flex justify-center">
            <button
              onClick={currentScene.onAction}
              className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentScene.actionLabel}</span>
            </button>
          </div>
        )}

        {/* Navigation Controls & Step Dots */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <button
            onClick={prevJudgeScene}
            disabled={judgeSceneIndex === 0}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              judgeSceneIndex === 0
                ? "text-slate-600 cursor-not-allowed"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Scene Dots */}
          <div className="flex items-center gap-1.5">
            {judgeScenes.map((s, idx) => (
              <button
                key={s.sceneNumber}
                onClick={() => jumpToJudgeScene(idx)}
                title={`Scene ${s.sceneNumber}: ${s.title}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === judgeSceneIndex
                    ? "w-6 bg-emerald-400"
                    : idx < judgeSceneIndex
                    ? "bg-emerald-700"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              if (judgeSceneIndex < judgeScenes.length - 1) {
                nextJudgeScene();
              } else {
                closeJudgeTour();
              }
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>{judgeSceneIndex === judgeScenes.length - 1 ? "Finish Tour" : "Next Scene"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
