export interface textOptions {
  maxWidth?: number
}

export interface addTextOptions extends textOptions {
  // Position - Sets the default x and y position of the text
  x?: number
  y?: number
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
  // Margin - Sets the margin around the text
  marginBottom?: number
}

export interface blockContext {
  numberOfElements: number
  cursorYPosition: number
  docPadding: number
  maxWidth?: number
}
