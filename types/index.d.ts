/// <reference types="pixi.js" />

declare namespace PIXI {
    export interface Container {
        draggify(): void
    }
}

declare module '@amoy/draggify' {
    export function useDrag(target: PIXI.Container): void
    export default function draggify(): void
}