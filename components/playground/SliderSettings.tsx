import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CaptchaConfig } from "@/lib/types/captcha";

interface SliderSettingsProps {
  config: CaptchaConfig;
  onUpdate: (key: string, value: any) => void;
}

export function SliderSettings({ config, onUpdate }: SliderSettingsProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Slider Configuration</Label>

      <div className="space-y-2">
        <Label>Width: {config.sliderWidth}px</Label>
        <Slider
          value={[config.sliderWidth]}
          onValueChange={([value]) => onUpdate("sliderWidth", value)}
          min={200}
          max={600}
          step={10}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Height: {config.sliderHeight}px</Label>
        <Slider
          value={[config.sliderHeight]}
          onValueChange={([value]) => onUpdate("sliderHeight", value)}
          min={120}
          max={400}
          step={10}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Piece Size: {config.sliderPieceSize}px</Label>
        <Slider
          value={[config.sliderPieceSize]}
          onValueChange={([value]) => onUpdate("sliderPieceSize", value)}
          min={20}
          max={80}
          step={2}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Tolerance: {config.sliderTolerance}px</Label>
        <Slider
          value={[config.sliderTolerance]}
          onValueChange={([value]) => onUpdate("sliderTolerance", value)}
          min={5}
          max={30}
          step={1}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sliderBackgroundImage">Background Image URL</Label>
        <Input
          id="sliderBackgroundImage"
          value={config.sliderBackgroundImage}
          onChange={(e) => onUpdate("sliderBackgroundImage", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sliderBackgroundImages">
          Background Images (comma-separated URLs)
        </Label>
        <Input
          id="sliderBackgroundImages"
          value={config.sliderBackgroundImages}
          onChange={(e) => onUpdate("sliderBackgroundImages", e.target.value)}
          placeholder="https://img1.jpg,https://img2.jpg,https://img3.jpg"
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="sliderEnableShadow" className="text-sm font-normal">
          Enable Shadow
        </Label>
        <Switch
          id="sliderEnableShadow"
          checked={config.sliderEnableShadow}
          onCheckedChange={(checked) => onUpdate("sliderEnableShadow", checked)}
        />
      </div>
    </div>
  );
}
