import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaptchaConfig } from "@/lib/types/captcha";

interface BasicSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function BasicSettings({ config, onUpdate }: BasicSettingsProps) {
  const isStandardType = config.type !== "slider" && config.type !== "math" && config.type !== "pattern";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={config.type}
          onValueChange={(value) => onUpdate("type", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="numbers">Numbers</SelectItem>
            <SelectItem value="letters">Letters</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
            <SelectItem value="slider">Slider Puzzle</SelectItem>
            <SelectItem value="math">Math Challenge</SelectItem>
            <SelectItem value="pattern">Pattern Recognition</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isStandardType && (
        <>
          <div className="space-y-2">
            <Label>Length: {config.length}</Label>
            <Slider
              value={[config.length]}
              onValueChange={([value]) => onUpdate("length", value)}
              min={3}
              max={10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customCharacters">Custom Characters</Label>
            <Input
              id="customCharacters"
              value={config.customCharacters}
              onChange={(e) => onUpdate("customCharacters", e.target.value)}
              placeholder="e.g., ABCDEF123456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={config.language}
              onValueChange={(value) => onUpdate("language", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Max Attempts: {config.maxAttempts}</Label>
        <Slider
          value={[config.maxAttempts]}
          onValueChange={([value]) => onUpdate("maxAttempts", value)}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>
          Auto-refresh: {config.refreshInterval || "Off"}{" "}
          {config.refreshInterval > 0 && "sec"}
        </Label>
        <Slider
          value={[config.refreshInterval]}
          onValueChange={([value]) => onUpdate("refreshInterval", value)}
          min={0}
          max={60}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function BooleanOptions({ config, onUpdate }: BasicSettingsProps) {
  const isStandardType = config.type !== "slider" && config.type !== "math" && config.type !== "pattern";
  const isMathType = config.type === "math";
  const isSliderOrPattern = config.type === "slider" || config.type === "pattern";

  const options = [
    { key: "darkMode", label: "Dark Mode", show: true },
    ...(isStandardType
      ? [
          { key: "caseSensitive", label: "Case Sensitive", show: true },
          { key: "refreshable", label: "Refreshable", show: true },
          { key: "enableAudio", label: "Enable Audio", show: true },
          { key: "rtl", label: "Right-to-Left", show: true },
        ]
      : isMathType
      ? [{ key: "enableAudio", label: "Enable Audio", show: true }]
      : []),
    { key: "showSuccessAnimation", label: "Success Animation", show: true },
    { key: "showConfetti", label: "Show Confetti", show: true },
    ...(!isSliderOrPattern ? [{ key: "autoFocus", label: "Auto Focus", show: true }] : []),
    { key: "showEventLog", label: "Show Event Log", show: true },
  ];

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Options</Label>
      <div className="space-y-3">
        {options.map(({ key, label, show }) =>
          show ? (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key} className="text-sm font-normal">
                {label}
              </Label>
              <Switch
                id={key}
                checked={config[key as keyof CaptchaConfig] as boolean}
                onCheckedChange={(checked) => onUpdate(key, checked)}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
