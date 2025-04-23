
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  preview?: boolean;
  showValue?: boolean;
}

export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ className, label, preview = true, showValue = true, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="flex items-center gap-3">
          {preview && (
            <div 
              className="w-8 h-8 rounded-full border shadow-sm" 
              style={{backgroundColor: props.value?.toString() || '#000000'}}
            />
          )}
          <Input
            ref={ref}
            type="color"
            className="w-16 h-9 p-1"
            {...props}
          />
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {props.value?.toString()}
            </span>
          )}
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
