import * as React from 'react';

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import markdownit from "markdown-it";
import * as ACDesigner from "adaptivecards-designer";

require("adaptivecards-designer/dist/adaptivecards-designer.css");

require("./app.scss");

// No routing as currently it is supposed to be a single page application
export default class App extends React.Component {

    private designer: ACDesigner.CardDesigner;

    constructor(props: any) {
        super(props);
    }

    public componentDidMount(): void {
        // Comment to disable preview features (data binding)
        ACDesigner.GlobalSettings.previewFeaturesEnabled = true;

        ACDesigner.CardDesigner.onProcessMarkdown = (text: string, result: { didProcess: boolean, outputHtml?: string }) => {
            result.outputHtml = new markdownit().render(text);
            result.didProcess = true;
        }


        this.designer = new ACDesigner.CardDesigner();
        this.designer.attachTo(document.getElementById("designerRootHost"));
    }

    public render(): React.ReactElement<{}>  {
        return (
            <div id="designerRootHost"></div>
        )
    }
}