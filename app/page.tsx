"use client";

import {
  Accessibility,
  Activity,
  Code,
  Copy,
  Eye,
  Github,
  Globe,
  Package,
  RefreshCw,
  RotateCcw,
  Settings,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Captcha } from "recaptz";
// shadcn/ui imports
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Interactive Playground Component
function CaptchaPlayground() {
  const [config, setConfig] = useState({
    type: "mixed" as "numbers" | "letters" | "mixed" | "slider",
    length: 6,
    darkMode: false,
    caseSensitive: false,
    refreshable: true,
    enableAudio: true,
    showSuccessAnimation: true,
    showConfetti: false,
    autoFocus: false,
    maxAttempts: 3,
    refreshInterval: 0,
    customCharacters: "",
    language: "english",
    rtl: false,
    // Advanced features
    className: "",
    customStyles: "",
    inputButtonStyle: "",
    // Validation rules
    validationRequired: true,
    validationMinLength: 0,
    validationMaxLength: 0,
    validationAllowedChars: "",
    validationCustom: "",
    // Confetti options
    confettiParticles: 100,
    confettiColors: "#ff0000,#00ff00,#0000ff",
    confettiDuration: 3000,
    // Event tracking
    showEventLog: false,
    // Slider CAPTCHA specific options
    sliderWidth: 320,
    sliderHeight: 180,
    sliderPieceSize: 42,
    sliderTolerance: 12,
    sliderEnableShadow: true,
    sliderBackgroundImage: "",
    sliderBackgroundImages: "",
  });

  const [appliedConfig, setAppliedConfig] = useState(config);
  const [isValid, setIsValid] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const addToEventLog = (event: string) => {
    if (config.showEventLog) {
      setEventLog((prev) => [
        ...prev.slice(-4),
        `${new Date().toLocaleTimeString()}: ${event}`,
      ]);
    }
  };

  const presets = {
    login: {
      type: "numbers" as const,
      length: 4,
      darkMode: false,
      refreshable: true,
      enableAudio: false,
      description: "Simple 4-digit code for login forms",
    },
    registration: {
      type: "mixed" as const,
      length: 6,
      caseSensitive: true,
      enableAudio: true,
      showSuccessAnimation: true,
      description: "Secure mixed CAPTCHA for registration",
    },
    comment: {
      type: "letters" as const,
      length: 5,
      caseSensitive: false,
      refreshable: true,
      description: "User-friendly CAPTCHA for comments",
    },
    secure: {
      type: "mixed" as const,
      length: 8,
      caseSensitive: true,
      maxAttempts: 2,
      enableAudio: true,
      description: "High-security CAPTCHA with strict validation",
    },
    slider: {
      type: "slider" as const,
      sliderWidth: 320,
      sliderHeight: 180,
      sliderPieceSize: 42,
      sliderTolerance: 12,
      sliderEnableShadow: true,
      showSuccessAnimation: true,
      showConfetti: true,
      maxAttempts: 3,
      description: "Interactive slider puzzle CAPTCHA",
    },
  };

  const languages = {
    english: { refreshText: "🔄 Refresh", audioText: "🔊 Audio" },
    german: { refreshText: "🔄 Aktualisieren", audioText: "🔊 Audio" },
    spanish: { refreshText: "🔄 Actualizar", audioText: "🔊 Audio" },
  };

  const updateConfig = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const applyChanges = () => {
    setAppliedConfig(config);
    setHasChanges(false);
    setIsValid(false);
    setEventLog([]);
    addToEventLog("Configuration applied");
  };

  const resetChanges = () => {
    setConfig(appliedConfig);
    setHasChanges(false);
  };

  const applyPreset = (presetKey: keyof typeof presets) => {
    const preset = presets[presetKey];
    const newConfig = { ...config, ...preset };
    setConfig(newConfig);
    setHasChanges(true);
    addToEventLog(`Applied preset: ${presetKey}`);
  };

  const generateCodeSnippet = () => {
    const props = Object.entries(appliedConfig)
      .filter(([key, value]) => {
        if (key === "showEventLog") return false;
        if (typeof value === "boolean" && !value) return false;
        if (typeof value === "number" && value === 0) return false;
        if (typeof value === "string" && value === "") return false;
        if (key === "type" && value === "mixed") return false;
        if (key === "length" && value === 6) return false;
        if (key === "maxAttempts" && value === 3) return false;
        if (key === "language" && value === "english") return false;
        if (key === "confettiParticles" && value === 100) return false;
        if (key === "confettiColors" && value === "#ff0000,#00ff00,#0000ff")
          return false;
        if (key === "confettiDuration" && value === 3000) return false;
        // Filter out slider-specific properties as they'll be handled separately
        if (key.startsWith("slider")) return false;
        return true;
      })
      .map(([key, value]) => {
        if (key === "confettiColors") {
          const colors = (value as string)
            .split(",")
            .map((c: string) => `"${c.trim()}"`);
          return `  confettiOptions={{ colors: [${colors.join(", ")}] }}`;
        }
        if (key.startsWith("confetti")) {
          const optionName = key.replace("confetti", "").toLowerCase();
          return `  confettiOptions={{ ${optionName}: ${JSON.stringify(
            value
          )} }}`;
        }
        if (key.startsWith("validation")) {
          const ruleName = key.replace("validation", "").toLowerCase();
          if (ruleName === "required") return "";
          return `  validationRules={{ ${ruleName}: ${JSON.stringify(
            value
          )} }}`;
        }
        return `  ${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean);

    // Add slider configuration if type is slider
    if (appliedConfig.type === "slider") {
      const sliderConfig: any = {
        width: appliedConfig.sliderWidth,
        height: appliedConfig.sliderHeight,
        pieceSize: appliedConfig.sliderPieceSize,
        tolerance: appliedConfig.sliderTolerance,
        enableShadow: appliedConfig.sliderEnableShadow,
      };

      // Add background image if provided
      if (appliedConfig.sliderBackgroundImage) {
        sliderConfig.backgroundImage = appliedConfig.sliderBackgroundImage;
      }

      // Add background images array if provided
      if (appliedConfig.sliderBackgroundImages) {
        sliderConfig.backgroundImages = appliedConfig.sliderBackgroundImages
          .split(",")
          .map((url: string) => url.trim())
          .filter(Boolean);
      }

      props.push(
        `  sliderConfig={${JSON.stringify(sliderConfig, null, 2)
          .replace(/\n/g, "\n  ")
          .replace(/^/, "  ")}}`
      );
    }

    return `<Captcha\n${props.join(
      "\n"
    )}\n  onValidate={(valid) => console.log('Valid:', valid)}\n/>`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateCodeSnippet());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      addToEventLog("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">
          🎮 Interactive Playground
        </h3>
        <p className="text-muted-foreground text-base lg:text-lg">
          Configure your CAPTCHA settings and see the results in real-time
        </p>
      </div>

      {hasChanges && (
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span>You have unsaved changes</span>
            <div className="flex gap-2">
              <Button
                onClick={applyChanges}
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Apply Changes
              </Button>
              <Button
                onClick={resetChanges}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        {/* Configuration Panel */}
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
                    config.type === "slider" ? "grid-cols-2" : "grid-cols-3"
                  }`}
                >
                  <TabsTrigger value="basic" className="text-xs sm:text-sm">
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs sm:text-sm">
                    Advanced
                  </TabsTrigger>
                  {config.type !== "slider" && (
                    <TabsTrigger
                      value="validation"
                      className="text-xs sm:text-sm"
                    >
                      Rules
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="basic" className="space-y-4 lg:space-y-6">
                  {/* Presets */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Quick Presets</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      {Object.entries(presets).map(([key, preset]) => (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            applyPreset(key as keyof typeof presets)
                          }
                          className="h-auto p-2 sm:p-3 text-xs"
                          title={preset.description}
                        >
                          {key}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={config.type}
                        onValueChange={(value) => updateConfig("type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="numbers">Numbers</SelectItem>
                          <SelectItem value="letters">Letters</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                          <SelectItem value="slider">Slider Puzzle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Slider-specific options */}
                    {config.type === "slider" && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">
                            Slider Configuration
                          </Label>

                          <div className="space-y-2">
                            <Label>Width: {config.sliderWidth}px</Label>
                            <Slider
                              value={[config.sliderWidth]}
                              onValueChange={([value]) =>
                                updateConfig("sliderWidth", value)
                              }
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
                              onValueChange={([value]) =>
                                updateConfig("sliderHeight", value)
                              }
                              min={120}
                              max={400}
                              step={10}
                              className="w-full"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Piece Size: {config.sliderPieceSize}px
                            </Label>
                            <Slider
                              value={[config.sliderPieceSize]}
                              onValueChange={([value]) =>
                                updateConfig("sliderPieceSize", value)
                              }
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
                              onValueChange={([value]) =>
                                updateConfig("sliderTolerance", value)
                              }
                              min={5}
                              max={30}
                              step={1}
                              className="w-full"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="sliderBackgroundImage">
                              Background Image URL
                            </Label>
                            <Input
                              id="sliderBackgroundImage"
                              value={config.sliderBackgroundImage}
                              onChange={(e) =>
                                updateConfig(
                                  "sliderBackgroundImage",
                                  e.target.value
                                )
                              }
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
                              onChange={(e) =>
                                updateConfig(
                                  "sliderBackgroundImages",
                                  e.target.value
                                )
                              }
                              placeholder="https://img1.jpg,https://img2.jpg,https://img3.jpg"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="sliderEnableShadow"
                              className="text-sm font-normal"
                            >
                              Enable Shadow
                            </Label>
                            <Switch
                              id="sliderEnableShadow"
                              checked={config.sliderEnableShadow}
                              onCheckedChange={(checked) =>
                                updateConfig("sliderEnableShadow", checked)
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Standard options - only show for non-slider types */}
                    {config.type !== "slider" && (
                      <>
                        <div className="space-y-2">
                          <Label>Length: {config.length}</Label>
                          <Slider
                            value={[config.length]}
                            onValueChange={([value]) =>
                              updateConfig("length", value)
                            }
                            min={3}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="customCharacters">
                            Custom Characters
                          </Label>
                          <Input
                            id="customCharacters"
                            value={config.customCharacters}
                            onChange={(e) =>
                              updateConfig("customCharacters", e.target.value)
                            }
                            placeholder="e.g., ABCDEF123456"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select
                            value={config.language}
                            onValueChange={(value) =>
                              updateConfig("language", value)
                            }
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
                        onValueChange={([value]) =>
                          updateConfig("maxAttempts", value)
                        }
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
                        onValueChange={([value]) =>
                          updateConfig("refreshInterval", value)
                        }
                        min={0}
                        max={60}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Boolean Options */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Options</Label>
                    <div className="space-y-3">
                      {[
                        { key: "darkMode", label: "Dark Mode" },
                        ...(config.type !== "slider"
                          ? [
                              { key: "caseSensitive", label: "Case Sensitive" },
                              { key: "refreshable", label: "Refreshable" },
                              { key: "enableAudio", label: "Enable Audio" },
                              { key: "rtl", label: "Right-to-Left" },
                            ]
                          : []),
                        {
                          key: "showSuccessAnimation",
                          label: "Success Animation",
                        },
                        { key: "showConfetti", label: "Show Confetti" },
                        ...(config.type !== "slider"
                          ? [{ key: "autoFocus", label: "Auto Focus" }]
                          : []),
                        { key: "showEventLog", label: "Show Event Log" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <Label htmlFor={key} className="text-sm font-normal">
                            {label}
                          </Label>
                          <Switch
                            id={key}
                            checked={
                              config[key as keyof typeof config] as boolean
                            }
                            onCheckedChange={(checked) =>
                              updateConfig(key, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="className">CSS Class Name</Label>
                      <Input
                        id="className"
                        value={config.className}
                        onChange={(e) =>
                          updateConfig("className", e.target.value)
                        }
                        placeholder="e.g., my-custom-captcha"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customStyles">Custom Styles (CSS)</Label>
                      <Textarea
                        id="customStyles"
                        value={config.customStyles}
                        onChange={(e) =>
                          updateConfig("customStyles", e.target.value)
                        }
                        placeholder="e.g., backgroundColor: '#f0f0f0', borderRadius: '8px'"
                        rows={3}
                      />
                    </div>

                    {config.type !== "slider" && (
                      <div className="space-y-2">
                        <Label htmlFor="inputButtonStyle">
                          Input Button Style
                        </Label>
                        <Input
                          id="inputButtonStyle"
                          value={config.inputButtonStyle}
                          onChange={(e) =>
                            updateConfig("inputButtonStyle", e.target.value)
                          }
                          placeholder="e.g., btn-primary custom-input"
                        />
                      </div>
                    )}

                    {config.showConfetti && (
                      <>
                        <Separator />
                        <div className="space-y-4">
                          <Label className="text-sm font-medium">
                            Confetti Options
                          </Label>

                          <div className="space-y-2">
                            <Label>
                              Particle Count: {config.confettiParticles}
                            </Label>
                            <Slider
                              value={[config.confettiParticles]}
                              onValueChange={([value]) =>
                                updateConfig("confettiParticles", value)
                              }
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
                              onChange={(e) =>
                                updateConfig("confettiColors", e.target.value)
                              }
                              placeholder="#ff0000,#00ff00,#0000ff"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Duration: {config.confettiDuration}ms</Label>
                            <Slider
                              value={[config.confettiDuration]}
                              onValueChange={([value]) =>
                                updateConfig("confettiDuration", value)
                              }
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
                </TabsContent>

                {config.type !== "slider" && (
                  <TabsContent value="validation" className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="validationMinLength">
                            Min Length
                          </Label>
                          <Input
                            id="validationMinLength"
                            type="number"
                            min="0"
                            max="20"
                            value={config.validationMinLength}
                            onChange={(e) =>
                              updateConfig(
                                "validationMinLength",
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="validationMaxLength">
                            Max Length
                          </Label>
                          <Input
                            id="validationMaxLength"
                            type="number"
                            min="0"
                            max="20"
                            value={config.validationMaxLength}
                            onChange={(e) =>
                              updateConfig(
                                "validationMaxLength",
                                parseInt(e.target.value) || 0
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="validationAllowedChars">
                          Allowed Characters
                        </Label>
                        <Input
                          id="validationAllowedChars"
                          value={config.validationAllowedChars}
                          onChange={(e) =>
                            updateConfig(
                              "validationAllowedChars",
                              e.target.value
                            )
                          }
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
                          onChange={(e) =>
                            updateConfig("validationCustom", e.target.value)
                          }
                          placeholder="e.g., /^[A-Z]+$/.test(value) || 'Only uppercase letters'"
                          rows={2}
                        />
                      </div>
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </ScrollArea>

            <Separator />

            <Button
              onClick={applyChanges}
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

        {/* Preview Panel */}
        <div className="md:col-span-1 xl:col-span-2 space-y-4 lg:space-y-6 order-1 xl:order-2">
          {/* CAPTCHA Preview */}
          <Card
            className={appliedConfig.darkMode ? "dark border-gray-800" : ""}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <Badge variant={isValid ? "default" : "secondary"}>
                  {isValid ? "✅ Verified" : "Awaiting verification"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center py-4 lg:py-8">
              <Captcha
                type={appliedConfig.type}
                {...(appliedConfig.type !== "slider" && {
                  length: appliedConfig.length,
                  caseSensitive: appliedConfig.caseSensitive,
                  refreshable: appliedConfig.refreshable,
                  enableAudio: appliedConfig.enableAudio,
                  customCharacters: appliedConfig.customCharacters || undefined,
                  rtl: appliedConfig.rtl,
                  className: appliedConfig.className,
                  inputButtonStyle: appliedConfig.inputButtonStyle,
                  customStyles: appliedConfig.customStyles
                    ? eval(`({${appliedConfig.customStyles}})`)
                    : undefined,
                  validationRules: {
                    required: appliedConfig.validationRequired,
                    ...(appliedConfig.validationMinLength > 0 && {
                      minLength: appliedConfig.validationMinLength,
                    }),
                    ...(appliedConfig.validationMaxLength > 0 && {
                      maxLength: appliedConfig.validationMaxLength,
                    }),
                    ...(appliedConfig.validationAllowedChars && {
                      allowedCharacters: appliedConfig.validationAllowedChars,
                    }),
                    ...(appliedConfig.validationCustom && {
                      customValidator: (value: string) => {
                        try {
                          return eval(
                            appliedConfig.validationCustom.replace(
                              "value",
                              `"${value}"`
                            )
                          );
                        } catch {
                          return "Invalid custom validator";
                        }
                      },
                    }),
                  },
                  i18n: languages[
                    appliedConfig.language as keyof typeof languages
                  ],
                })}
                {...(appliedConfig.type === "slider" && {
                  sliderConfig: {
                    width: appliedConfig.sliderWidth,
                    height: appliedConfig.sliderHeight,
                    pieceSize: appliedConfig.sliderPieceSize,
                    tolerance: appliedConfig.sliderTolerance,
                    enableShadow: appliedConfig.sliderEnableShadow,
                    ...(appliedConfig.sliderBackgroundImage && {
                      backgroundImage: appliedConfig.sliderBackgroundImage,
                    }),
                    ...(appliedConfig.sliderBackgroundImages && {
                      backgroundImages: appliedConfig.sliderBackgroundImages
                        .split(",")
                        .map((url: string) => url.trim())
                        .filter(Boolean),
                    }),
                  },
                })}
                darkMode={appliedConfig.darkMode}
                showSuccessAnimation={appliedConfig.showSuccessAnimation}
                showConfetti={appliedConfig.showConfetti}
                autoFocus={appliedConfig.autoFocus}
                maxAttempts={appliedConfig.maxAttempts}
                refreshInterval={appliedConfig.refreshInterval}
                confettiOptions={{
                  particleCount: appliedConfig.confettiParticles,
                  colors: appliedConfig.confettiColors
                    .split(",")
                    .map((c) => c.trim()),
                  duration: appliedConfig.confettiDuration,
                }}
                onChange={(value: string) =>
                  addToEventLog(`Input changed: "${value}"`)
                }
                onValidate={(valid: boolean) => {
                  setIsValid(valid);
                  addToEventLog(`Validation: ${valid ? "Success" : "Failed"}`);
                }}
                onRefresh={() => addToEventLog("CAPTCHA refreshed")}
                onAudioPlay={() => addToEventLog("Audio played")}
                onError={(error: string) => addToEventLog(`Error: ${error}`)}
                onFail={() => addToEventLog("Validation failed")}
              />
            </CardContent>
          </Card>

          {/* Event Log */}
          {appliedConfig.showEventLog && eventLog.length > 0 && (
            <Card
              className={appliedConfig.darkMode ? "dark border-gray-800" : ""}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5" />
                  Event Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-24 sm:h-32 w-full">
                  <div className="space-y-2">
                    {eventLog.map((event, index) => (
                      <div
                        key={index}
                        className="text-xs sm:text-sm font-mono p-2 rounded bg-muted"
                      >
                        {event}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Generated Code */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Code className="w-5 h-5" />
                  Generated Code
                </CardTitle>
                <Button
                  onClick={copyToClipboard}
                  variant={copySuccess ? "default" : "outline"}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copySuccess ? "✅ Copied!" : "Copy Code"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs sm:text-sm">
                  <code>{generateCodeSnippet()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                💡 Rate Limiting Prevention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs sm:text-sm">
              <p>
                <strong>🔧 How it works:</strong> Adjust settings on the left,
                then click "Apply Changes" to update the CAPTCHA
              </p>
              <p>
                <strong>⚡ Performance:</strong> This prevents rate limiting by
                only generating new CAPTCHAs when you apply changes
              </p>
              <p>
                <strong>🎯 Tip:</strong> Use presets for quick configurations,
                or customize individual settings for your needs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="w-full border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">ReCAPTZ</h1>
              <p className="text-sm text-gray-500">
                Modern, Secure, Customizable
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="https://www.producthunt.com/products/recaptz?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-recaptz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity hidden sm:block"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004588&theme=light&t=1755069998244"
                alt="ReCAPTZ - Modern react captcha component | Product Hunt"
                style={{ width: "160px", height: "50px" }}
                width="160"
                height="50"
              />
            </a>
            <a
              href="https://github.com/ShejanMahamud/recaptz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/package/recaptz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">NPM</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">ReCAPTZ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
            The Modern CAPTCHA Solution for React Applications
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            A beautiful, customizable, and secure CAPTCHA component with
            multiple verification types, perfect for protecting your forms and
            user interactions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
            <a
              href="#playground"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Playground
            </a>
            <a
              href="https://github.com/ShejanMahamud/recaptz#readme"
              className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all font-medium"
            >
              Documentation
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Secure by Design
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Built with security best practices and customizable validation
              rules
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Accessibility First
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Screen reader support, keyboard navigation, and audio feedback
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              Developer Friendly
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              TypeScript support, comprehensive documentation, and easy
              integration
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              High Performance
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Optimized rendering with minimal bundle size and fast load times
            </p>
          </div>
        </div>

        <div id="playground" className="space-y-16 mb-16">
          <CaptchaPlayground />
        </div>

        <div
          id="documentation"
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-12 sm:mb-16"
        >
          <div className="text-center space-y-4 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold">Browser Support</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Works seamlessly across all modern browsers
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {["Chrome", "Firefox", "Safari", "Edge", "Opera"].map((browser) => (
              <div key={browser} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gray-50 rounded-xl flex items-center justify-center mb-2 sm:mb-3">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </div>
                <p className="font-medium text-sm sm:text-base">{browser}</p>
                <p className="text-xs sm:text-sm text-gray-500">Latest</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="bg-gray-50 border-t border-gray-200 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="flex justify-center">
              {/* Product Section */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">ReCAPTZ</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 max-w-md">
                  Modern, secure, and customizable CAPTCHA solution for React
                  applications.
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href="https://github.com/ShejanMahamud/recaptz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.npmjs.com/package/recaptz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="NPM Package"
                  >
                    <Package className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
