import type { jsPDF } from 'jspdf'
import type {
  BaseTextOptions,
  BaseElementOptions,
  BlockContext
} from '../types/pdfUtils.types'
import type { TextOptionsLight } from 'jspdf'

// Document Utilities
export function getDocWidth(doc: jsPDF): number {
  return doc.internal.pageSize.getWidth()
}

export function getDocHeight(doc: jsPDF): number {
  return doc.internal.pageSize.getHeight()
}

export function resetDocConfig(doc: jsPDF): void {
  doc.setFontSize(16)
  doc.setFont('Helvetica')
}

export function detectPageBreak(
  doc: jsPDF,
  blockContext: BlockContext,
  elementHeight: number
): boolean {
  return blockContext.cursorYPosition + elementHeight > getDocHeight(doc)
}

export function breakPageIfNeeded(
  doc: jsPDF,
  blockContext: BlockContext,
  elementHeight: number
): void {
  if (detectPageBreak(doc, blockContext, elementHeight)) {
    doc.addPage()
    blockContext.resetCursorYPosition()
  }
}

// Cursor Utilities
export function calcCursorYPosition(
  blockContext: BlockContext,
  options?: BaseElementOptions,
  additionalHeight: number = 0
): number {
  let cursorYPosition = blockContext.cursorYPosition

  if (blockContext.numberOfElements === 0) {
    cursorYPosition += blockContext.paddingVertical
  }

  if (options) {
    cursorYPosition += options.marginTop || 0
    cursorYPosition += options.marginBottom || 0
  }

  cursorYPosition += additionalHeight
  cursorYPosition += blockContext.paddingVertical

  return cursorYPosition
}

export function calcCursorYPositionText(
  doc: jsPDF,
  blockContext: BlockContext,
  options: BaseTextOptions,
  maxWidth: number,
  text: string
): number {
  return calcCursorYPosition(
    blockContext,
    options,
    getTextHeight(doc, text, maxWidth, options)
  )
}

// Text Utilities
export function getTextWidth(doc: jsPDF, text: string, options: BaseTextOptions): number {
  const maxWidth = options.maxWidth
  const fontSize = options.fontSize || 16
  const textWidth = (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor

  return maxWidth && textWidth > maxWidth ? maxWidth : textWidth
}

export function getTextHeight(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  options: BaseTextOptions
): number {
  const fontSize = options.fontSize || 16
  const lineHeight =
    ((options.lineHeight || doc.getLineHeightFactor()) * fontSize) / doc.internal.scaleFactor

  const lines = doc.splitTextToSize(text, maxWidth)

  return lines.length * lineHeight
}

export function centerTextHorizontal(
  doc: jsPDF,
  text: string,
  options: BaseTextOptions
): number {
  const docWidth = getDocWidth(doc)
  const textWidth = getTextWidth(doc, text, options)
  return (docWidth - textWidth) / 2
}

export function getMaxTextWidth(
  textMaxWidth: number,
  docMaxWidth: number,
  blockContext: BlockContext
): number {
  let maxWidth = textMaxWidth || blockContext.maxWidth || docMaxWidth
  if (blockContext.paddingHorizontal) {
    maxWidth -= blockContext.paddingHorizontal * 2
  }
  return maxWidth
}

// Element Utilities
// export function centerLineHorizontal(doc: jsPDF, blockContext: BlockContext): number {
//   const docWidth = getDocWidth(doc)
// }

// Position Calculation Utilities
export function calcXPosition(
  doc: jsPDF,
  blockContext: BlockContext,
  x: number,
  options: BaseElementOptions | BaseTextOptions,
  text?: string
): number {
  const { leftOffset, rightOffset } = options

  let textAlign: TextOptionsLight['align'] = 'left'
  if ('textAlign' in options) {
    textAlign = options.textAlign || 'left'
  }

  if (blockContext.x) x += blockContext.x
  if (blockContext.paddingHorizontal) x += blockContext.paddingHorizontal
  if (leftOffset) x += leftOffset
  if (rightOffset) x -= rightOffset

  if (text) {
    const textWidth = getTextWidth(doc, text, options)
    if (textAlign === 'center') {
      x += textWidth / 2
    } else if (textAlign === 'right') {
      x += textWidth
    }
  }

  return x
}

export function calcYPosition(
  y: number,
  blockContext: BlockContext,
  options: BaseElementOptions | BaseTextOptions
): number {
  const { topOffset, bottomOffset, marginTop } = options

  if (blockContext.y) y += blockContext.y
  if (blockContext.paddingVertical && blockContext.numberOfElements === 0) {
    y += blockContext.paddingVertical
  }
  if (topOffset) y += topOffset
  if (bottomOffset) y -= bottomOffset
  if (marginTop) y += marginTop
  y += blockContext.cursorYPosition || 0

  if ('lineHeight' in options) {
    const fontSize: number = options.fontSize || 16

    const lineHeight: number = options.lineHeight || 1.15

    y = y + (lineHeight - 1) * fontSize
  }

  return y
}
