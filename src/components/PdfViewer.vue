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
    // maxWidth: 200,
    paddingVertical: 30
  })

  pdfElements.addLine(doc, blockContext1)

  pdfElements.addText(doc, blockContext1, 'Lorem ipsum dolor sit consectetur.', {
    fontSize: 35,
    textCenter: true,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontWeight: 'bold'
  })
  pdfElements.addLine(doc, blockContext1)
  pdfElements.addText(doc, blockContext1, 'Lorem ipsum dolor sit consectetur.', {
    fontSize: 35,
    textCenter: true,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  })

  pdfElements.addLine(doc, blockContext1)

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
