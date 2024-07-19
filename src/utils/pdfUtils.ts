import type { jsPDF } from 'jspdf'
import type { addTextOptions, textOptions, blockContext } from '../types/pdfUtils.types'

// Doc Utils
export function getDocWidth(doc: jsPDF) {
  return doc.internal.pageSize.getWidth()
}

export function getDocHeight(doc: jsPDF) {
  return doc.internal.pageSize.getHeight()
}

// Cursor Utils
export function calcCursorYPosition(
  doc: jsPDF,
  blockContext: blockContext,
  text: string,
  addTextOptions: addTextOptions,
  options: textOptions
): number {
  let cursorYPosition: number = blockContext.cursorYPosition

  cursorYPosition += getTextHeight(doc, text, options.maxWidth || 0, addTextOptions)
  cursorYPosition += addTextOptions.marginBottom || 0

  if (blockContext.numberOfElements === 0) cursorYPosition += blockContext.docPadding

  return cursorYPosition
}

// Text Utils
export function getTextWidth(doc: jsPDF, text: string, addTextOptions: addTextOptions) {
  const maxWidth = addTextOptions.maxWidth

  const textWidth =
    (doc.getStringUnitWidth(text) * addTextOptions.fontSize) / doc.internal.scaleFactor

  if (maxWidth && textWidth > maxWidth) {
    return maxWidth
  }

  return textWidth
}

export function getTextHeight(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  addTextOptions: addTextOptions
  // maxHeight?: number
): number {
  const fontSize = addTextOptions.fontSize || 16
  const fontFamily = addTextOptions.fontFamily || 'helvetica'

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
  addTextOptions: addTextOptions
): number {
  const docWidth = getDocWidth(doc)
  const textWidth = getTextWidth(doc, text, addTextOptions)
  return docWidth / 2 - textWidth / 2
}

export function getMaxTextWidth(
  textMaxWidth: number,
  docMaxWidth: number,
  blockMaxWidth: number,
  docPadding: number
): number {
  let maxWidth = textMaxWidth || blockMaxWidth || docMaxWidth

  if (docMaxWidth === maxWidth) {
    maxWidth -= docPadding * 2
  }

  return maxWidth
}
