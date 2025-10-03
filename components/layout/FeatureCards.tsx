import { ShieldCheck, Accessibility, Terminal, Zap } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description: "Built with security best practices and customizable validation rules",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Accessibility,
    title: "Accessibility First",
    description: "Screen reader support, keyboard navigation, and audio feedback",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Terminal,
    title: "Developer Friendly",
    description: "TypeScript support, comprehensive documentation, and easy integration",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized rendering with minimal bundle size and fast load times",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

export function FeatureCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div key={feature.title} className="p-4 sm:p-6 bg-white rounded-xl shadow-md">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${feature.iconColor}`} />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
