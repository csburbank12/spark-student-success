
import React from "react";
import { Link } from "react-router-dom";
import SchoolImportPanel from "@/components/school-management/SchoolImportPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SchoolImportPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold">Import Schools</h2>
          <p className="text-muted-foreground">
            Bulk import schools from a CSV file
          </p>
        </div>
        <Link to="/admin/schools">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schools
          </Button>
        </Link>
      </div>

      <SchoolImportPanel />

      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-800">
        <h3 className="font-medium mb-2">CSV Format Requirements</h3>
        <p className="text-sm mb-2">
          Please ensure your CSV file follows these guidelines:
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Must include the following required columns: name, district</li>
          <li>Address fields should be separated as street, city, state, zip</li>
          <li>Use "true" or "false" for feature enablement fields</li>
          <li>
            School codes will be auto-generated if not provided in the CSV file
          </li>
          <li>Maximum 1000 schools per import</li>
        </ul>
      </div>
    </div>
  );
};

export default SchoolImportPage;
