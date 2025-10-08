/// <reference types="vite/client" />

import { ITheme } from "@/edikit";

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {}
}
