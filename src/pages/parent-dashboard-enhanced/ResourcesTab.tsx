
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ResourcesTab = () => (
  <>
    <Card>
      <CardHeader>
        <CardTitle>Family Resources</CardTitle>
        <CardDescription>Tools and resources to support your child</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Emotional Well-being</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Resources to support your child's emotional health
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" size="sm" className="h-auto py-2">
                Conversation Guides
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Mood Activities
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Crisis Support
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Wellness Apps
              </Button>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Academic Support</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Tools to help your child succeed academically
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" size="sm" className="h-auto py-2">
                Homework Help
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Study Skills
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Online Tutoring
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Learning Apps
              </Button>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">School Community</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Ways to get involved in your child's school
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" size="sm" className="h-auto py-2">
                Volunteer Opportunities
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                School Events
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Parent Groups
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                School Contacts
              </Button>
            </div>
          </div>
          <div className="p-4 border rounded-md">
            <h3 className="font-medium">Family Activities</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Fun ways to support learning at home
            </p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button variant="outline" size="sm" className="h-auto py-2">
                Weekend Projects
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Educational Games
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Reading Lists
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-2">
                Local Activities
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Upcoming Webinars & Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 border rounded-md">
            <div className="flex justify-between">
              <h3 className="font-medium">Supporting Teen Mental Health</h3>
              <Badge>Virtual</Badge>
            </div>
            <p className="text-sm mt-1">
              Learn strategies to support your teen's emotional well-being during challenging times.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Thursday, May 12 • 7:00-8:30 PM
            </p>
            <Button size="sm" className="mt-2">Register</Button>
          </div>
          <div className="p-3 border rounded-md">
            <div className="flex justify-between">
              <h3 className="font-medium">Helping with Math Homework</h3>
              <Badge>In-Person</Badge>
            </div>
            <p className="text-sm mt-1">
              Tips and strategies for parents to help with middle and high school math.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Tuesday, May 17 • 6:00-7:30 PM • School Library
            </p>
            <Button size="sm" className="mt-2">Register</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);

export default ResourcesTab;
