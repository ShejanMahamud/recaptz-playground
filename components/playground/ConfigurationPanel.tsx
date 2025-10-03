import { Settings, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaptchaConfig } from "@/lib/types/captcha";
import { PresetSelector } from "./PresetSelector";
import { BasicSettings, BooleanOptions } from "./BasicSettings";
import { SliderSettings } from "./SliderSettings";
import { MathSettings } from "./MathSettings";
import { PatternSettings } from "./PatternSettings";
import { AdvancedSettings } from "./AdvancedSettings";
import { ValidationSettings } from "./ValidationSettings";

interface ConfigurationPanelProps {
  config: CaptchaConfig;
  hasChanges: boolean;
  onUpdate: (key: string, value: any) => void;
  onApplyChanges: () => void;
  onPresetSelect: (presetKey: string) => void;
}

export function ConfigurationPanel({
  config,
  hasChanges,
  onUpdate,
  onApplyChanges,
  onPresetSelect,
}: ConfigurationPanelProps) {
  const isStandardType = config.type !== "slider" && config.type !== "math" && config.type !== "pattern";
  const showValidationTab = isStandardType;

  return (
    <Card className="md:col-span-1 xl:col-span-1 xl:sticky xl:top-4 order-2 xl:order-1">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5" />
          Configuration
        </CardTitle>
        <CardDescription>Customize your CAPTCHA settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 lg:space-y-6">
        <ScrollArea className="h-[400px] lg:h-[600px] pr-4">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList
              className={`grid w-full ${
                showValidationTab ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              <TabsTrigger value="basic" className="text-xs sm:text-sm">
                Basic
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs sm:text-sm">
                Advanced
              </TabsTrigger>
              {showValidationTab && (
                <TabsTrigger value="validation" className="text-xs sm:text-sm">
                  Rules
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="basic" className="space-y-4 lg:space-y-6">
              <PresetSelector onPresetSelect={onPresetSelect} />
              <Separator />
              <BasicSettings config={config} onUpdate={onUpdate} />
              
              {config.type === "slider" && (
                <>
                  <Separator />
                  <SliderSettings config={config} onUpdate={onUpdate} />
                </>
              )}

              {config.type === "math" && (
                <>
                  <Separator />
                  <MathSettings config={config} onUpdate={onUpdate} />
                </>
              )}

              {config.type === "pattern" && (
                <>
                  <Separator />
                  <PatternSettings config={config} onUpdate={onUpdate} />
                </>
              )}

              <Separator />
              <BooleanOptions config={config} onUpdate={onUpdate} />
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <AdvancedSettings config={config} onUpdate={onUpdate} />
            </TabsContent>

            {showValidationTab && (
              <TabsContent value="validation" className="space-y-6">
                <ValidationSettings config={config} onUpdate={onUpdate} />
              </TabsContent>
            )}
          </Tabs>
        </ScrollArea>

        <Separator />

        <Button
          onClick={onApplyChanges}
          disabled={!hasChanges}
          className="w-full"
          size="lg"
        >
          {hasChanges ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Apply Changes
            </>
          ) : (
            "No Changes to Apply"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
