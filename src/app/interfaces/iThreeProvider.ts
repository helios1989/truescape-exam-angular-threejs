
import { InjectionToken } from "@angular/core";

export const THREE_PROVIDER = new InjectionToken("iThreeProvider");

export interface iThreeProvider {
    renderTerrain(canvas: any,  pathLoader: any): void
}