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

        let hostContainers: Array<ACDesigner.HostContainer> = [];
        hostContainers.push(new ACDesigner.WebChatContainer("Bot Framework WebChat", "containers/webchat-container.css"));
        hostContainers.push(new ACDesigner.CortanaContainer("Cortana Skills", "containers/cortana-container.css"));
        hostContainers.push(new ACDesigner.OutlookContainer("Outlook Actionable Messages", "containers/outlook-container.css"));
        hostContainers.push(new ACDesigner.TimelineContainer("Windows Timeline", "containers/timeline-container.css"));
        hostContainers.push(new ACDesigner.DarkTeamsContainer("Microsoft Teams - Dark", "containers/teams-container-dark.css"));
        hostContainers.push(new ACDesigner.LightTeamsContainer("Microsoft Teams - Light", "containers/teams-container-light.css"));
        hostContainers.push(new ACDesigner.BotFrameworkContainer("Bot Framework Other Channels (Image render)", "containers/bf-image-container.css"));
        hostContainers.push(new ACDesigner.ToastContainer("Windows Notifications (Preview)", "containers/toast-container.css"));

        let designer = new ACDesigner.CardDesigner(hostContainers);
        designer.sampleCatalogueUrl = window.location.origin + "/sample-catalogue.json";

        this.designer = new ACDesigner.CardDesigner(hostContainers);
        this.designer.attachTo(document.getElementById("designerRootHost"));

        //part of basic designer properties
        this.designer.monacoModuleLoaded(monaco);
    }

    public render(): React.ReactElement<{}> {
        return (
            <div id="designerRootHost"></div>
        )
    }
}