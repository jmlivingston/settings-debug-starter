import * as vscode from 'vscode';
import fs from 'fs';

function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      const isAffected = event.affectsConfiguration('settingsDebugStarter');
      if (isAffected) {
        const { args = [], debugPath, workspace } = vscode.workspace.getConfiguration('settingsDebugStarter');
        const fileExists = fs.existsSync(debugPath);
        if (workspace && fileExists) {
          const folder = vscode.workspace.workspaceFolders?.find((folder) => folder.name === workspace);
          if (folder) {
            vscode.debug.startDebugging(folder, {
              args,
              name: debugPath.split('/').slice(-1),
              program: debugPath,
              request: 'launch',
              skipFiles: ['<node_internals>/**'],
              type: 'node',
            });
          } else {
            vscode.window.showInformationMessage('Ensure settingsDebugStarter.workspace settings is correct.');
          }
        } else {
          vscode.window.showInformationMessage(
            'Ensure settingsDebugStarter.debugPath and settingsDebugStarter.workspace are set in your settings.'
          );
        }
      }
    })
  );
}

function deactivate() {}

export { activate, deactivate };
