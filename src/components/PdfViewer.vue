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

onMounted(() => {
  const doc = new jsPDF({
    filters: ['ASCIIHexEncode'],
    // A4
    orientation: 'portrait',
    format: 'A4'
    // unit: 'pt'
  })

  const blockContext = new BlockContext({ paddingHorizontal: 10, paddingVertical: 10 })

  // Header
  pdfElements.addText(doc, blockContext, 'Jeancarlo Javier', {
    fontSize: 25,
    marginBottom: 2
  })

  pdfElements.addText(doc, blockContext, 'jeancarlojavier43@gmail.com', {
    fontSize: 12,
    marginBottom: 6
  })

  pdfElements.addLine(doc, blockContext, {
    marginBottom: 6
  })

  pdfElements.addText(doc, blockContext, 'Portfolio', {
    fontSize: 20,
    marginBottom: 5
  })

  pdfElements.addText(
    doc,
    blockContext,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit penatibus feugiat cubilia etiam, semper purus lectus lacinia suscipit facilisi commodo praesent sodales torquent nec, vehicula mauris ante class magnis lobortis fusce a risus platea. Netus lacus felis porttitor facilisis curabitur, phasellus nisi fringilla eleifend cum, justo convallis inceptos tristique.',
    {
      fontSize: 12,
      marginBottom: 8
    }
  )

  // const blockContext2: BlockContext = {
  //   numberOfElements: 0,
  //   cursorYPosition: blockContext.cursorYPosition,
  //   paddingHorizontal: 10,
  //   paddingVertical: 0
  // }

  const blockContext2 = new BlockContext({
    cursorYPosition: blockContext.cursorYPosition,
    paddingHorizontal: 10,
    paddingVertical: 0
  })

  pdfElements.addText(doc, blockContext2, 'Experiencia', {
    fontSize: 20,
    marginBottom: 5
  })

  pdfElements.addText(
    doc,
    blockContext2,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit penatibus feugiat cubilia etiam, semper purus lectus lacinia suscipit facilisi commodo praesent sodales torquent nec, vehicula mauris ante class magnis lobortis fusce a risus platea. Netus lacus felis porttitor facilisis curabitur, phasellus nisi fringilla eleifend cum, justo convallis inceptos tristique.',
    {
      fontSize: 12,
      marginBottom: 6
    }
  )

  const blockContext3 = new BlockContext({
    cursorYPosition: blockContext2.cursorYPosition,
    paddingHorizontal: 10,
    paddingVertical: 0,
    maxWidth: 100
  })

  pdfElements.addText(doc, blockContext3, 'Educación', {
    fontSize: 20,
    marginBottom: 5
  })

  const blockContext4 = new BlockContext({
    cursorYPosition: blockContext2.cursorYPosition,
    paddingHorizontal: 10,
    paddingVertical: 0,
    maxWidth: 100
  })

  pdfElements.addText(doc, blockContext4, 'Soft Skills', {
    fontSize: 20,
    marginBottom: 5,
    x: 100
  })

  pdfElements.addText(doc, blockContext4, 'Soft Skills', {
    fontSize: 20,
    marginBottom: 5,
    x: 100
  })

  pdfElements.addText(
    doc,
    blockContext4,
    'Lorem ipsum dolor sit amet consectetur adipiscing elit penatibus feugiat cubilia etiam, semper purus lectus lacinia suscipit facilisi commodo praesent sodales torquent nec, vehicula mauris ante class magnis lobortis fusce a risus platea. Netus lacus felis porttitor facilisis curabitur, phasellus nisi fringilla eleifend cum, justo convallis inceptos tristique.',
    {
      fontSize: 12,
      marginBottom: 6,
      x: 100
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
