import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CaptchaConfig } from "@/lib/types/captcha";

interface AdvancedSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function AdvancedSettings({ config, onUpdate }: AdvancedSettingsProps) {
  const isStandardType = config.type !== "slider" && config.type !== "math" && config.type !== "pattern";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="className">CSS Class Name</Label>
        <Input
          id="className"
          value={config.className}
          onChange={(e) => onUpdate("className", e.target.value)}
          placeholder="e.g., my-custom-captcha"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customStyles">Custom Styles (CSS)</Label>
        <Textarea
          id="customStyles"
          value={config.customStyles}
          onChange={(e) => onUpdate("customStyles", e.target.value)}
          placeholder="e.g., backgroundColor: '#f0f0f0', borderRadius: '8px'"
          rows={3}
        />
      </div>

      {isStandardType && (
        <div className="space-y-2">
          <Label htmlFor="inputButtonStyle">Input Button Style</Label>
          <Input
            id="inputButtonStyle"
            value={config.inputButtonStyle}
            onChange={(e) => onUpdate("inputButtonStyle", e.target.value)}
            placeholder="e.g., btn-primary custom-input"
          />
        </div>
      )}

      {config.showConfetti && (
        <>
          <Separator />
          <div className="space-y-4">
            <Label className="text-sm font-medium">Confetti Options</Label>

            <div className="space-y-2">
              <Label>Particle Count: {config.confettiParticles}</Label>
              <Slider
                value={[config.confettiParticles]}
                onValueChange={([value]) => onUpdate("confettiParticles", value)}
                min={50}
                max={500}
                step={25}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confettiColors">
                Colors (comma-separated hex)
              </Label>
              <Input
                id="confettiColors"
                value={config.confettiColors}
                onChange={(e) => onUpdate("confettiColors", e.target.value)}
                placeholder="#ff0000,#00ff00,#0000ff"
              />
            </div>

            <div className="space-y-2">
              <Label>Duration: {config.confettiDuration}ms</Label>
              <Slider
                value={[config.confettiDuration]}
                onValueChange={([value]) => onUpdate("confettiDuration", value)}
                min={1000}
                max={10000}
                step={500}
                className="w-full"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
