"use client";

import { useCaptchaConfig } from "@/hooks/useCaptchaConfig";
import { generateCodeSnippet } from "@/lib/utils/codeGenerator";
import { ChangeAlert } from "./ChangeAlert";
import { ConfigurationPanel } from "./ConfigurationPanel";
import { CaptchaPreview } from "./CaptchaPreview";
import { EventLog } from "./EventLog";
import { CodeGenerator } from "./CodeGenerator";
import { FeatureHighlight } from "./FeatureHighlight";

export function CaptchaPlayground() {
  const {
    config,
    appliedConfig,
    hasChanges,
    isValid,
    eventLog,
    copySuccess,
    setIsValid,
    updateConfig,
    applyChanges,
    resetChanges,
    applyPreset,
    copyToClipboard,
    addToEventLog,
  } = useCaptchaConfig();

  const handleCopyCode = () => {
    const code = generateCodeSnippet(appliedConfig);
    copyToClipboard(code);
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

      <ChangeAlert
        hasChanges={hasChanges}
        onApply={applyChanges}
        onReset={resetChanges}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
        <ConfigurationPanel
          config={config}
          hasChanges={hasChanges}
          onUpdate={updateConfig}
          onApplyChanges={applyChanges}
          onPresetSelect={applyPreset}
        />

        <div className="md:col-span-1 xl:col-span-2 space-y-4 lg:space-y-6 order-1 xl:order-2">
          <CaptchaPreview
            config={appliedConfig}
            isValid={isValid}
            onValidate={(valid) => {
              setIsValid(valid);
              if (appliedConfig.showEventLog) {
                addToEventLog(`Validation: ${valid ? "Success" : "Failed"}`);
              }
            }}
            onChange={(value) => {
              if (appliedConfig.showEventLog) {
                addToEventLog(`Input changed: "${value}"`);
              }
            }}
            onRefresh={() => {
              if (appliedConfig.showEventLog) {
                addToEventLog("CAPTCHA refreshed");
              }
            }}
            onAudioPlay={() => {
              if (appliedConfig.showEventLog) {
                addToEventLog("Audio played");
              }
            }}
            onError={(error) => {
              if (appliedConfig.showEventLog) {
                addToEventLog(`Error: ${error}`);
              }
            }}
            onFail={() => {
              if (appliedConfig.showEventLog) {
                addToEventLog("Validation failed");
              }
            }}
          />

          {appliedConfig.showEventLog && (
            <EventLog events={eventLog} darkMode={appliedConfig.darkMode} />
          )}

          <CodeGenerator
            code={generateCodeSnippet(appliedConfig)}
            copySuccess={copySuccess}
            onCopy={handleCopyCode}
          />

          <FeatureHighlight />
        </div>
      </div>
    </div>
  );
}
