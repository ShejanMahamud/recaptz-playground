import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CaptchaConfig } from "@/lib/types/captcha";

interface ValidationSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function ValidationSettings({ config, onUpdate }: ValidationSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validationMinLength">Min Length</Label>
          <Input
            id="validationMinLength"
            type="number"
            min="0"
            max="20"
            value={config.validationMinLength}
            onChange={(e) =>
              onUpdate("validationMinLength", parseInt(e.target.value) || 0)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="validationMaxLength">Max Length</Label>
          <Input
            id="validationMaxLength"
            type="number"
            min="0"
            max="20"
            value={config.validationMaxLength}
            onChange={(e) =>
              onUpdate("validationMaxLength", parseInt(e.target.value) || 0)
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="validationAllowedChars">Allowed Characters</Label>
        <Input
          id="validationAllowedChars"
          value={config.validationAllowedChars}
          onChange={(e) => onUpdate("validationAllowedChars", e.target.value)}
          placeholder="e.g., ABCDEF123456"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="validationCustom">
          Custom Validator (JS Expression)
        </Label>
        <Textarea
          id="validationCustom"
          value={config.validationCustom}
          onChange={(e) => onUpdate("validationCustom", e.target.value)}
          placeholder="e.g., /^[A-Z]+$/.test(value) || 'Only uppercase letters'"
          rows={2}
        />
      </div>
    </div>
  );
}
