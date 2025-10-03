import { ShieldCheck, Github, Package } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-center">
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
  );
}
