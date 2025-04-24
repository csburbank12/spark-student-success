import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Share2, Heart, Activity, BookOpen, Download, Eye, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock resource data
const resourcesData = [
  {
    id: "r1",
    title: "WellLens Predictive Support Guide",
    description: "How to interpret and act on WellLens predictive insights",
    type: "guide",
    author: "Admin Team",
    tags: ["wellLens", "predictive", "support"],
    sharedWith: ["All Staff"],
    createdAt: "2025-04-15",
    downloads: 42
  },
  {
    id: "r2",
    title: "Student Emotional Support Protocol",
    description: "Guidelines for supporting students based on emotional data",
    type: "protocol",
    author: "School Counselor",
    tags: ["emotional", "support", "protocol"],
    sharedWith: ["Teachers", "Counselors"],
    createdAt: "2025-04-10",
    downloads: 28
  },
  {
    id: "r3",
    title: "Parent's Guide to WellLens Reports",
    description: "How to interpret and use WellLens reports for your child",
    type: "guide",
    author: "Parent Liaison",
    tags: ["parents", "reports", "wellLens"],
    sharedWith: ["Parents"],
    createdAt: "2025-04-05",
    downloads: 56
  },
  {
    id: "r4",
    title: "Emotion-Aware Scheduling Templates",
    description: "Ready-to-use templates for emotion-aware scheduling",
    type: "template",
    author: "Teaching Staff",
    tags: ["scheduling", "templates", "emotion"],
    sharedWith: ["All Staff"],
    createdAt: "2025-04-01",
    downloads: 35
  }
];

const SharedResources = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  // Filter resources based on search query and type
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === "all" || resource.type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Shared Resources</h2>
        <div className="flex items-center gap-2">
          <Link to="/welllens">
            <Button variant="outline" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span>WellLens</span>
            </Button>
          </Link>
          <Link to="/profiles">
            <Button className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span>My Profiles</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Integration explainer card */}
      <Card className="bg-primary/5">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Universal Resource Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Access and share WellLens resources across different user profiles
                </p>
              </div>
            </div>
            <div className="md:ml-auto text-sm">
              <span className="font-medium">Current profile:</span> {user?.name} ({user?.role})
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="guide">Guides</SelectItem>
              <SelectItem value="protocol">Protocols</SelectItem>
              <SelectItem value="template">Templates</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="wellLens">WellLens</TabsTrigger>
          <TabsTrigger value="emotional">Emotional Support</TabsTrigger>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources.map(resource => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">By: {resource.author}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      <span>{resource.downloads}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-xs text-muted-foreground">
                    Shared with: {resource.sharedWith.join(", ")}
                  </div>
                  <Button size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Other tab contents would be similar but filtered */}
        <TabsContent value="wellLens">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources
              .filter(r => r.tags.includes('wellLens'))
              .map(resource => (
                <Card key={resource.id}>
                  {/* Same card structure as above */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">By: {resource.author}</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      Shared with: {resource.sharedWith.join(", ")}
                    </div>
                    <Button size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </CardFooter>
                </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Placeholder for other tabs */}
        <TabsContent value="emotional">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredResources
              .filter(r => r.tags.includes('emotional') || r.tags.includes('support'))
              .map(resource => (
                <Card key={resource.id}>
                  {/* Same card structure as above */}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">By: {resource.author}</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span>{resource.downloads}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-xs text-muted-foreground">
                      Shared with: {resource.sharedWith.join(", ")}
                    </div>
                    <Button size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </CardFooter>
                </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="flex flex-col items-center justify-center h-40 text-center p-4">
            <BookOpen className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium">No Favorites Yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Click the heart icon on any resource to add it to your favorites
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SharedResources;
