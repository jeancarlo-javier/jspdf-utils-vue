import {
  getMaxTextWidth,
  calcCursorYPosition,
  calcCursorYPositionText,
  getDocWidth,
  centerTextHorizontal,
  calcXPosition,
  calcYPosition
} from './pdfUtils'
import type {
  BaseTextOptions,
  AddLineOptions,
  BaseElementOptions,
  BlockContext
} from '../types/pdfUtils.types'
import type { jsPDF } from 'jspdf'

export function addText(
  doc: jsPDF,
  blockContext: BlockContext,
  text: string,
  options: BaseTextOptions
): void {
  doc.setFontSize(options.fontSize)

  const elementOptions: BaseElementOptions = {
    maxWidth: getMaxTextWidth(options.maxWidth || 0, getDocWidth(doc), blockContext)
  }

  let { x = 0, y = 0 } = options
  const { textCenter } = options

  if (textCenter) x = centerTextHorizontal(doc, text, options)

  x = calcXPosition(x, blockContext, {
    leftOffset: options.leftOffset,
    rightOffset: options.rightOffset
  })

  y = calcYPosition(y, blockContext, {
    topOffset: options.topOffset,
    bottomOffset: options.bottomOffset
  })

  doc.text(text, x, y, {
    baseline: 'top',
    maxWidth: elementOptions.maxWidth
  })

  blockContext.cursorYPosition = calcCursorYPositionText(
    doc,
    blockContext,
    options,
    elementOptions.maxWidth || 0,
    text
  )

  blockContext.numberOfElements++
}

export function addLine(
  doc: jsPDF,
  blockContext: BlockContext,
  options: AddLineOptions
  // addTextOptions: addTextOptions
): void {
  doc.line(0, blockContext.cursorYPosition, getDocWidth(doc), blockContext.cursorYPosition)

  blockContext.cursorYPosition = calcCursorYPosition(blockContext, {
    marginBottom: options.marginBottom
  })
}

export default {
  addText,
  addLine
}
