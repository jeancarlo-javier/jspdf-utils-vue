export interface BlockContext {
  numberOfElements: number
  cursorYPosition: number
  docPadding: number
  maxWidth?: number
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
