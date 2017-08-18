import {
    DecorationRenderOptions,
    Disposable,
    OutputChannel,
    TextEditor,
    TextEditorDecorationType,
    WorkspaceConfiguration,
    window,
    workspace,
} from 'vscode'

export class Window {
    public activeTextEditor: TextEditor = window.activeTextEditor

    public createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType {
        return window.createTextEditorDecorationType(options)
    }

    public createOutputChannel(name: string): OutputChannel {
        return window.createOutputChannel(name)
    }
}

export class Workspace {
    public rootPath: string = workspace.rootPath

    public getConfiguration(section?: string): WorkspaceConfiguration {
        return workspace.getConfiguration(section)
    }

    public onDidOpenTextDocument(listener: any = () => {}, thisArgs?: any, disposables?: Disposable[]): Disposable {
        return workspace.onDidOpenTextDocument(listener, thisArgs, disposables)
    }

    public onDidSaveTextDocument(listener: any = () => {}, thisArgs?: any, disposables?: Disposable[]): Disposable {
        return workspace.onDidSaveTextDocument(listener, thisArgs, disposables)
    }
}