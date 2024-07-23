export interface BlockContextBase {
  x?: number
  y?: number
  numberOfElements: number
  cursorYPosition: number
  maxWidth?: number
  paddingHorizontal: number
  paddingVertical: number
}

export class BlockContext implements BlockContextBase {
  numberOfElements: number
  cursorYPosition: number
  maxWidth?: number
  paddingHorizontal: number
  paddingVertical: number
  x?: number
  y?: number

  constructor({
    numberOfElements = 0,
    cursorYPosition = 0,
    maxWidth,
    paddingHorizontal = 0,
    paddingVertical = 0,
    x = 0,
    y = 0
  }: Partial<BlockContextBase> = {}) {
    this.numberOfElements = numberOfElements
    this.cursorYPosition = cursorYPosition
    this.maxWidth = maxWidth
    this.paddingHorizontal = paddingHorizontal
    this.paddingVertical = paddingVertical
    this.x = x
    this.y = y
  }
}

// Offsets
export interface XOffsetOptions {
  leftOffset?: number
  rightOffset?: number
}

export interface YOffsetOptions {
  topOffset?: number
  bottomOffset?: number
}

export interface Offsets extends XOffsetOptions, YOffsetOptions {}

// Base Element Options
export interface BaseElementOptions extends Offsets {
  x?: number
  y?: number
  maxWidth?: number
  marginBottom?: number // Margin - Sets the margin around the element
  // Offsets - Moves the element position up, down, left or right
}

// Custom Text Options
export interface BaseTextOptions extends BaseElementOptions {
  fontSize: number
  fontFamily?: string
  textCenter?: boolean // Centers the text horizontally
}

export interface AddLineOptions extends BaseElementOptions {}
