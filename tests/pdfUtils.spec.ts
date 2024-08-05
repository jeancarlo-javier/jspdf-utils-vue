import { describe, it, expect, vi, beforeEach } from 'vitest'
import { jsPDF } from 'jspdf'
import {
  getDocHeight,
  getDocWidth,
  getTextHeight,
  centerTextHorizontal,
  resetDocConfig,
  calcCursorYPosition,
  calcXPosition,
  getTextWidth,
  detectPageBreak
} from '@/utils/pdfUtils'
import { BaseTextOptions, BlockContext, BaseElementOptions } from '@/types/pdfUtils.types'
import { MontserratRegular } from '../fonts/montserrat-fonts'

const testText = 'Lorem ipsum dolor sit consectetur.'

describe('PDF Utils', () => {
  let doc: jsPDF

  beforeEach(() => {
    doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })
  })

  describe('getDocHeight', () => {
    it('returns the document height', () => {
      const expectedHeight = doc.internal.pageSize.getHeight()
      const height = getDocHeight(doc)
      expect(height).toBe(expectedHeight)
    })
  })

  describe('getTextHeight', () => {
    it('returns the text height with Montserrat and default fonts', () => {
      // Adding Montserrat font to the document
      doc.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular)
      doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal', 400)

      const options: BaseTextOptions = { fontSize: 35 }

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
  })

  describe('centerTextHorizontal', () => {
    it('centers the text horizontally', () => {
      const position = centerTextHorizontal(doc, testText, { fontSize: 35 })
      expect(Math.floor(position)).toBe(23)
    })
  })

  describe('resetDocConfig', () => {
    it('resets the document configuration', () => {
      doc.setFontSize = vi.fn()
      doc.setFont = vi.fn()

      resetDocConfig(doc)

      expect(doc.setFontSize).toHaveBeenCalledWith(16)
      expect(doc.setFont).toHaveBeenCalledWith('Helvetica')
    })
  })

  describe('calcCursorYPosition', () => {
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
      const options2: BaseElementOptions = { marginTop: 5, marginBottom: 5 }
      const cursorYPosition2 = calcCursorYPosition(blockContext2, options2)
      expect(cursorYPosition2).toBe(40)

      const blockContext3 = new BlockContext({
        numberOfElements: 2,
        cursorYPosition: 0,
        paddingVertical: 10
      })
      const options3: BaseElementOptions = {}
      const cursorYPosition3 = calcCursorYPosition(blockContext3, options3)
      expect(cursorYPosition3).toBe(10)
    })
  })

  describe('calcXPosition', () => {
    describe('basic position calculation', () => {
      it('calculates x position with blockContext.x', () => {
        const blockContext = new BlockContext({ x: 100 })
        const x = calcXPosition(doc, blockContext, 0, {})
        expect(x).toBe(100)
      })

      it('calculates x position with paddingHorizontal', () => {
        const blockContext = new BlockContext({ paddingHorizontal: 20 })
        const x = calcXPosition(doc, blockContext, 0, {})
        expect(x).toBe(20)
      })

      it('calculates x position with leftOffset', () => {
        const blockContext = new BlockContext({})
        const options: BaseTextOptions = { leftOffset: 10 }
        const x = calcXPosition(doc, blockContext, 0, options)
        expect(x).toBe(10)
      })

      it('calculates x position with rightOffset', () => {
        const blockContext = new BlockContext({})
        const options: BaseTextOptions = { rightOffset: 10 }
        const x = calcXPosition(doc, blockContext, 0, options)
        expect(x).toBe(-10)
      })
    })

    describe('position calculation with text alignment', () => {
      it('calculates x position with text aligned center', () => {
        const blockContext = new BlockContext({})
        const options: BaseTextOptions = { textAlign: 'center' }
        const textWidth = getTextWidth(doc, testText, options)

        const x = calcXPosition(doc, blockContext, 0, options, testText)

        expect(Math.floor(x)).toBe(Math.floor(textWidth / 2))
      })

      it('calculates x position with text aligned right', () => {
        const blockContext = new BlockContext({})
        const options: BaseTextOptions = { textAlign: 'right' }
        const textWidth = getTextWidth(doc, testText, options)

        const x = calcXPosition(doc, blockContext, 0, options, testText)
        expect(Math.floor(x)).toBe(Math.floor(textWidth))
      })

      it('calculates x position with text aligned left (default)', () => {
        const blockContext = new BlockContext({})
        const options: BaseTextOptions = { textAlign: 'left' }

        const x = calcXPosition(doc, blockContext, 0, options, testText)
        expect(x).toBe(0)
      })
    })
  })

  describe('getTextWidth', () => {
    it('calculates text width with default font size', () => {
      const options: BaseTextOptions = {}

      // Mock getStringUnitWidth function
      doc.getStringUnitWidth = vi.fn().mockReturnValue(50)

      const textWidth = getTextWidth(doc, testText, options)
      expect(textWidth).toBe((50 * 16) / doc.internal.scaleFactor)
    })

    it('calculates text width with specified font size', () => {
      const fontSize = 25
      const options: BaseTextOptions = { fontSize }

      // Mock getStringUnitWidth function
      doc.getStringUnitWidth = vi.fn().mockReturnValue(50)

      const textWidth = getTextWidth(doc, testText, options)
      expect(textWidth).toBe((50 * fontSize) / doc.internal.scaleFactor)
    })

    it('returns maxWidth if text width exceeds maxWidth', () => {
      const text = 'Lorem ipsum'
      const options: BaseTextOptions = { maxWidth: 100, fontSize: 20 }

      // Mock getStringUnitWidth function
      doc.getStringUnitWidth = vi.fn().mockReturnValue(200)

      const textWidth = getTextWidth(doc, text, options)
      expect(textWidth).toBe(100)
    })

    it('returns text width if text width is within maxWidth', () => {
      const text = 'Lorem ipsum'
      const options: BaseTextOptions = { maxWidth: 300, fontSize: 20 }

      // Mock getStringUnitWidth function
      doc.getStringUnitWidth = vi.fn().mockReturnValue(10)

      const textWidth = getTextWidth(doc, text, options)
      expect(textWidth).toBe((10 * 20) / doc.internal.scaleFactor)
    })
  })

  describe('detectPageBreak', () => {
    it('returns true if the currentYPostion is greater than the maxPageHeight', () => {
      const blockContext = new BlockContext({
        cursorYPosition: getDocHeight(doc) + 10
      })

      const pageBreak = detectPageBreak(doc, blockContext, 1)

      expect(pageBreak).toBe(true)
    })

    it('returns false if the currentYPostion is less than the maxPageHeight', () => {
      const blockContext = new BlockContext({
        cursorYPosition: getDocHeight(doc) - 10
      })

      const pageBreak = detectPageBreak(doc, blockContext, 1)

      expect(pageBreak).toBe(false)
    })
  })
})
