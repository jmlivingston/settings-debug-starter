# settings-debug-starter README

This extension kicks off the debugger based on user settings.

## Features

- Use with Bruno pre-request script to start debugging in Visual Studio.

## Requirements

This works in conjunction with Bruno allowing you to run directly against a REST API or debugging locally.

## Extension Settings

This extension contributes the following settings:

- `settingsDebugStarter.args`: Args to pass to script. For example: "{\"args"\: { \"foo\": \"bar\" }}"
- `settingsDebugStarter.debugPath`: Absolute path to script file. For example: "/Users/bob/projects/my-proj/tests/feature1Test.js"
- `settingsDebugStarter.randomId`: (Optional) - Just used to kick off script again if nothing else has changed. Format is not important.
- `settingsDebugStarter.workspace`: Name to the workspace if using a workspace. For example: myproj-api.

## Known Issues

N/A

## Release Notes

### 1.0.0

Initial release

**Enjoy!**
