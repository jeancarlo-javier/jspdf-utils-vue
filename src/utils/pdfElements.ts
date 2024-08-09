import {
  resetDocConfig,
  getMaxTextWidth,
  calcCursorYPosition,
  getTextHeight,
  getDocWidth,
  centerTextHorizontal,
  calcXPosition,
  calcYPosition,
  addNewPageIfNeeded,
  getMaxElementWidth
} from './pdfUtils'
import {
  setDocumentFont,
  adjustTextCursorPosition,
  getTextSettings,
  calculateLineYPosition,
  calculateLineXPosition,
  adjustLineCursorPosition
} from './elementUtils'

import type {
  BaseTextOptions,
  BaseLineOptions
  // BaseListOptions
} from '../types/pdfUtils.types'
import BlockContext from '../types/blockContext'
import type { jsPDF } from 'jspdf'

export function addText(
  doc: jsPDF,
  blockContext: BlockContext,
  text: string,
  options: BaseTextOptions = {}
): void {
  const {
    fontSize = 16,
    fontFamily = 'Helvetica',
    fontStyle = 'normal',
    fontWeight = 400,
    lineHeight = 1.15,
    maxWidth = 0,
    textAlign,
    textCenter
  } = options

  let { x: initialX = 0, y: initialY = 0 } = options

  setDocumentFont(doc, fontFamily, fontStyle, fontWeight, fontSize)

  if (blockContext.numberOfElements > 0) {
    adjustTextCursorPosition(blockContext)
  }

  const elementMaxWidth = getMaxElementWidth(doc, blockContext, maxWidth || 0)
  console.log('🚀 ~ elementMaxWidth:', elementMaxWidth)
  const _elementMaxWidth = getMaxTextWidth(maxWidth || 0, getDocWidth(doc), blockContext)
  console.log('🚀 ~ _elementMaxWidth:', _elementMaxWidth)

  const textHeight = getTextHeight(doc, text, elementMaxWidth || 0, options)

  // Apply page break before adding text if needed
  addNewPageIfNeeded(doc, blockContext, textHeight)

  if (textCenter) initialX = centerTextHorizontal(doc, text, options)

  initialX = calcXPosition(doc, blockContext, initialX, options, text)
  initialY = calcYPosition(initialY, blockContext, options)

  const textSettings = getTextSettings(elementMaxWidth, textAlign, lineHeight)

  doc.text(text, initialX, initialY, textSettings)

  const cursorYPosition = calcCursorYPosition(blockContext, options, textHeight)

  blockContext.updateCursorYPosition(cursorYPosition)

  blockContext.addElement()

  resetDocConfig(doc)
}

export function addLine(
  doc: jsPDF,
  blockContext: BlockContext,
  options: BaseLineOptions = {}
): void {
  const {
    x: initialX = 0,
    y: initialY = 0,
    maxWidth,
    topOffset,
    bottomOffset,
    marginTop,
    marginBottom
  } = options

  if (blockContext.numberOfElements > 0) {
    blockContext.updateCursorYPosition(
      blockContext.cursorYPosition - blockContext.paddingVertical
    )
  }

  const x = calculateLineXPosition(doc, blockContext, initialX, options)
  const y = calculateLineYPosition(initialY, blockContext, {
    topOffset,
    bottomOffset,
    marginTop,
    marginBottom
  })

  const x2 = x + getMaxElementWidth(doc, blockContext, maxWidth)

  doc.line(x, y, x2, y)

  adjustLineCursorPosition(blockContext, options)

  addNewPageIfNeeded(doc, blockContext, 1)

  blockContext.addElement()
}

// export function addList(
//   doc: jsPDF,
//   blockContext: BlockContext,
//   list: string[],
//   options: BaseListOptions
// ): void {}

export default {
  addText,
  addLine
  // addList
}
