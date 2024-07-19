import {
  getMaxTextWidth,
  calcCursorYPosition,
  getDocWidth,
  centerTextHorizontal
} from './pdfUtils'
import type { addTextOptions, textOptions, blockContext } from '../types/pdfUtils.types'
import type { jsPDF } from 'jspdf'

export function addText(
  doc: jsPDF,
  blockContext: blockContext,
  text: string,
  addTextOptions: addTextOptions
): void {
  doc.setFontSize(addTextOptions.fontSize)

  const options: textOptions = {}

  options.maxWidth = getMaxTextWidth(
    addTextOptions.maxWidth || 0,
    getDocWidth(doc),
    blockContext.maxWidth || 0,
    blockContext.docPadding
  )

  let textX = addTextOptions.x || 0
  let textY = addTextOptions.y || 0

  if (addTextOptions.textCenter) textX = centerTextHorizontal(doc, text, addTextOptions)

  if (blockContext.docPadding) {
    textX += blockContext.docPadding

    if (blockContext.numberOfElements === 0) textY += blockContext.docPadding
  }

  if (addTextOptions.topOffset) textY += addTextOptions.topOffset
  if (addTextOptions.leftOffset) textX += addTextOptions.leftOffset
  if (addTextOptions.rightOffset) textX -= addTextOptions.rightOffset
  if (addTextOptions.bottomOffset) textY -= addTextOptions.bottomOffset

  if (blockContext.cursorYPosition) textY += blockContext.cursorYPosition

  doc.text(text, textX, textY || 0, {
    baseline: 'top',
    ...options
  })

  blockContext.cursorYPosition = calcCursorYPosition(
    doc,
    blockContext,
    text,
    addTextOptions,
    options
  )

  blockContext.numberOfElements++
}

export default {
  addText
}
