import { Github, Package, ShieldCheck } from "lucide-react";

export function Header() {
  return (
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
  );
}
