import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaptchaConfig } from "@/lib/types/captcha";
import { MATH_OPERATIONS } from "@/lib/constants/captcha";

interface MathSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function MathSettings({ config, onUpdate }: MathSettingsProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Math Configuration</Label>

      <div className="space-y-2">
        <Label htmlFor="mathDifficulty">Difficulty</Label>
        <Select
          value={config.mathDifficulty}
          onValueChange={(value) => onUpdate("mathDifficulty", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy (1-10, +/-)</SelectItem>
            <SelectItem value="medium">Medium (1-20, +/-/×)</SelectItem>
            <SelectItem value="hard">Hard (1-50, +/-/×/÷)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Operations</Label>
        <div className="grid grid-cols-2 gap-2">
          {MATH_OPERATIONS.map(({ key, symbol }) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={key}
                checked={config.mathOperations.includes(key)}
                onChange={(e) => {
                  const operations = e.target.checked
                    ? [...config.mathOperations, key]
                    : config.mathOperations.filter((op) => op !== key);
                  onUpdate("mathOperations", operations);
                }}
                className="rounded"
              />
              <Label htmlFor={key} className="text-sm">
                {symbol}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mathRangeMin">Min Value</Label>
          <Input
            id="mathRangeMin"
            type="number"
            min="1"
            max="100"
            value={config.mathRangeMin}
            onChange={(e) =>
              onUpdate("mathRangeMin", parseInt(e.target.value) || 1)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mathRangeMax">Max Value</Label>
          <Input
            id="mathRangeMax"
            type="number"
            min="1"
            max="100"
            value={config.mathRangeMax}
            onChange={(e) =>
              onUpdate("mathRangeMax", parseInt(e.target.value) || 20)
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="mathAllowDecimals" className="text-sm font-normal">
          Allow Decimal Results
        </Label>
        <Switch
          id="mathAllowDecimals"
          checked={config.mathAllowDecimals}
          onCheckedChange={(checked) => onUpdate("mathAllowDecimals", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="mathShowHint" className="text-sm font-normal">
          Show Hint Button
        </Label>
        <Switch
          id="mathShowHint"
          checked={config.mathShowHint}
          onCheckedChange={(checked) => onUpdate("mathShowHint", checked)}
        />
      </div>
    </div>
  );
}
