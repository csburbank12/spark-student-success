
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
    <div className="space-y-6">
      <div className="flex items-center">
        {onBack ? (
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        ) : (
          <Link to="/sel-pathways">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Pathways
            </Button>
          </Link>
        )}
        <h2 className="text-3xl font-heading font-bold">{lesson.title}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
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
