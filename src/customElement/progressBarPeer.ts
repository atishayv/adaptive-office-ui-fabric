import {
  ActionPropertyEditor,
  TypedCardElementPeer,
  Versions,
  NumberPropertyEditor,
  EnumPropertyEditor,
  ContainerStylePropertyEditor,
  BooleanPropertyEditor,
  CompoundPropertyEditor,
  StringPropertyEditor,
  PropertySheet,
  PropertySheetCategory,
  ContainerPeer,
  CardDesignerSurface,
  DesignerPeer,
} from "adaptivecards-designer";
import * as Adaptive from "adaptivecards";
import { ProgressBar } from "./progressBars";

export class ProgressBarPeer extends TypedCardElementPeer<ProgressBar> {
  static readonly titleProperty = new StringPropertyEditor(
    Versions.v1_0,
    "title",
    "Title",
    true
  );
  static readonly valueProperty = new NumberPropertyEditor(
    Versions.v1_0,
    "value",
    "Value",
    10
  );
  static readonly fontTypeProperty = new EnumPropertyEditor(
    Versions.v1_2,
    "fontType",
    "Font type",
    Adaptive.FontType
  );
  static readonly sizeProperty = new EnumPropertyEditor(
    Versions.v1_0,
    "size",
    "Size",
    Adaptive.TextSize
  );
  static readonly weightProperty = new EnumPropertyEditor(
    Versions.v1_0,
    "weight",
    "Weight",
    Adaptive.TextWeight
  );
  static readonly colorProperty = new EnumPropertyEditor(
    Versions.v1_0,
    "color",
    "Color",
    Adaptive.TextColor
  );
  static readonly subtleProperty = new BooleanPropertyEditor(
    Versions.v1_0,
    "subtle",
    "Subtle"
  );

  populatePropertySheet(
    propertySheet: PropertySheet,
    defaultCategory: string = PropertySheetCategory.DefaultCategory
  ) {
    super.populatePropertySheet(propertySheet, defaultCategory);

    propertySheet.add(
      defaultCategory,
      ProgressBarPeer.titleProperty,
      ProgressBarPeer.valueProperty
    );

    // propertySheet.add(
    //   PropertySheetCategory.StyleCategory,
    //   ProgressBarPeer.fontTypeProperty,
    //   ProgressBarPeer.sizeProperty,
    //   ProgressBarPeer.weightProperty,
    //   ProgressBarPeer.colorProperty,
    //   ProgressBarPeer.subtleProperty
    // );
  }

  initializeCardElement() {
    if (!this.cardElement.title || this.cardElement.title == "") {
      this.cardElement.title = "ProgressBar element";
    }

    this.cardElement.value = 10;
  }
}
