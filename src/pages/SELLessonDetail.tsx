import React from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  lesson: SelLesson;
  onBack?: () => void;
}

const SELLessonDetail: React.FC<Props> = ({ lesson, onBack }) => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        {onBack && (
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{lesson.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-bold">Description</h4>
            <p>{lesson.description || "No description available."}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold">Competency Area</h4>
            <p>{lesson.competency_area || "Not specified"}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold">Estimated Duration</h4>
            <p>{lesson.estimated_duration || "Not specified"} minutes</p>
          </div>

          {lesson.content_url && (
            <div className="space-y-2">
              <h4 className="text-sm font-bold">Content URL</h4>
              <a
                href={lesson.content_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Content
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SELLessonDetail;
