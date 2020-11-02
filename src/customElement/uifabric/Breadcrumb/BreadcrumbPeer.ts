import { CardElementPeerInplaceEditor, DesignContext, DesignerPeerInplaceEditor, FieldPicker, PeerCommand, PropertySheet, PropertySheetCategory, StringPropertyEditor, TypedCardElementPeer } from "adaptivecards-designer";
import { Breadcrumb } from "./Breadcrumb";
import * as Adaptive from 'adaptivecards';


class BreadcrumbPeerInplaceEditor extends CardElementPeerInplaceEditor<Breadcrumb> {
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
        this.cardElement.items = this._renderedElement.value;
    }

    render() {
        this._renderedElement = document.createElement("textarea");
        this._renderedElement.className = "acd-breadcrumb-inplace-editor";
        this._renderedElement.value = this.cardElement.items;
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

export class BreadcrumbPeer extends TypedCardElementPeer<Breadcrumb> {
    static readonly itemsProperty = new StringPropertyEditor(Adaptive.Versions.v1_2, "items", "Items", true, true);

    protected createInplaceEditor(): DesignerPeerInplaceEditor {
        return new BreadcrumbPeerInplaceEditor(this.cardElement);
    }

    protected internalGetTreeItemText(): string {
        return this.cardElement.items;
    }

    protected internalAddCommands(context: DesignContext, commands: Array<PeerCommand>) {
        super.internalAddCommands(context, commands);

        if (context.dataStructure) {
            commands.push(
                new PeerCommand(
                    {
                        name: "Bind...",
                        alwaysShowName: true,
                        toolTip: "Select a data field to bind this Breadcrumb to.",
                        execute: (command: PeerCommand, clickedElement: HTMLElement) => {
                            let fieldPicker = new FieldPicker(context.dataStructure);
                            fieldPicker.onClose = (sender, wasCancelled) => {
                                if (!wasCancelled) {
                                    this.cardElement.items = fieldPicker.selectedField.asExpression();

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
            BreadcrumbPeer.itemsProperty);

        // propertySheet.add(
        //     PropertySheetCategory.LayoutCategory,
        //     TextBlockPeer.wrapProperty,
        //     TextBlockPeer.maxLinesProperty);

        // propertySheet.add(
        //     PropertySheetCategory.StyleCategory,
        //     TextBlockPeer.fontTypeProperty,
        //     TextBlockPeer.sizeProperty,
        //     TextBlockPeer.weightProperty,
        //     TextBlockPeer.colorProperty,
        //     TextBlockPeer.subtleProperty);
    }

    getToolTip(): string {
        return "Double click to edit";
    }

    initializeCardElement() {
        if (!this.cardElement.items || this.cardElement.items == "") {
            this.cardElement.items = "[{\"text\":\"Folder 1\",\"key\":\"f4\"},{\"text\":\"Folder 2\",\"key\":\"f2\"},{\"text\":\"Folder 3\",\"key\":\"f3\"}]";
        }
    }
}