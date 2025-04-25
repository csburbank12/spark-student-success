
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="container max-w-3xl py-8 px-4 md:px-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          
          <div className="prose max-w-none dark:prose-invert">
            <p>Last updated: April 25, 2025</p>
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to ThriveTrackED. By using our platform, you agree to these Terms of Service. 
              Please read them carefully.
            </p>
            
            <h2>2. Using Our Services</h2>
            <p>
              You must follow any policies made available to you within the Services.
              Don't misuse our Services. For example, don't interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
            </p>

            <h2>3. Privacy and Data Protection</h2>
            <p>
              Our privacy policy explains how we treat your personal data and protect your privacy when you use our Services. 
              By using our Services, you agree that ThriveTrackED can use such data in accordance with our privacy policies.
            </p>
            
            <h2>4. Educational Records and FERPA Compliance</h2>
            <p>
              ThriveTrackED complies with the Family Educational Rights and Privacy Act (FERPA) and similar state laws.
              We only collect, use, and share student information as permitted by these laws and our contracts with educational institutions.
            </p>
            
            <h2>5. User Accounts</h2>
            <p>
              You may need to create an account to use some of our Services. You are responsible for safeguarding your account.
            </p>
            
            <h2>6. Disclaimers</h2>
            <p>
              We provide our Services using a commercially reasonable level of skill and care. 
              Other than as expressly set out in these terms, ThriveTrackED doesn't make any specific promises about the Services.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@thivetracked.edu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
