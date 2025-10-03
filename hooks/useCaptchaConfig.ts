import { useState, useCallback } from "react";
import { CaptchaConfig } from "@/lib/types/captcha";
import { DEFAULT_CONFIG, PRESETS } from "@/lib/constants/captcha";

export function useCaptchaConfig() {
  const [config, setConfig] = useState<CaptchaConfig>(DEFAULT_CONFIG);
  const [appliedConfig, setAppliedConfig] = useState<CaptchaConfig>(DEFAULT_CONFIG);
  const [hasChanges, setHasChanges] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const addToEventLog = useCallback((event: string) => {
    setEventLog((prev) => [
      ...prev.slice(-4),
      `${new Date().toLocaleTimeString()}: ${event}`,
    ]);
  }, []);

  const updateConfig = useCallback((key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const applyChanges = useCallback(() => {
    setAppliedConfig(config);
    setHasChanges(false);
    setIsValid(false);
    setEventLog([]);
    if (config.showEventLog) {
      addToEventLog("Configuration applied");
    }
  }, [config, addToEventLog]);

  const resetChanges = useCallback(() => {
    setConfig(appliedConfig);
    setHasChanges(false);
  }, [appliedConfig]);

  const applyPreset = useCallback((presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    const newConfig = { ...config, ...preset };
    setConfig(newConfig);
    setHasChanges(true);
    if (config.showEventLog) {
      addToEventLog(`Applied preset: ${presetKey}`);
    }
  }, [config, addToEventLog]);

  const copyToClipboard = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      if (config.showEventLog) {
        addToEventLog("Code copied to clipboard");
      }
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [config.showEventLog, addToEventLog]);

  return {
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
  };
}
