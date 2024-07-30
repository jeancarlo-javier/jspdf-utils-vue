<template>
  <div class="pdf-viewer">
    <div ref="pdfViewer" class="pdf-viewer-container"></div>
    <div
      :style="{
        // scale: 0.5
      }"
    >
      <VuePdfEmbed :source="pdfBase64" :width="550" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf'
import { ref, onMounted } from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
import pdfElements from '../utils/pdfElements'
import { BlockContext } from '../types/pdfUtils.types'

const pdfViewer = ref<HTMLDivElement>()
const pdfBase64 = ref<string>()

onMounted(async () => {
  const doc = new jsPDF({
    filters: ['ASCIIHexEncode'],
    orientation: 'portrait',
    format: 'A4',
    unit: 'px'
  })

  const { MontserratRegular, MontserratBold } = await import('../../fonts/montserrat-fonts')

  doc.addFileToVFS('Montserrat-Regular.ttf', MontserratRegular)
  doc.addFont('Montserrat-Regular.ttf', 'Montserrat', 'normal', 400)

  doc.addFileToVFS('Montserrat-Bold.ttf', MontserratBold)
  doc.addFont('Montserrat-Bold.ttf', 'Montserrat', 'normal', 700)

  // const docContext = {}

  const blockContext1 = new BlockContext({
    id: 'header',
    maxWidth: 175,
    paddingVertical: 30,
    x: 30
  })

  const lineHeight = 1.15

  pdfElements.addLine(doc, blockContext1, {
    maxWidth: 100,
    x: 75,
    y: 0,
    marginBottom: 10
  })

  pdfElements.addText(doc, blockContext1, 'Lorem ipsum dolor sit consectetur.', {
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    lineHeight
  })

  pdfElements.addLine(doc, blockContext1, {
    y: 0,
    x: 0,
    maxWidth: 100,
    leftOffset: 0,
    marginTop: 15,
    marginBottom: 15
  })

  pdfElements.addText(
    doc,
    blockContext1,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit, etiam taciti egestas morbi nunc nulla, nisl lobortis mi vivamus integer condimentum. Tristique platea elementum duis posuere sagittis lobortis, venenatis curae cras mollis.',
    {
      fontSize: 14,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      lineHeight
    }
  )

  pdfElements.addLine(doc, blockContext1, {
    maxWidth: 100,
    x: 75,
    y: 0,
    marginTop: 10,
    marginBottom: 10
  })

  pdfElements.addText(doc, blockContext1, 'Duis ultricies felis.', {
    fontSize: 20,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    lineHeight
  })

  pdfElements.addLine(doc, blockContext1, {
    y: 0,
    x: 0,
    maxWidth: 100,
    leftOffset: 0,
    marginTop: 15,
    marginBottom: 15
  })

  pdfElements.addText(
    doc,
    blockContext1,
    'Rhoncus fermentum litora suscipit odio per tempor euismod himenaeos mollis tellus dapibus, rutrum morbi in suspendisse lobortis justo etiam at facilisis porttitor, dictumst neque aenean sagittis nam curae montes posuere cursus semper.',
    {
      fontSize: 14,
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      lineHeight
    }
  )

  const blob = doc.output('blob')

  // Convertir el blob a base64
  const reader = new FileReader()
  reader.readAsDataURL(blob)

  if (reader) {
    reader.onloadend = () => {
      if (reader.result) {
        const base64data = (reader.result as string).split(',')[1] // Remover el encabezado de la URL de datos

        pdfBase64.value = `data:application/pdf;base64,${base64data}`
      }
    }
  }

  // show the generated PDF in the browser

  // doc.save('hello.pdf')
})
</script>
