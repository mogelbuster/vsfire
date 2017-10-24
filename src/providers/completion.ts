import * as vscode from "vscode";
import { completions } from "./parser";

export class RuleCompletionProvider implements vscode.CompletionItemProvider {
   public provideCompletionItems(
      document:vscode.TextDocument,
      position:vscode.Position,
      _token:vscode.CancellationToken):Thenable<vscode.CompletionItem[]> {

      const lineText = document.lineAt(position.line).text;
      const lastSpace = lineText.lastIndexOf(" ", position.character - 1);
      const lastParen = lineText.lastIndexOf("(", position.character - 1);
      const start = (lastParen >= lastSpace) ? lastParen : lastSpace;
      const word = lineText.substring(start + 1, position.character).replace(/\.$/, "");

      return (word == null) ? null : completions(word);
   }
}