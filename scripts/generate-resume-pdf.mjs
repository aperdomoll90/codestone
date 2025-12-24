import { jsPDF } from 'jspdf'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read and parse the TypeScript data file
const dataFilePath = path.join(__dirname, '..', 'src', 'app', 'data', 'resume.ts')
const dataContent = fs.readFileSync(dataFilePath, 'utf-8')

// Extract resumeData object from the TS file
const match = dataContent.match(/export const resumeData[^=]*=\s*({[\s\S]*?})\s*(?:;|\n\n|$)/)
if (!match) {
  console.error('Could not parse resume data from resume.ts')
  process.exit(1)
}

// Use eval to parse the object (safe here since we control the source file)
const resumeData = eval(`(${match[1]})`)

// Add contact info (not in the original data file)
const contact = {
  email: 'adrianperdomo@example.com',
  phone: '(555) 123-4567',
  location: 'South Florida, USA',
}

// Colors
const colors = {
  headerBg: [55, 56, 62], // #37383E
  sidebarBg: [236, 230, 225], // #ECE6E1
  text: [28, 29, 32],
  textLight: [111, 112, 116],
  white: [255, 255, 255],
}

// Draw contact icon (circle with icon inside)
// Icons match provided SVGs exactly - 26x26 viewBox scaled to 5mm
function drawContactIcon(doc, x, y, type) {
  const iconSize = 5 // 5mm diameter
  const radius = iconSize / 2
  const scale = iconSize / 26 // Scale from 26px viewBox to 5mm

  // Draw circle background (#37383E)
  doc.setFillColor(...colors.headerBg)
  doc.circle(x + radius, y - radius + 1, radius, 'F')

  // Icon center position (center of the circle at 13,13 in SVG)
  const cx = x + radius
  const cy = y - radius + 1

  doc.setFillColor(...colors.white)
  doc.setDrawColor(...colors.white)

  if (type === 'email') {
    // Email SVG path: envelope shape
    // Original SVG coordinates (centered around 13,13):
    // Body: rect from (6.75, 8.5) to (19.25, 17.5) = 12.5 x 9
    // Flap: triangular from top corners to center
    const w = 12.5 * scale
    const h = 9 * scale
    const envTop = cy - h/2 + 0.5 * scale
    const envLeft = cx - w/2

    // Draw envelope body (filled rectangle)
    doc.setFillColor(...colors.white)
    doc.rect(envLeft, envTop, w, h, 'F')

    // Draw the V-shaped flap using dark lines on the white envelope
    doc.setDrawColor(...colors.headerBg)
    doc.setLineWidth(0.3)
    doc.line(envLeft, envTop, cx, cy + 1 * scale)
    doc.line(envLeft + w, envTop, cx, cy + 1 * scale)

  } else if (type === 'phone') {
    // Phone handset - classic receiver shape
    doc.setFillColor(...colors.white)

    // Draw phone as a curved handset rotated 135 degrees
    // Using larger dimensions for better visibility
    const s = 0.55 // scale factor

    // Earpiece (top-left)
    doc.circle(cx - 1.0 * s, cy - 1.0 * s, 0.9, 'F')

    // Mouthpiece (bottom-right)
    doc.circle(cx + 1.0 * s, cy + 1.0 * s, 0.9, 'F')

    // Handle - draw as filled rounded rectangle connecting them
    doc.setDrawColor(...colors.white)
    doc.setFillColor(...colors.white)
    doc.setLineWidth(1.2)
    doc.setLineCap('round')
    doc.line(cx - 0.6 * s, cy - 0.6 * s, cx + 0.6 * s, cy + 0.6 * s)

  } else if (type === 'location') {
    // Location pin SVG: teardrop shape with hollow center
    // Path shows a pin with rounded top and pointed bottom
    const pinWidth = 8 * scale
    const pinHeight = 11 * scale
    const pinTop = cy - pinHeight/2 - 0.5 * scale
    const pinRadius = pinWidth / 2

    doc.setFillColor(...colors.white)

    // Draw the pin as a circle plus triangle
    // Top circle part
    doc.circle(cx, pinTop + pinRadius, pinRadius, 'F')

    // Triangle pointing down
    const triTop = pinTop + pinRadius - 0.5 * scale
    const triBottom = pinTop + pinHeight
    doc.moveTo(cx - pinRadius * 0.85, triTop + pinRadius * 0.5)
    doc.lineTo(cx, triBottom)
    doc.lineTo(cx + pinRadius * 0.85, triTop + pinRadius * 0.5)
    doc.fill()

    // Inner circle (hollow part) using dark color
    doc.setFillColor(...colors.headerBg)
    doc.circle(cx, pinTop + pinRadius, pinRadius * 0.4, 'F')
  }
}

function generatePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const sidebarWidth = 70
  const margin = 10
  const contentX = sidebarWidth + 10
  const contentWidth = pageWidth - contentX - margin

  let y = 0
  const headerHeight = 58

  // Sidebar background (full height, behind header)
  doc.setFillColor(...colors.sidebarBg)
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F')

  // Header background with angled bottom edge (like the SVG)
  // SVG path: M 0 0 -> 999 0 -> 999 212.5 -> 333.5 212.5 -> 160.5 276 -> 0 217.5 -> 0 0
  // Scaled to PDF: width=210, height proportional
  doc.setFillColor(...colors.headerBg)
  const headerPoints = [
    [0, 0],
    [pageWidth, 0],
    [pageWidth, headerHeight],
    [sidebarWidth + 5, headerHeight],
    [sidebarWidth - 30, headerHeight + 17],
    [0, headerHeight + 5],
    [0, 0],
  ]
  doc.moveTo(headerPoints[0][0], headerPoints[0][1])
  for (let i = 1; i < headerPoints.length; i++) {
    doc.lineTo(headerPoints[i][0], headerPoints[i][1])
  }
  doc.fill()

  // Name and title in header
  doc.setTextColor(...colors.white)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('Adrian Perdomo', contentX, 25)

  doc.setFontSize(14)
  doc.setFont('helvetica', 'normal')
  doc.text(resumeData.headline, contentX, 38)

  // Sidebar content (starts below the angled header)
  let sidebarY = 85

  // Contact Details section
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Contact Details', margin, sidebarY)
  sidebarY += 10

  const iconTextGap = 8 // Gap between icon and text

  // Email with icon
  drawContactIcon(doc, margin, sidebarY, 'email')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)
  doc.text(contact.email, margin + iconTextGap, sidebarY)
  sidebarY += 8

  // Phone with icon
  drawContactIcon(doc, margin, sidebarY, 'phone')
  doc.text(contact.phone, margin + iconTextGap, sidebarY)
  sidebarY += 8

  // Location with icon
  drawContactIcon(doc, margin, sidebarY, 'location')
  const locationLines = doc.splitTextToSize(contact.location, sidebarWidth - margin - iconTextGap - 2)
  doc.text(locationLines, margin + iconTextGap, sidebarY)
  sidebarY += locationLines.length * 5 + 10

  // Education section in sidebar
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Education', margin, sidebarY)
  sidebarY += 10

  const bulletX = margin + 1.5 // X position for bullet
  const lineX = margin + 1.5 // X position for vertical line
  const textIndent = margin + 6 // Text indentation after bullet/line

  doc.setFontSize(9)
  resumeData.education.forEach((edu) => {
    const startY = sidebarY

    // Draw bullet dot
    doc.setFillColor(...colors.text)
    doc.circle(bulletX, sidebarY - 1, 1.2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colors.text)
    const titleLines = doc.splitTextToSize(edu.title, sidebarWidth - textIndent - margin)
    doc.text(titleLines, textIndent, sidebarY)
    sidebarY += titleLines.length * 4 + 1

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.textLight)
    const instLines = doc.splitTextToSize(edu.institution, sidebarWidth - textIndent - margin)
    doc.text(instLines, textIndent, sidebarY)
    sidebarY += instLines.length * 4

    doc.text(edu.period, textIndent, sidebarY)

    // Draw vertical line from bullet to end of this education item
    doc.setDrawColor(...colors.textLight)
    doc.setLineWidth(0.3)
    doc.line(lineX, startY + 1, lineX, sidebarY + 2)

    sidebarY += 12
  })

  // Skills section in sidebar
  sidebarY += 5
  doc.setTextColor(...colors.text)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Skills', margin, sidebarY)
  sidebarY += 8

  // Draw skills as inline text separated by dots
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)

  const dotRadius = 0.5
  const dotGap = 2 // gap before and after dot
  const maxWidth = sidebarWidth - margin * 2
  const lineHeight = 5

  let skillX = margin
  let skillY = sidebarY

  resumeData.skills.forEach((skill, index) => {
    const textWidth = doc.getTextWidth(skill)
    const isLast = index === resumeData.skills.length - 1
    const dotSpace = isLast ? 0 : dotGap * 2 + dotRadius * 2

    // Check if we need to wrap to next row
    if (skillX + textWidth + dotSpace > margin + maxWidth && skillX !== margin) {
      skillX = margin
      skillY += lineHeight
    }

    // Draw skill text
    doc.text(skill, skillX, skillY)
    skillX += textWidth

    // Draw separator dot (except after last skill)
    if (!isLast) {
      skillX += dotGap
      doc.setFillColor(...colors.textLight)
      doc.circle(skillX + dotRadius, skillY - 1.2, dotRadius, 'F')
      skillX += dotRadius * 2 + dotGap
    }
  })

  sidebarY = skillY + 10

  // Main content area
  y = 75

  // Summary section
  doc.setTextColor(...colors.text)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', contentX, y)
  doc.setDrawColor(...colors.textLight)
  doc.setLineWidth(0.3)
  doc.line(contentX, y + 2, pageWidth - margin, y + 2)
  y += 10

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)
  const summaryLines = doc.splitTextToSize(resumeData.about, contentWidth)
  doc.text(summaryLines, contentX, y)
  y += summaryLines.length * 4 + 10

  // Work Experience section
  doc.setTextColor(...colors.text)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Work Experience', contentX, y)
  doc.line(contentX, y + 2, pageWidth - margin, y + 2)
  y += 10

  resumeData.experience.forEach((exp) => {
    if (y > pageHeight - 40) {
      doc.addPage()
      y = 20
      doc.setFillColor(...colors.sidebarBg)
      doc.rect(0, 0, sidebarWidth, pageHeight, 'F')
    }

    // Handle spacer entries differently
    if (exp.isSpacer) {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(...colors.textLight)
      doc.text(`${exp.title} • ${exp.period}`, contentX, y)
      y += 8
      return
    }

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...colors.text)
    doc.text(`${exp.title}, ${exp.company}`, contentX, y)
    y += 5

    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...colors.textLight)
    doc.text(exp.period, contentX, y)
    y += 6

    doc.setFontSize(9)
    const descLines = doc.splitTextToSize(`• ${exp.description}`, contentWidth)
    doc.text(descLines, contentX, y)
    y += descLines.length * 4 + 8
  })

  // References line
  y += 5
  doc.setFontSize(9)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(...colors.textLight)
  doc.text('References available upon request', contentX, y)

  // Save PDF
  const publicDir = path.join(__dirname, '..', 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const pdfBuffer = doc.output('arraybuffer')
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), Buffer.from(pdfBuffer))

  console.log('✅ Resume PDF generated at public/resume.pdf')
}

generatePDF()
