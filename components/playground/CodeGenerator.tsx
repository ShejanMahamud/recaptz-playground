"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Copy } from "lucide-react";
import { useState } from "react";
import { Snippet, SnippetCopyButton, SnippetHeader, SnippetTabsContent, SnippetTabsList, SnippetTabsTrigger } from "../ui/kibo-ui/snippet";

interface CodeGeneratorProps {
  code: string;
  copySuccess: boolean;
  onCopy: () => void;
}

export function CodeGenerator({ code, copySuccess, onCopy }: CodeGeneratorProps) {
  const commands = [
    {
      label: "tsx",
      code: code,
    }
  ];
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((command) => command.label === value);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="w-5 h-5" />
            Generated Code
          </CardTitle>
          <Button
            onClick={onCopy}
            variant={copySuccess ? "default" : "outline"}
            size="sm"
            className="w-full sm:w-auto"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copySuccess ? "✅ Copied!" : "Copy Code"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Snippet onValueChange={setValue} value={value}>
          <SnippetHeader>
            <SnippetTabsList>
              {commands.map((command) => (
                <SnippetTabsTrigger key={command.label} value={command.label}>
                  {command.label}
                </SnippetTabsTrigger>
              ))}
            </SnippetTabsList>
            {activeCommand && (
              <SnippetCopyButton
                onCopy={onCopy}
                onError={() =>
                  console.error(
                    `Failed to copy "${activeCommand.code}" to clipboard`
                  )
                }
                value={activeCommand.code}
              />
            )}
          </SnippetHeader>
          {commands.map((command) => (
            <SnippetTabsContent key={command.label} value={command.label}>
              {command.code}
            </SnippetTabsContent>
          ))}
        </Snippet>
      </CardContent>
    </Card>
  );
}
