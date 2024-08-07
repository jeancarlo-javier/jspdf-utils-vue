import type { jsPDF } from 'jspdf'
import { addText, addLine } from '../utils/pdfElements'
import BlockContext from '../types/blockContext'
import { getDocWidth } from '../utils/pdfUtils'

const generateTemplate = (doc: jsPDF) => {
  const blockContext1 = new BlockContext({
    id: 'header'
  })

  const lineHeight = 1.5
  const defaultFontSize = 10
  const h2FontSize = 12
  const h3FontSize = 10
  const fontFamily = 'Montserrat'

  const defaultTextOptions = {
    fontSize: defaultFontSize,
    fontFamily,
    lineHeight
  }

  const docWidth = getDocWidth(doc)

  addText(doc, blockContext1, 'Lorem Ipsum Dolor Sit Amet', {
    ...defaultTextOptions,
    textCenter: true,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  })

  addLine(doc, blockContext1, {
    marginTop: 10,
    marginBottom: 10
  })

  addText(
    doc,
    blockContext1,
    '1234 Ipsum St., Dolor City | +12 34567890 | loremipsum@example.com',
    {
      ...defaultTextOptions,
      textCenter: true,
      fontSize: defaultFontSize,
      marginBottom: 2
    }
  )

  addLine(doc, blockContext1, {
    marginTop: 10,
    marginBottom: 10
  })

  const blockContext2 = new BlockContext({
    cursorYPosition: blockContext1.cursorYPosition,
    paddingHorizontal: 30
  })

  addText(doc, blockContext2, 'Summary', {
    ...defaultTextOptions,
    fontSize: h2FontSize,
    fontWeight: 'bold',
    marginBottom: 3
  })

  addText(
    doc,
    blockContext2,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet accumsan lorem. Praesent tincidunt, felis in sollicitudin blandit, ipsum libero vehicula quam, sit amet accumsan dolor nulla in mi. Phasellus viverra, mi at ultrices tristique, mauris dui ultrices ligula, sed elementum turpis lectus in arcu. Curabitur sed lacus et lorem ultricies tincidunt. Nullam quis magna nec felis tempor scelerisque.',
    {
      ...defaultTextOptions,
      marginBottom: 2
    }
  )

  addLine(doc, blockContext2, {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: docWidth - blockContext2.paddingHorizontal * 2
  })

  // Education
  addText(doc, blockContext2, 'Education', {
    ...defaultTextOptions,
    fontSize: h2FontSize,
    fontWeight: 'bold',
    marginBottom: 3
  })

  // Certifications
  addText(doc, blockContext2, 'Certified Lorem Ipsum Specialist', {
    ...defaultTextOptions,
    fontSize: h3FontSize,
    fontWeight: 600,
    marginBottom: 4
  })

  addText(doc, blockContext2, 'Lorem Ipsum Institute | January – June 2021', {
    ...defaultTextOptions,
    marginBottom: 3
  })

  addText(doc, blockContext2, 'Advanced Ipsum Training Certificate', {
    ...defaultTextOptions,
    fontSize: h3FontSize,
    fontWeight: 600,
    marginBottom: 4
  })

  addText(doc, blockContext2, 'Dolor Academy | July – December 2022', {
    ...defaultTextOptions,
    marginBottom: 3
  })

  // Degree
  addText(doc, blockContext2, 'Bachelor of Ipsumology', {
    ...defaultTextOptions,
    fontSize: h3FontSize,
    fontWeight: 600,
    marginBottom: 4
  })

  addText(doc, blockContext2, 'Dolor University | 2016 - 2020', {
    ...defaultTextOptions
  })

  addLine(doc, blockContext2, {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: docWidth - blockContext2.paddingHorizontal * 2
  })

  // Work Experience
  addText(doc, blockContext2, 'Work Experience', {
    ...defaultTextOptions,
    fontSize: h2FontSize,
    fontWeight: 'bold',
    marginBottom: 3
  })

  addText(doc, blockContext2, 'Lorem Ipsum Trainer at Ipsum Gym', {
    ...defaultTextOptions,
    fontSize: h3FontSize,
    fontWeight: 600,
    marginBottom: 4
  })

  addText(doc, blockContext2, 'January 2021 - Present', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  addText(
    doc,
    blockContext2,
    'Developed and implemented customized training programs tailored to individual client needs. Ensured safe use of gym equipment, motivated clients, tracked progress, and provided nutritional advice to enhance physical performance and body composition.',
    {
      ...defaultTextOptions,
      marginBottom: 4
    }
  )

  // Skills
  addLine(doc, blockContext2, {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: docWidth - blockContext2.paddingHorizontal * 2
  })

  addText(doc, blockContext2, 'Skills', {
    ...defaultTextOptions,
    fontSize: h2FontSize,
    fontWeight: 'bold',
    marginBottom: 3
  })

  const skillsColumn1 = new BlockContext({
    cursorYPosition: blockContext2.cursorYPosition,
    paddingHorizontal: 30
  })

  addText(doc, skillsColumn1, 'Effective Communication', {
    ...defaultTextOptions,
    marginBottom: 4
  })
  addText(doc, skillsColumn1, 'Empathy', {
    ...defaultTextOptions,
    marginBottom: 4
  })
  addText(doc, skillsColumn1, 'Patience', {
    ...defaultTextOptions,
    marginBottom: 4
  })
  addText(doc, skillsColumn1, 'Motivation', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  const skillsColumn2 = new BlockContext({
    cursorYPosition: blockContext2.cursorYPosition,
    x: docWidth / 2,
    maxWidth: docWidth / 2 - blockContext2.paddingHorizontal * 2
  })

  addText(doc, skillsColumn2, 'Adaptability', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  addText(doc, skillsColumn2, 'Leadership', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  addText(doc, skillsColumn2, 'Problem Solving', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  addText(doc, skillsColumn2, 'Active Listening', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  const blockContext3 = new BlockContext({
    cursorYPosition: skillsColumn1.cursorYPosition,
    paddingHorizontal: 30
  })

  addLine(doc, blockContext3, {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: docWidth - blockContext3.paddingHorizontal * 2
  })

  addText(doc, blockContext3, 'Languages', {
    ...defaultTextOptions,
    fontSize: h2FontSize,
    fontWeight: 'bold',
    marginBottom: 3
  })

  addText(doc, blockContext3, 'English', {
    ...defaultTextOptions,
    marginBottom: 4
  })

  addText(doc, blockContext3, 'Spanish', {
    ...defaultTextOptions,
    marginBottom: 4
  })
}

export default generateTemplate
