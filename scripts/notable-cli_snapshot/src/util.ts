import * as config from './config.json';
import fs from 'fs';
import colors from 'colors';
import {execSync} from 'child_process';

export class Util {
  static getNoteFilePath(filename: string): string {
    return config.noteDir + '/' + filename + '.md';
  }

  static writeFile(filename: string, fileContents: string, shouldOverwrite: boolean = false) {
    // write markdown file
    try {
      const path = Util.getNoteFilePath(filename);
      // check the file does not already exist if it is not supposed to overwrite
      if (!shouldOverwrite) {
        if (fs.existsSync(path)) {
          console.error(colors.red(
              `Error: File not created: '${filename}' already exists. Use the -f option to force overwrite.`));
          process.exit(10); // error code 10 is an io error
        }
      }
      fs.writeFileSync(path, fileContents);
      console.log(colors.green(
          `Successfully created: '${filename}'`));
    } catch (err) {
      console.error(colors.red(err));
      process.exit(10); // error code 10 is an io error
    }
  }

  static openFile(filename: string) {
    const path = Util.getNoteFilePath(filename);
    execSync('open \'notable://command/tab.new/["'+ path +'"]\'');
    console.log(colors.green(
        `Opened: '${filename}'`));
  }
}
