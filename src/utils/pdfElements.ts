import {
  resetDocConfig,
  getMaxTextWidth,
  calcCursorYPosition,
  getTextHeight,
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
import type { jsPDF, TextOptionsLight } from 'jspdf'

export function addText(
  doc: jsPDF,
  blockContext: BlockContext,
  text: string,
  options: BaseTextOptions = {}
): void {
  const fontSize = options.fontSize || 16
  const fontFamily = options.fontFamily || 'Helvetica'
  const lineHeight = options.lineHeight || 1.15

  doc.setFont(fontFamily, options.fontStyle || 'normal', options.fontWeight || 400)
  doc.setFontSize(fontSize)

  if (blockContext.numberOfElements > 0) {
    blockContext.updateCursorYPosition(
      blockContext.cursorYPosition - blockContext.paddingVertical
    )
  }

  const elementOptions: BaseElementOptions = {
    maxWidth: getMaxTextWidth(options.maxWidth || 0, getDocWidth(doc), blockContext)
  }

  let { x = 0, y = 0 } = options
  const { textCenter } = options

  if (textCenter) x = centerTextHorizontal(doc, text, options)

  x = calcXPosition(doc, blockContext, x, options, text)

  y = calcYPosition(y, blockContext, options)

  const textSettings: TextOptionsLight = {
    baseline: 'top',
    maxWidth: elementOptions.maxWidth,
    align: options.textAlign,
    renderingMode: 'fill',
    lineHeightFactor: lineHeight
  }

  doc.text(text, x, y, textSettings)

  const cursorYPosition = calcCursorYPosition(
    blockContext,
    options,
    getTextHeight(doc, text, elementOptions.maxWidth || 0, options)
  )

  blockContext.updateCursorYPosition(cursorYPosition)

  blockContext.addElement()

  resetDocConfig(doc)
}

export function addLine(
  doc: jsPDF,
  blockContext: BlockContext,
  options: AddLineOptions = {}
): void {
  if (blockContext.numberOfElements > 0) {
    blockContext.updateCursorYPosition(
      blockContext.cursorYPosition - blockContext.paddingVertical
    )
  }

  let { x = 0, y = 0 } = options
  const { maxWidth } = options

  y = calcYPosition(y, blockContext, {
    topOffset: options.topOffset,
    bottomOffset: options.bottomOffset,
    marginTop: options.marginTop,
    marginBottom: options.marginBottom
  })
  x = calcXPosition(doc, blockContext, x, options)

  const x2 = x + (maxWidth || getDocWidth(doc))

  doc.line(x, y, x2, y)

  blockContext.updateCursorYPosition(calcCursorYPosition(blockContext, options, options.y))

  blockContext.addElement()
}

export default {
  addText,
  addLine
}
