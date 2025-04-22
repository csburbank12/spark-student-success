
import React from "react";
import { FileText, Video, Presentation, Link as LinkIcon } from "lucide-react";

export const getChallengeColor = (targetArea: string) => {
  switch (targetArea) {
    case "emotional":
      return "bg-rose-100 text-rose-800";
    case "academic":
      return "bg-blue-100 text-blue-800";
    case "social":
      return "bg-amber-100 text-amber-800";
    case "behavioral":
      return "bg-violet-100 text-violet-800";
    case "attendance":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getResourceIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return React.createElement(FileText, { className: "h-4 w-4" });
    case "video":
      return React.createElement(Video, { className: "h-4 w-4" });
    case "slides":
      return React.createElement(Presentation, { className: "h-4 w-4" });
    case "link":
      return React.createElement(LinkIcon, { className: "h-4 w-4" });
    default:
      return React.createElement(FileText, { className: "h-4 w-4" });
  }
};
