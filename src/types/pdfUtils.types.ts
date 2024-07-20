export interface BlockContextBase {
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

  constructor({
    numberOfElements = 0,
    cursorYPosition = 0,
    maxWidth,
    paddingHorizontal = 10,
    paddingVertical = 10
  }: Partial<BlockContextBase> = {}) {
    this.numberOfElements = numberOfElements
    this.cursorYPosition = cursorYPosition
    this.maxWidth = maxWidth
    this.paddingHorizontal = paddingHorizontal
    this.paddingVertical = paddingVertical
  }
}

export interface BaseElementOptions {
  // Margin - Sets the margin around the text
  marginBottom?: number
}

export interface BaseTextOptions extends BaseElementOptions {
  maxWidth?: number
  x?: number
  y?: number
}

export interface AddTextOptions extends BaseTextOptions {
  // Font
  fontSize: number
  fontFamily?: string
  // Text - Centers the text horizontally
  textCenter?: boolean
  // Offset - Moves the text position up, down, left or right
  topOffset?: number
  leftOffset?: number
  rightOffset?: number
  bottomOffset?: number
}

export interface BaseLineOptions extends BaseElementOptions {}

export interface AddLineOptions extends BaseLineOptions {}
