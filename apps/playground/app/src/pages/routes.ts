import type { rButton, rHome } from '#/pages/route-paths'
import type { Routes } from '#/pages/routes.native'

export { type Routes } from '#/pages/routes.native'
export type RoutesK = keyof Routes

export type RoutesData = {
  [rHome]: never
  [rButton]: never
}
