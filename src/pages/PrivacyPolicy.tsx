
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Privacy Policy</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FERPA Compliance Statement</CardTitle>
          <CardDescription>
            Last Updated: {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h3 className="text-lg font-medium">1. Introduction</h3>
            <p className="text-muted-foreground mt-2">
              ThriveTrackED is committed to protecting the privacy of student educational records
              in accordance with the Family Educational Rights and Privacy Act (FERPA). This policy
              outlines how we collect, use, maintain, and disclose information from education records.
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">2. Data We Collect</h3>
            <p className="text-muted-foreground mt-2">
              We collect and maintain the following types of student information:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>Personal identifiers (name, ID number, date of birth)</li>
              <li>Contact information</li>
              <li>Academic records</li>
              <li>Behavioral assessments</li>
              <li>Mental health and wellness data</li>
              <li>Intervention records</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">3. How We Use Data</h3>
            <p className="text-muted-foreground mt-2">
              Student data is used solely for legitimate educational purposes including:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>Providing educational services</li>
              <li>Supporting student mental health and wellness</li>
              <li>Analyzing patterns for educational interventions</li>
              <li>Communicating with parents/guardians</li>
              <li>Fulfilling administrative functions</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">4. Access Rights</h3>
            <p className="text-muted-foreground mt-2">
              In accordance with FERPA, parents/guardians and eligible students (18+) have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>Inspect and review educational records</li>
              <li>Request amendments to records they believe are inaccurate</li>
              <li>Consent to disclosures of personally identifiable information</li>
              <li>File a complaint with the Department of Education regarding alleged failures to comply with FERPA</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">5. Data Security</h3>
            <p className="text-muted-foreground mt-2">
              We implement a variety of security measures to maintain the safety of student information:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>End-to-end encryption for data in transit and at rest</li>
              <li>Multi-factor authentication</li>
              <li>Regular security audits</li>
              <li>Role-based access controls</li>
              <li>Secure data backup and recovery</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">6. Third-Party Disclosure</h3>
            <p className="text-muted-foreground mt-2">
              We do not disclose personally identifiable information to third parties except:
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground">
              <li>With parental/eligible student consent</li>
              <li>To school officials with legitimate educational interests</li>
              <li>To officials of another school where the student transfers</li>
              <li>In connection with financial aid applications</li>
              <li>As required by court order or subpoena</li>
              <li>In health and safety emergencies</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">7. Data Retention</h3>
            <p className="text-muted-foreground mt-2">
              Student records are retained according to state and federal requirements.
              After the retention period expires, records are securely disposed of.
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-medium">8. Contact Information</h3>
            <p className="text-muted-foreground mt-2">
              For questions or concerns about this privacy policy or to request access to records, please contact:
            </p>
            <p className="text-muted-foreground">
              Privacy Officer<br />
              Email: privacy@thriveracked.edu<br />
              Phone: (555) 123-4567
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
