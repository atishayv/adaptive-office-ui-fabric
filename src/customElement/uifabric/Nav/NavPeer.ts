import { CardElementPeerInplaceEditor, DesignContext, DesignerPeerInplaceEditor, FieldPicker, PeerCommand, PropertySheet, PropertySheetCategory, StringPropertyEditor, TypedCardElementPeer } from "adaptivecards-designer";
import { Nav } from "./Nav";
import * as Adaptive from 'adaptivecards';


class NavPeerInplaceEditor extends CardElementPeerInplaceEditor<Nav> {
    private _renderedElement: HTMLTextAreaElement;

    private close(applyChanges: boolean) {
        if (this.onClose) {
            this.onClose(applyChanges);
        }
    }

    initialize() {
        this._renderedElement.select();
    }

    applyChanges() {
        this.cardElement.groups = this._renderedElement.value;
    }

    render() {
        this._renderedElement = document.createElement("textarea");
        this._renderedElement.className = "acd-nav-inplace-editor";
        this._renderedElement.value = this.cardElement.groups;
        this._renderedElement.onkeydown = (e) => {
            switch (e.key) {
                case "Escape":
                   this.close(false);

                   e.preventDefault();
                   e.cancelBubble = true;

                   break;
                case "Enter":
                    this.close(true);

                    e.preventDefault();
                    e.cancelBubble = true;

                    break;
            }

            return !e.cancelBubble;
        };

        // this.cardElement.applyStylesTo(this._renderedElement);

        return this._renderedElement;
    }
}

export class NavPeer extends TypedCardElementPeer<Nav> {
    static readonly groupsProperty = new StringPropertyEditor(Adaptive.Versions.v1_2, "groups", "Groups", true, true);

    protected createInplaceEditor(): DesignerPeerInplaceEditor {
        return new NavPeerInplaceEditor(this.cardElement);
    }

    protected internalGetTreeItemText(): string {
        return this.cardElement.groups;
    }

    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>) {
        super.internalAddCommands(context, commands);

        if (context.dataStructure) {
            commands.push(
                new PeerCommand(
                    {
                        name: "Bind...",
                        alwaysShowName: true,
                        toolTip: "Select a data field to bind this Nav to.",
                        execute: (command: PeerCommand, clickedElement: HTMLElement) => {
                            let fieldPicker = new FieldPicker(context.dataStructure);
                            fieldPicker.onClose = (sender, wasCancelled) => {
                                if (!wasCancelled) {
                                    this.cardElement.groups = fieldPicker.selectedField.asExpression();

                                    this.changed(true);
                                }
                            }
                            fieldPicker.popup(clickedElement);
                        }
                    })
            );
        }
    }

    populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory) {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            NavPeer.groupsProperty);
    }

    getToolTip(): string {
        return "Double click to edit";
    }

    initializeCardElement() {
        if (!this.cardElement.groups || this.cardElement.groups == "") {
            this.cardElement.groups = "[{\"links\":[{\"name\":\"Parent link 1\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\",\"expandAriaLabel\":\"Expand Parent link 1\",\"collapseAriaLabel\":\"Collapse Parent link 1\",\"links\":[{\"name\":\"Child link 1\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\"},{\"name\":\"Child link 2\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\",\"expandAriaLabel\":\"Expand Child link 2\",\"collapseAriaLabel\":\"Collapse Child link 2\",\"links\":[{\"name\":\"3rd level link 1\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\"},{\"name\":\"3rd level link 2\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\"}]},{\"name\":\"Child link 3\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\"}]},{\"name\":\"Parent link 2\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\",\"expandAriaLabel\":\"Expand Parent link 2\",\"collapseAriaLabel\":\"Collapse Parent link 2\",\"links\":[{\"name\":\"Child link 4\",\"url\":\"http:\/\/example.com\",\"target\":\"_blank\"}]}]}]";
        }
    }
}