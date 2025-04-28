
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Link, FilePlus, ExternalLink, Download, Search, FileText, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { toast } from "sonner";

const resourcesData = {
  "Crisis Intervention": [
    {
      title: "Crisis Response Protocol",
      type: "document",
      format: "PDF",
      tags: ["protocol", "emergency", "crisis"],
      dateAdded: "2023-09-05"
    },
    {
      title: "Mental Health First Aid Guide",
      type: "document",
      format: "PDF",
      tags: ["mental health", "first aid", "crisis"],
      dateAdded: "2023-08-15"
    },
    {
      title: "Local Crisis Support Resources",
      type: "link",
      url: "https://example.com/crisis-resources",
      tags: ["community", "crisis", "support"],
      dateAdded: "2023-09-21"
    }
  ],
  "College & Career": [
    {
      title: "College Application Timeline",
      type: "document",
      format: "Excel",
      tags: ["college", "planning", "deadlines"],
      dateAdded: "2023-07-12"
    },
    {
      title: "Financial Aid Workshops",
      type: "link",
      url: "https://example.com/financial-aid",
      tags: ["financial aid", "workshops", "college"],
      dateAdded: "2023-09-01"
    },
    {
      title: "Career Interest Assessment",
      type: "document",
      format: "PDF",
      tags: ["career", "assessment", "planning"],
      dateAdded: "2023-06-30"
    }
  ],
  "Social-Emotional Resources": [
    {
      title: "Mindfulness Exercises for Students",
      type: "document",
      format: "PDF",
      tags: ["mindfulness", "stress", "wellness"],
      dateAdded: "2023-08-22"
    },
    {
      title: "Anxiety Management Toolkit",
      type: "document",
      format: "PDF",
      tags: ["anxiety", "coping", "mental health"],
      dateAdded: "2023-09-15"
    },
    {
      title: "Peer Support Group Materials",
      type: "document",
      format: "PowerPoint",
      tags: ["peer support", "group", "facilitator"],
      dateAdded: "2023-07-28"
    }
  ],
  "Parent Resources": [
    {
      title: "Parent-Teacher Conference Guide",
      type: "document",
      format: "Word",
      tags: ["parent", "conference", "communication"],
      dateAdded: "2023-08-10"
    },
    {
      title: "Supporting Your Teen's Mental Health",
      type: "link",
      url: "https://example.com/parent-mental-health",
      tags: ["parent", "mental health", "support"],
      dateAdded: "2023-09-18"
    }
  ]
};

// Helper function to get icon based on resource type and format
const getResourceIcon = (type: string, format?: string) => {
  if (type === "link") return ExternalLink;
  
  switch (format?.toLowerCase()) {
    case "pdf": return FileText;
    case "word": return FileText;
    case "excel": return FileText;
    case "powerpoint": return FileText;
    default: return FileText;
  }
};

const CounselorResourcesCard: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}`);
  };
  
  const handleUpload = () => {
    toast.info("Resource upload dialog opened");
  };
  
  // Function to check if resource matches search query
  const matchesSearch = (resource: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.tags.some((tag: string) => tag.toLowerCase().includes(query))
    );
  };
  
  // Filter categories and resources based on search
  const filteredResources: Record<string, any[]> = {};
  Object.entries(resourcesData).forEach(([category, resources]) => {
    const matching = resources.filter(matchesSearch);
    if (matching.length > 0) {
      filteredResources[category] = matching;
    }
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Counseling Resources
            </CardTitle>
            <CardDescription>
              Access and manage resources for student support
            </CardDescription>
          </div>
          <Button onClick={handleUpload}>
            <FilePlus className="h-4 w-4 mr-2" />
            Upload Resource
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {Object.keys(filteredResources).length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No resources matching your search
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-2">
              {Object.entries(filteredResources).map(([category, resources]) => (
                <AccordionItem 
                  key={category} 
                  value={category}
                  className="border rounded-md px-1"
                >
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center">
                      {category === "Crisis Intervention" && <Heart className="h-4 w-4 mr-2 text-red-500" />}
                      {category === "College & Career" && <BookOpen className="h-4 w-4 mr-2 text-blue-500" />}
                      {category === "Social-Emotional Resources" && <Users className="h-4 w-4 mr-2 text-purple-500" />}
                      {category === "Parent Resources" && <Users className="h-4 w-4 mr-2 text-green-500" />}
                      {category}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 px-2 py-1">
                      {resources.map((resource, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-md border flex items-start justify-between"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`
                              p-2 rounded-md 
                              ${resource.type === "link" ? "bg-blue-100" : "bg-amber-100"}
                            `}>
                              {React.createElement(getResourceIcon(resource.type, resource.format), {
                                className: `h-5 w-5 ${resource.type === "link" ? "text-blue-600" : "text-amber-600"}`
                              })}
                            </div>
                            <div>
                              <div className="font-medium">{resource.title}</div>
                              <div className="text-sm text-muted-foreground">
                                Added {resource.dateAdded}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {resource.tags.map((tag: string, i: number) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            {resource.type === "document" ? (
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleDownload(resource.title)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="icon"
                                asChild
                              >
                                <a href={resource.url} target="_blank" rel="noreferrer">
                                  <Link className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Link className="h-5 w-5 mr-2" />
            External Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "National Crisis Text Line",
                description: "24/7 text support for those in crisis",
                link: "https://example.com/crisis-text-line"
              },
              {
                name: "College Board Resources",
                description: "SAT prep and college planning materials",
                link: "https://example.com/college-board"
              },
              {
                name: "District Counseling Portal",
                description: "Shared resources for district counselors",
                link: "https://example.com/district-portal"
              },
              {
                name: "Mental Health First Aid",
                description: "Training and certification resources",
                link: "https://example.com/mental-health"
              }
            ].map((resource, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-md border">
                <div className="flex-1">
                  <div className="font-medium">{resource.name}</div>
                  <div className="text-sm text-muted-foreground">{resource.description}</div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.link} target="_blank" rel="noreferrer">
                    Visit Site
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CounselorResourcesCard;
