import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureHighlight() {
  return (
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
  );
}
