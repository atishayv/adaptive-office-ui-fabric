// Below is sample json
// {
//     "type": "AdaptiveCard",
//     "body": [
//         {
//             "type": "Breadcrumb",
//             "items": "[{\"text\":\"Folder 1\",\"key\":\"f4\"},{\"text\":\"Folder 2\",\"key\":\"f2\"},{\"text\":\"Folder 3\",\"key\":\"f3\"}]"
//         }
//     ],
//     "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//     "version": "1.3"
// }

import * as AC from 'adaptivecards';
import * as ReactDOM from "react-dom";
import { getBreadCrumbElement } from './BreadcrumbElement';
import { IBreadcrumbItem, initializeIcons } from "@fluentui/react";
initializeIcons()


export class Breadcrumb extends AC.CardElement {
  static readonly JsonTypeName = 'Breadcrumb';

  //#region Schema

  static readonly items = new AC.StringProperty(AC.Versions.v1_2, 'items', true);

  @AC.property(Breadcrumb.items)
  get items(): string | undefined {
    return this.getValue(Breadcrumb.items);
  }

  set items(value: string) {
    if (this.items !== value) {
      this.setValue(Breadcrumb.items, value);

      this.updateLayout();
    }
  }


  //#endregion

  private _breadCrumbElement: JSX.Element;

  protected internalRender(): HTMLElement {

    this._breadCrumbElement = getBreadCrumbElement(this.items)

    const element = document.createElement("div");
    ReactDOM.render(this._breadCrumbElement, element);
    element.style.width = "100%";
    return element;
  }

  getJsonTypeName(): string {
    return Breadcrumb.JsonTypeName;
  }

  updateLayout(processChildren: boolean = true) {
    super.updateLayout(processChildren);

    if (this.renderedElement) {
      if (!this.items) {
        this._breadCrumbElement = null;
      } else {
        this._breadCrumbElement = getBreadCrumbElement(this.items)
      }
    }
  }
}
