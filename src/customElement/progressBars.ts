import * as AC from 'adaptivecards';
export class ProgressBar extends AC.CardElement {
  static readonly JsonTypeName = 'ProgressBar';

  //#region Schema

  static readonly titleProperty = new AC.StringProperty(AC.Versions.v1_0, 'title', true);
  static readonly valueProperty = new AC.NumProperty(AC.Versions.v1_0, 'value');

  @AC.property(ProgressBar.titleProperty)
  get title(): string | undefined {
    return this.getValue(ProgressBar.titleProperty);
  }

  set title(value: string) {
    if (this.title !== value) {
      this.setValue(ProgressBar.titleProperty, value);

      this.updateLayout();
    }
  }

  @AC.property(ProgressBar.valueProperty)
  get value(): number {
    return this.getValue(ProgressBar.valueProperty);
  }

  set value(value: number) {
    let adjustedValue = value;

    if (adjustedValue < 0) {
      adjustedValue = 0;
    } else if (adjustedValue > 100) {
      adjustedValue = 100;
    }

    if (this.value !== adjustedValue) {
      this.setValue(ProgressBar.valueProperty, adjustedValue);

      this.updateLayout();
    }
  }

  //#endregion

  private _titleElement: HTMLElement;
  private _leftBarElement: HTMLElement;
  private _rightBarElement: HTMLElement;

  protected internalRender(): HTMLElement {
    let element = document.createElement('div');

    let textBlock = new AC.TextBlock();
    textBlock.setParent(this);
    textBlock.text = this.title;
    textBlock.wrap = true;

    this._titleElement = textBlock.render();
    this._titleElement.style.marginBottom = '6px';

    let progressBarElement = document.createElement('div');
    progressBarElement.style.display = 'flex';

    this._leftBarElement = document.createElement('div');
    this._leftBarElement.style.height = '6px';
    this._leftBarElement.style.backgroundColor = AC.stringToCssColor(
      this.hostConfig.containerStyles.emphasis.foregroundColors.accent.default
    );

    this._rightBarElement = document.createElement('div');
    this._rightBarElement.style.height = '6px';
    this._rightBarElement.style.backgroundColor = AC.stringToCssColor(
      this.hostConfig.containerStyles.emphasis.backgroundColor
    );

    progressBarElement.append(this._leftBarElement, this._rightBarElement);

    element.append(this._titleElement, progressBarElement);

    return element;
  }

  getJsonTypeName(): string {
    return ProgressBar.JsonTypeName;
  }

  updateLayout(processChildren: boolean = true) {
    super.updateLayout(processChildren);

    if (this.renderedElement) {
      if (this.title) {
        this._titleElement.style.display = 'none';
      } else {
        this._titleElement.style.removeProperty('display');
      }

      this._leftBarElement.style.flex = '1 1 ' + this.value + '%';
      this._rightBarElement.style.flex = '1 1 ' + (100 - this.value) + '%';
    }
  }
}
