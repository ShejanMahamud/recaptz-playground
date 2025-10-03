import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PRESETS } from "@/lib/constants/captcha";

interface PresetSelectorProps {
  onPresetSelect: (presetKey: string) => void;
}

export function PresetSelector({ onPresetSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Quick Presets</Label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {Object.entries(PRESETS).map(([key, preset]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => onPresetSelect(key)}
            className="h-auto p-2 sm:p-3 text-xs"
            title={preset.description}
          >
            {key}
          </Button>
        ))}
      </div>
    </div>
  );
}
