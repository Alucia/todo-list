import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
// components
import { InputModule } from "./input/input.module";
import { CheckboxModule } from "./checkbox/checkbox.module";
import { ButtonModule } from "./button/button.module";

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputModule,
    CheckboxModule,
    ButtonModule
  ],
  exports: [ ],
  declarations: [ ],
})
export class ComponentsModule { }
