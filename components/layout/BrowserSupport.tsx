import { Globe } from "lucide-react";
import { BROWSERS } from "@/lib/constants/captcha";

export function BrowserSupport() {
  return (
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
        {BROWSERS.map((browser) => (
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
  );
}
