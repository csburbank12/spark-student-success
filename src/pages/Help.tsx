
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, BookOpen, MessageCircle, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground mt-2">
            Find resources and get assistance when you need it
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Documentation
            </CardTitle>
            <CardDescription>Browse our comprehensive guides</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Find detailed guides and answers to common questions in our documentation.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Connect with our support team for real-time assistance during business hours.
            </p>
            <Button className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Support
            </CardTitle>
            <CardDescription>Send us a message</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">
              Email our support team for non-urgent questions or technical issues.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="mailto:support@schoolconnect.edu">
                support@schoolconnect.edu
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">How do I update my profile information?</h3>
            <p className="text-sm text-muted-foreground">
              Go to Settings {'>'}  Profile and edit your information. Don&apos;t forget to save your changes.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Can I change my password?</h3>
            <p className="text-sm text-muted-foreground">
              Yes. Go to Settings {'>'}  Security to update your password.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Who can see my child&apos;s wellness data?</h3>
            <p className="text-sm text-muted-foreground">
              Only authorized staff and yourself. All access is logged and compliant with FERPA regulations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
