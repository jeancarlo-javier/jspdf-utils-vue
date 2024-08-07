import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDocHeight, getDocWidth, resetDocConfig } from '@/utils/pdfUtils'
import { jsPDF } from 'jspdf'

describe('Document Dimensions', () => {
  let doc: jsPDF

  beforeEach(() => {
    doc = new jsPDF({
      filters: ['ASCIIHexEncode'],
      orientation: 'portrait',
      format: 'A4',
      unit: 'px'
    })
  })

  it('getDocHeight returns the document height', () => {
    const expectedHeight = doc.internal.pageSize.getHeight()
    const height = getDocHeight(doc)
    expect(height).toBe(expectedHeight)
  })

  it('getDocWidth returns the document width', () => {
    const expectedWidth = doc.internal.pageSize.getWidth()
    const width = getDocWidth(doc)
    expect(width).toBe(expectedWidth)
  })

  it('resetDocConfig resets the document configuration', () => {
    doc.setFontSize = vi.fn()
    doc.setFont = vi.fn()

    resetDocConfig(doc)

    expect(doc.setFontSize).toHaveBeenCalledWith(16)
    expect(doc.setFont).toHaveBeenCalledWith('Helvetica')
  })
})
