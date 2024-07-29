import { describe, it, expect, vi, beforeEach } from 'vitest'
import { jsPDF } from 'jspdf'
import {
  getDocHeight,
  getDocWidth,
  getTextHeight,
  centerTextHorizontal,
  resetDocConfig,
  calcCursorYPosition
} from '@/utils/pdfUtils'
import { BaseTextOptions, BlockContext, BaseElementOptions } from '@/types/pdfUtils.types'
import { MontserratRegular } from '../fonts/montserrat-fonts'

const testText = 'Lorem ipsum dolor sit consectetur.'

describe('font utils', () => {
  let doc: jsPDF
  beforeEach(() => {
    doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })
  })

  it('returns the document height', () => {
    const doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })

    const expectedHeight = doc.internal.pageSize.getHeight()
    const height = getDocHeight(doc)

    expect(height).toBe(expectedHeight)
  })

  it('returns the text height with Montserrat font and the default font', () => {
    // Adding Montserrat font to the document
    doc.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular)
    doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal', 400)

    const options: BaseTextOptions = {
      fontSize: 35
    }

    // Setting Montserrat font and font size
    doc.setFont('Montserrat')
    doc.setFontSize(options.fontSize!)

    // Calculating text height with Montserrat font
    const textHeight1 = getTextHeight(doc, testText, getDocWidth(doc), options)

    expect(Math.floor(textHeight1)).toBe(60)

    // Setting default Helvetica font
    doc.setFont('Helvetica')

    // Calculating text height with default font
    const textHeight2 = getTextHeight(doc, testText, getDocWidth(doc), options)

    expect(Math.floor(textHeight2)).toBe(30)
  })

  it('centers the text horizontally', () => {
    const position = centerTextHorizontal(doc, testText, {
      fontSize: 35
    })

    expect(Math.floor(position)).toBe(23)
  })

  it('resets the document configuration', () => {
    doc.setFontSize = vi.fn()
    doc.setFont = vi.fn()

    resetDocConfig(doc)

    expect(doc.setFontSize).toHaveBeenCalledWith(16)
    expect(doc.setFont).toHaveBeenCalledWith('Helvetica')
  })

  it('calculates cursor Y position correctly', () => {
    const blockContext1 = new BlockContext()

    const options1: BaseElementOptions = {}

    const cursorYPosition1 = calcCursorYPosition(blockContext1, options1)
    expect(cursorYPosition1).toBe(0)

    const blockContext2 = new BlockContext({
      numberOfElements: 0,
      cursorYPosition: 10,
      paddingVertical: 10
    })

    const option2: BaseElementOptions = {
      marginTop: 5,
      marginBottom: 5
    }

    const cursorYPosition2 = calcCursorYPosition(blockContext2, option2)
    expect(cursorYPosition2).toBe(40)

    const blockContext3 = new BlockContext({
      numberOfElements: 2,
      cursorYPosition: 0,
      paddingVertical: 10
    })

    const option3: BaseElementOptions = {}

    const cursorYPosition3 = calcCursorYPosition(blockContext3, option3)
    expect(cursorYPosition3).toBe(10)
  })
})
