import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaptchaConfig } from "@/lib/types/captcha";
import { PATTERN_TYPES, PATTERN_SHAPES } from "@/lib/constants/captcha";

interface PatternSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function PatternSettings({ config, onUpdate }: PatternSettingsProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Pattern Configuration</Label>

      <div className="space-y-2">
        <Label htmlFor="patternDifficulty">Difficulty</Label>
        <Select
          value={config.patternDifficulty}
          onValueChange={(value) => onUpdate("patternDifficulty", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy (4 items)</SelectItem>
            <SelectItem value="medium">Medium (6 items)</SelectItem>
            <SelectItem value="hard">Hard (9 items)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patternGridSize">Grid Size</Label>
        <Select
          value={config.patternGridSize.toString()}
          onValueChange={(value) =>
            onUpdate("patternGridSize", parseInt(value))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 items (2×2)</SelectItem>
            <SelectItem value="6">6 items (2×3)</SelectItem>
            <SelectItem value="9">9 items (3×3)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Pattern Types</Label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERN_TYPES.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={key}
                checked={config.patternTypes.includes(key)}
                onChange={(e) => {
                  const types = e.target.checked
                    ? [...config.patternTypes, key]
                    : config.patternTypes.filter((type) => type !== key);
                  onUpdate("patternTypes", types);
                }}
                className="rounded"
              />
              <Label htmlFor={key} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Available Shapes</Label>
        <div className="grid grid-cols-2 gap-2">
          {PATTERN_SHAPES.map(({ key, label }) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={key}
                checked={config.patternShapes.includes(key)}
                onChange={(e) => {
                  const shapes = e.target.checked
                    ? [...config.patternShapes, key]
                    : config.patternShapes.filter((shape) => shape !== key);
                  onUpdate("patternShapes", shapes);
                }}
                className="rounded"
              />
              <Label htmlFor={key} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="patternColors">
          Colors (comma-separated hex codes)
        </Label>
        <Input
          id="patternColors"
          value={config.patternColors.join(",")}
          onChange={(e) =>
            onUpdate(
              "patternColors",
              e.target.value
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            )
          }
          placeholder="#3b82f6,#ef4444,#10b981,#f59e0b"
        />
      </div>
    </div>
  );
}
