export interface BlockContextBase {
  id: string
  x?: number
  y?: number
  numberOfElements: number
  cursorYPosition: number
  maxWidth?: number
  paddingHorizontal: number
  paddingVertical: number
  pageContext?: PageContext
}

export class BlockContext implements BlockContextBase {
  id: string
  numberOfElements: number
  cursorYPosition: number
  maxWidth?: number
  paddingHorizontal: number
  paddingVertical: number
  x?: number
  y?: number
  pageContext?: PageContext

  constructor({
    id = '',
    numberOfElements = 0,
    cursorYPosition = 0,
    maxWidth,
    paddingHorizontal = 0,
    paddingVertical = 0,
    x = 0,
    y = 0,
    pageContext
  }: Partial<BlockContextBase> = {}) {
    this.id = id
    this.numberOfElements = numberOfElements
    this.cursorYPosition = cursorYPosition
    this.maxWidth = maxWidth
    this.paddingHorizontal = paddingHorizontal
    this.paddingVertical = paddingVertical
    this.x = x
    this.y = y
    this.pageContext = pageContext

    if (this.pageContext) {
      this.cursorYPosition += this.pageContext.paddingVertical || this.pageContext.padding || 0
    }
  }

  updateCursorYPosition(newY: number): void {
    this.cursorYPosition = newY
  }

  resetCursorYPosition(): void {
    this.cursorYPosition = 0
  }

  addElement(): void {
    this.numberOfElements++
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

interface Offsets extends XOffsetOptions, YOffsetOptions {}

interface MarginOptions extends Offsets {
  marginTop?: number
  marginBottom?: number
  marginLeft?: number
  marginRight?: number
}

// Base Element Options
export interface BaseElementOptions extends Offsets, MarginOptions {
  x?: number
  y?: number
  maxWidth?: number
  // Offsets - Moves the element position up, down, left or right
}

// Custom Text Options
export interface BaseTextOptions extends BaseElementOptions {
  fontSize?: number
  fontWeight?: number | string
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  textCenter?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  lineHeight?: number
  center?: boolean
}

export interface BaseLineOptions extends BaseElementOptions {
  center?: boolean
}

export interface BaseListOptions extends BaseElementOptions {
  // bullet?: string
}

export interface PageContext {
  padding?: number
  paddingVertical?: number
  paddingHorizontal?: number
}
