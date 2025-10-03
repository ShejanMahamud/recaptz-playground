import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Captcha } from "recaptz";
import { CaptchaConfig } from "@/lib/types/captcha";
import { LANGUAGES } from "@/lib/constants/captcha";

interface CaptchaPreviewProps {
  config: CaptchaConfig;
  isValid: boolean;
  onValidate: (valid: boolean) => void;
  onChange: (value: string) => void;
  onRefresh: () => void;
  onAudioPlay: () => void;
  onError: (error: string) => void;
  onFail: () => void;
}

export function CaptchaPreview({
  config,
  isValid,
  onValidate,
  onChange,
  onRefresh,
  onAudioPlay,
  onError,
  onFail,
}: CaptchaPreviewProps) {
  const isStandardType = config.type !== "slider" && config.type !== "math" && config.type !== "pattern";

  return (
    <Card className={config.darkMode ? "dark border-gray-800" : ""}>
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
          type={config.type}
          {...(isStandardType && {
            length: config.length,
            caseSensitive: config.caseSensitive,
            refreshable: config.refreshable,
            enableAudio: config.enableAudio,
            customCharacters: config.customCharacters || undefined,
            rtl: config.rtl,
            className: config.className,
            inputButtonStyle: config.inputButtonStyle,
            customStyles: config.customStyles
              ? eval(`({${config.customStyles}})`)
              : undefined,
            validationRules: {
              required: config.validationRequired,
              ...(config.validationMinLength > 0 && {
                minLength: config.validationMinLength,
              }),
              ...(config.validationMaxLength > 0 && {
                maxLength: config.validationMaxLength,
              }),
              ...(config.validationAllowedChars && {
                allowedCharacters: config.validationAllowedChars,
              }),
              ...(config.validationCustom && {
                customValidator: (value: string) => {
                  try {
                    return eval(
                      config.validationCustom.replace("value", `"${value}"`)
                    );
                  } catch {
                    return "Invalid custom validator";
                  }
                },
              }),
            },
            i18n: LANGUAGES[config.language as keyof typeof LANGUAGES],
          })}
          {...(config.type === "slider" && {
            sliderConfig: {
              width: config.sliderWidth,
              height: config.sliderHeight,
              pieceSize: config.sliderPieceSize,
              tolerance: config.sliderTolerance,
              enableShadow: config.sliderEnableShadow,
              ...(config.sliderBackgroundImage && {
                backgroundImage: config.sliderBackgroundImage,
              }),
              ...(config.sliderBackgroundImages && {
                backgroundImages: config.sliderBackgroundImages
                  .split(",")
                  .map((url: string) => url.trim())
                  .filter(Boolean),
              }),
            },
          })}
          {...(config.type === "math" && {
            mathConfig: {
              difficulty: config.mathDifficulty,
              operations: config.mathOperations,
              range: {
                min: config.mathRangeMin,
                max: config.mathRangeMax,
              },
              allowDecimals: config.mathAllowDecimals,
              showHint: config.mathShowHint,
            },
            enableAudio: config.enableAudio,
          })}
          {...(config.type === "pattern" && {
            patternConfig: {
              difficulty: config.patternDifficulty,
              gridSize: config.patternGridSize,
              patternTypes: config.patternTypes,
              shapes: config.patternShapes,
              colors: config.patternColors,
            },
          })}
          darkMode={config.darkMode}
          showSuccessAnimation={config.showSuccessAnimation}
          showConfetti={config.showConfetti}
          autoFocus={config.autoFocus}
          maxAttempts={config.maxAttempts}
          refreshInterval={config.refreshInterval}
          confettiOptions={{
            particleCount: config.confettiParticles,
            colors: config.confettiColors.split(",").map((c) => c.trim()),
            duration: config.confettiDuration,
          }}
          onChange={onChange}
          onValidate={onValidate}
          onRefresh={onRefresh}
          onAudioPlay={onAudioPlay}
          onError={onError}
          onFail={onFail}
        />
      </CardContent>
    </Card>
  );
}
