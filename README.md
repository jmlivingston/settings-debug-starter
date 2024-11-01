# Settings debug starter

Starts VS Code debugger based on what's in settings.json

## Installation

This has not been published as this is very basic and I currently have no time to make it better or maintain it. However, you can download the latest .vsix file, then select "Install from VSIX" from the Extensions menu in VS Code.

## Features

Change the extensions settings as described below to start a debugging session in VS Code. This allows you to use 3rd party tools to initiate debuggions sessions simply by updating the contents of .vscode/settings.json.

## Requirements

N/A

## Extension Settings

This extension adds the following settings which are used to start a debugger in VS Code when the values change.

- `settingsDebugStarter.args`: Args to pass to script. For example: "{\"args"\: { \"foo\": \"bar\" }}"
- `settingsDebugStarter.debugPath`: Absolute path to script file. For example: "/Users/bob/projects/my-proj/tests/feature1Test.js"
- `settingsDebugStarter.randomId`: (Optional) - Just used to kick off script again if nothing else has changed. Format is not important.
- `settingsDebugStarter.workspace`: Name to the workspace if using a workspace. For example: myproj-api.

## Example

For example, you can use a [Bruno](https://www.usebruno.com/) Pre Request script to either call an API via Fetch or start a debugging session directly in VS Code by updating .vscode/settings.json. This example is based on a `_GLOBAL_IS_DEBUG` variable in Bruno's environment variables.

```javascript
if (bru.getEnvVar('_GLOBAL_IS_DEBUG') === 'true') {
  const fs = require('fs');
  const { nanoid } = require('nanoid');
  const path = require('path');
  const settingsFolder = path.join('/Users/bob/projects/my-proj', '.vscode');
  const settingsPath = path.join('/Users/bob/projects/my-proj', '.vscode/settings.json');
  const isSettingsFolderExist = fs.existsSync(settingsFolder);
  const isSettingsPathExist = fs.existsSync(settingsPath);
  if (!isSettingsFolderExist) {
    fs.mkdirSync(settingsFolder, { recursive: true });
  }
  const settingsString = isSettingsPathExist ? fs.readFileSync(settingsPath).toString() : '{}';
  const settings = JSON.parse(settingsString);
  let body = req.getBody() || {};
  let vars = {};
  body = Object.entries(body).reduce((acc, [key, value]) => {
    acc[key] = value.includes('{{') ? '' : value;
    return acc;
  }, {});
  let args = { ...vars, body };
  settings['settingsDebugStarter.args'] = JSON.stringify({ args });
  settings['settingsDebugStarter.debugPath'] = path.join('/Users/bob/projects/my-proj', 'tests/myTest.js');
  settings['settingsDebugStarter.randomId'] = nanoid();
  settings['settingsDebugStarter.workspace'] = 'my-proj';
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  throw new Error('Starting debugging at: /Users/bob/projects/my-proj/tests/myTest.js');
}

## Known Issues

N/A

## Release Notes

### 1.0.0

Initial release

**Enjoy!**
```
