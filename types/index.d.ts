/// <reference types="pixi.js" />

declare namespace PIXI {
    export interface Container {
        draggify(): void
        droppify(): void
    }
}

declare module '@amoy/draggify' {
    export function useDrag(target: PIXI.Container): void
    export function useDrop(target: PIXI.Container): void
    export default function draggify(): void
}