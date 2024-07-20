import {
  getMaxTextWidth,
  calcCursorYPosition,
  calcCursorYPositionText,
  getDocWidth,
  centerTextHorizontal
} from './pdfUtils'
import type {
  AddTextOptions,
  AddLineOptions,
  BaseTextOptions,
  BlockContext
} from '../types/pdfUtils.types'
import type { jsPDF } from 'jspdf'

export function addText(
  doc: jsPDF,
  blockContext: BlockContext,
  text: string,
  options: AddTextOptions
): void {
  doc.setFontSize(options.fontSize)

  const textOptions: BaseTextOptions = {}

  textOptions.maxWidth = getMaxTextWidth(options.maxWidth || 0, getDocWidth(doc), blockContext)

  let textX = options.x || 0
  let textY = options.y || 0

  if (options.textCenter) textX = centerTextHorizontal(doc, text, options)

  if (blockContext.paddingHorizontal) {
    textX += blockContext.paddingHorizontal

    if (blockContext.numberOfElements === 0) textY += blockContext.paddingVertical
  }

  if (options.topOffset) textY += options.topOffset
  if (options.leftOffset) textX += options.leftOffset
  if (options.rightOffset) textX -= options.rightOffset
  if (options.bottomOffset) textY -= options.bottomOffset

  if (blockContext.cursorYPosition) textY += blockContext.cursorYPosition

  doc.text(text, textX, textY || 0, {
    baseline: 'top',
    ...textOptions
  })

  blockContext.cursorYPosition = calcCursorYPositionText(
    doc,
    blockContext,
    options,
    textOptions.maxWidth,
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
