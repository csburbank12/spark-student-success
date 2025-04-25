import React from "react";
import { type SelLesson } from "@/components/sel-pathways/types";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  lesson: SelLesson;
}

const SELLessonDetail: React.FC<Props> = ({ lesson }) => {
  return (
    <div className="space-y-6">
      <PageHeader title={lesson.title} />
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
