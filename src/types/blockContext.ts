import type { PageContext, BlockContextBase } from '../types/pdfUtils.types'

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
