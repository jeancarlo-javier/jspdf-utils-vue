import { describe, it, expect } from 'vitest'
import { jsPDF } from 'jspdf'
import { getDocWidth, getTextHeight } from '@/utils/pdfUtils'
import { BaseTextOptions } from '@/types/pdfUtils.types'
import { MontserratRegular } from '../fonts/montserrat-fonts'

describe('font utils', () => {
  it('returns the text height with Montserrat font and the default font', () => {
    const doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })

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
    const textHeight1 = getTextHeight(
      doc,
      'Lorem ipsum dolor sit consectetur.',
      getDocWidth(doc),
      options
    )

    expect(Math.floor(textHeight1)).toBe(60)

    // Setting default Helvetica font
    doc.setFont('Helvetica')

    // Calculating text height with default font
    const textHeight2 = getTextHeight(
      doc,
      'Lorem ipsum dolor sit consectetur.',
      getDocWidth(doc),
      options
    )

    expect(Math.floor(textHeight2)).toBe(30)
  })
})
