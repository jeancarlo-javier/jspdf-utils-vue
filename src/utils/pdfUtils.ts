import type { jsPDF } from 'jspdf'
import type {
  BaseTextOptions,
  BaseElementOptions,
  BlockContext,
  YOffsetOptions,
  MarginOptions
} from '../types/pdfUtils.types'

// Doc Utils
export function getDocWidth(doc: jsPDF) {
  return doc.internal.pageSize.getWidth()
}

export function getDocHeight(doc: jsPDF) {
  return doc.internal.pageSize.getHeight()
}

// Cursor Utils
export function calcCursorYPosition(
  blockContext: BlockContext,
  options?: BaseElementOptions
): number {
  let cursorYPosition: number = blockContext.cursorYPosition

  if (blockContext.numberOfElements === 0) cursorYPosition += blockContext.paddingVertical

  if (options) {
    cursorYPosition += options.marginBottom || 0
    cursorYPosition += options.marginTop || 0
  }

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
  let cursorYPosition: number = calcCursorYPosition(blockContext, options)

  cursorYPosition += getTextHeight(doc, text, maxWidth || 0, options)

  return cursorYPosition
}

// Text Utils
export function getTextWidth(doc: jsPDF, text: string, options: BaseTextOptions) {
  const maxWidth = options.maxWidth

  const fontSize = options.fontSize || 16

  const textWidth = (doc.getStringUnitWidth(text) * fontSize) / doc.internal.scaleFactor

  if (maxWidth && textWidth > maxWidth) {
    return maxWidth
  }

  return textWidth
}

export function getTextHeight(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  options: BaseTextOptions
  // maxHeight?: number
): number {
  const fontSize = options.fontSize || 16
  const fontFamily = options.fontFamily || 'helvetica'

  // Set the font and size in the jsPDF document
  doc.setFont(fontFamily)
  doc.setFontSize(fontSize)

  // Calculate the line height based on the font size
  const lineHeight = (doc.getLineHeightFactor() * fontSize) / doc.internal.scaleFactor

  // Split the text into lines based on the maxWidth
  const lines = doc.splitTextToSize(text, maxWidth)

  // Calculate the total text height
  const totalHeight = lines.length * lineHeight

  // Ensure the total height does not exceed the maxHeight
  // if (totalHeight > maxHeight) {
  //   const maxLines = Math.floor(maxHeight / lineHeight)
  //   totalHeight = maxLines * lineHeight
  // }

  return totalHeight
}

export function centerTextHorizontal(
  doc: jsPDF,
  text: string,
  options: BaseTextOptions
): number {
  // TODO: Improve this function
  const docWidth = getDocWidth(doc)
  const textWidth = getTextWidth(doc, text, options)

  return docWidth / 2 - textWidth / 2
}

export function getMaxTextWidth(
  textMaxWidth: number,
  docMaxWidth: number,
  blockContext: BlockContext
): number {
  const bloackMaxWidth = blockContext.maxWidth || 0
  let maxWidth = textMaxWidth || bloackMaxWidth || docMaxWidth

  // if (docMaxWidth === maxWidth) {
  //   maxWidth -= blockContext.paddingHorizontal * 2
  // }

  if (blockContext.paddingHorizontal) maxWidth -= blockContext.paddingHorizontal * 2

  return maxWidth
}

export function calcXPosition(
  doc: jsPDF,
  blockContext: BlockContext,
  x: number,
  text: string,
  options: BaseTextOptions & BaseTextOptions
) {
  const { leftOffset, rightOffset } = options

  if (blockContext.x) x += blockContext.x

  if (blockContext.paddingHorizontal) x += blockContext.paddingHorizontal

  if (leftOffset) x += leftOffset
  if (rightOffset) x -= rightOffset

  const textWidth = getTextWidth(doc, text, options)

  switch (options.textAlign) {
    case 'center':
      x += textWidth / 2
      break
    case 'right':
      x += textWidth
      break
    default:
      break
  }

  return x
}

export function calcYPosition(
  y: number,
  blockContext: BlockContext,
  options: YOffsetOptions & MarginOptions
) {
  const { topOffset, bottomOffset } = options
  const { marginTop } = options

  if (blockContext.y) y += blockContext.y

  if (blockContext.paddingVertical && blockContext.numberOfElements === 0) {
    if (blockContext.numberOfElements === 0) y += blockContext.paddingVertical
  }

  if (topOffset) y += topOffset
  if (bottomOffset) y -= bottomOffset

  if (marginTop) y += marginTop

  y += blockContext.cursorYPosition || 0

  return y
}
