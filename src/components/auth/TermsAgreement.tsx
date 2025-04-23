
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAgreementProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export const TermsAgreement = ({ checked, onCheckedChange, id = "terms" }: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I understand and agree to the confidentiality terms
      </label>
    </div>
  );
};
