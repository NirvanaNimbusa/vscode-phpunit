import { tmpdir } from 'os';
import { join } from 'path';
import { spawn } from 'child_process';
import { Parser } from './Parser';
import { existsSync, unlinkSync } from 'fs';

interface Options {
    rootPath: string;
    tmpdir: string;
}

export class PHPUnit {
    public constructor(
        private options: Options = {
            rootPath: __dirname,
            tmpdir: tmpdir()
        },
        private parser = new Parser
    ) {}

    public run(filePath: string, output: any = null): Promise<any> {
        return new Promise((resolve, reject) => {
            const rootPath = this.options.rootPath;
            const xml = join(this.options.tmpdir, `vscode-phpunit-junit-${(new Date()).getTime()}.xml`);
            const command = existsSync(join(rootPath, 'vendor/bin/phpunit.bat'))
                ? join(rootPath, 'vendor/bin/phpunit.bat')
                : 'C:\\ProgramData\\ComposerSetup\\vendor\\bin\\phpunit.bat';
            const args = [
                filePath,
                '--colors=always',
                '--log-junit',
                xml
            ];
            
            const process = spawn(command, args, {cwd: rootPath});
            const cb = (buffer: Buffer) => {
                if (output !== null) {
                    output.append(this.noAnsi(buffer.toString()));
                }
            }
            
            process.stderr.on('data', cb);
            process.stdout.on('data', cb);
            process.on('exit', async (code: string) => {
                let messages: any = [];
                if (existsSync(xml) === true) {
                    messages = await this.parser.parseXML(xml);
                    unlinkSync(xml);
                }

                return messages;
            });
        });
    }

    public noAnsi(str: string): string {
        return str.replace(
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
            ''
        );
    }
}