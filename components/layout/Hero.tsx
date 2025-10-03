import { ShieldCheck } from "lucide-react";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";

export function Hero() {
  return (
    <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
      <BackgroundRippleEffect />

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
  );
}
