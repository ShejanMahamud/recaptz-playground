import { CaptchaConfig } from "../types/captcha";

export function generateCodeSnippet(config: CaptchaConfig): string {
  const props = Object.entries(config)
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
      if (key.startsWith("slider")) return false;
      if (key.startsWith("math")) return false;
      if (key.startsWith("pattern")) return false;
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
        return `  confettiOptions={{ ${optionName}: ${JSON.stringify(value)} }}`;
      }
      if (key.startsWith("validation")) {
        const ruleName = key.replace("validation", "").toLowerCase();
        if (ruleName === "required") return "";
        return `  validationRules={{ ${ruleName}: ${JSON.stringify(value)} }}`;
      }
      return `  ${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean);

  // Add slider configuration if type is slider
  if (config.type === "slider") {
    const sliderConfig: any = {
      width: config.sliderWidth,
      height: config.sliderHeight,
      pieceSize: config.sliderPieceSize,
      tolerance: config.sliderTolerance,
      enableShadow: config.sliderEnableShadow,
    };

    if (config.sliderBackgroundImage) {
      sliderConfig.backgroundImage = config.sliderBackgroundImage;
    }

    if (config.sliderBackgroundImages) {
      sliderConfig.backgroundImages = config.sliderBackgroundImages
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

  // Add math configuration if type is math
  if (config.type === "math") {
    const mathConfig: any = {
      difficulty: config.mathDifficulty,
      operations: config.mathOperations,
      range: {
        min: config.mathRangeMin,
        max: config.mathRangeMax,
      },
      allowDecimals: config.mathAllowDecimals,
      showHint: config.mathShowHint,
    };

    props.push(
      `  mathConfig={${JSON.stringify(mathConfig, null, 2)
        .replace(/\n/g, "\n  ")
        .replace(/^/, "  ")}}`
    );
  }

  // Add pattern configuration if type is pattern
  if (config.type === "pattern") {
    const patternConfig: any = {
      difficulty: config.patternDifficulty,
      gridSize: config.patternGridSize,
      patternTypes: config.patternTypes,
      shapes: config.patternShapes,
      colors: config.patternColors,
    };

    props.push(
      `  patternConfig={${JSON.stringify(patternConfig, null, 2)
        .replace(/\n/g, "\n  ")
        .replace(/^/, "  ")}}`
    );
  }

  return `<Captcha\n${props.join(
    "\n"
  )}\n  onValidate={(valid) => console.log('Valid:', valid)}\n/>`;
}
