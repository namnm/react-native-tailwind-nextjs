import { AccordionPage } from '#/pages/accordion'
import { AlertPage } from '#/pages/alert'
import { ButtonPage } from '#/pages/button'
import { ButtonGroupPage } from '#/pages/button/button-group'
import { ButtonToggleGroupPage } from '#/pages/button/button-toggle-group'
import { HomePage } from '#/pages/home'
import {
  rAccordion,
  rAlert,
  rButton,
  rButtonGroup,
  rButtonToggleGroup,
  rHome,
  rTextInput,
} from '#/pages/route-paths'
import { TextInputPage } from '#/pages/text-input'

// we define all routes for native
// need to explicit define it here to make sure not
// accidentally import all routes into web bundle
export const routesNative = {
  [rHome]: HomePage,
  [rAccordion]: AccordionPage,
  [rButton]: ButtonPage,
  [rButtonGroup]: ButtonGroupPage,
  [rButtonToggleGroup]: ButtonToggleGroupPage,
  [rAlert]: AlertPage,
  [rTextInput]: TextInputPage,
}
export type Routes = typeof routesNative
