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
  headerBg: [235, 241, 241], // #EBF1F1 - new light background
  logoDark: [42, 50, 53], // #2A3235 - logo color
  sidebarBg: [236, 230, 225], // #ECE6E1
  text: [28, 29, 32],
  textLight: [111, 112, 116],
  white: [255, 255, 255],
}

// Helper: translate SVG coordinate to PDF position
function s(coord, scale, offset) {
  return offset + coord * scale
}

// Draw the Perdomo logo from SVG paths with proper bezier curves
function drawLogo(doc, x, y, size) {
  const scale = size / 436

  doc.setFillColor(...colors.logoDark)

  // Path 1 — R bowl (top part with curves)
  // M99.5008 248 L119.001 216 H316.501
  // C330.001 211.5 344.501 202 344.501 181
  // C344.501 160 330.001 145.5 308.001 145.5
  // H237.501 V196.5 L204.001 148.5 V112.5 H316.501
  // C339.501 112.5 378.501 135 378.501 181
  // C378.501 227 336.501 248 316.501 248 H99.5008 Z
  doc.moveTo(s(99.5, scale, x), s(248, scale, y))
  doc.lineTo(s(119, scale, x), s(216, scale, y))
  doc.lineTo(s(316.5, scale, x), s(216, scale, y))
  doc.curveTo(s(330, scale, x), s(211.5, scale, y), s(344.5, scale, x), s(202, scale, y), s(344.5, scale, x), s(181, scale, y))
  doc.curveTo(s(344.5, scale, x), s(160, scale, y), s(330, scale, x), s(145.5, scale, y), s(308, scale, x), s(145.5, scale, y))
  doc.lineTo(s(237.5, scale, x), s(145.5, scale, y))
  doc.lineTo(s(237.5, scale, x), s(196.5, scale, y))
  doc.lineTo(s(204, scale, x), s(148.5, scale, y))
  doc.lineTo(s(204, scale, x), s(112.5, scale, y))
  doc.lineTo(s(316.5, scale, x), s(112.5, scale, y))
  doc.curveTo(s(339.5, scale, x), s(112.5, scale, y), s(378.5, scale, x), s(135, scale, y), s(378.5, scale, x), s(181, scale, y))
  doc.curveTo(s(378.5, scale, x), s(227, scale, y), s(336.5, scale, x), s(248, scale, y), s(316.5, scale, x), s(248, scale, y))
  doc.lineTo(s(99.5, scale, x), s(248, scale, y))
  doc.fill()

  // Path 2 — R leg (diagonal kick)
  doc.moveTo(s(269, scale, x), s(259.5, scale, y))
  doc.lineTo(s(229, scale, x), s(259.5, scale, y))
  doc.lineTo(s(271.5, scale, x), s(323, scale, y))
  doc.lineTo(s(312, scale, x), s(323, scale, y))
  doc.lineTo(s(269, scale, x), s(259.5, scale, y))
  doc.fill()

  // Path 3 — Outer ring with inner cutout
  // Exact SVG: M248.501 404V433C310.43 425 430.361 361 434.43 223.5C438.5 86 326.438 0 220.001 0
  // C109.438 0 0 81 0 223.5C0 336.5 104.438 444 237.501 435V292.5L215 259.5H203
  // C203 313.5 204.929 406.055 203.93 406C167.93 404 146.5 393.841 113 374.5
  // C86.2 359.027 60.5 322.72 51 306.5L149 147L190 205.5H230.5L167 112.5H130.5
  // C107.548 149.5 36.3788 266.823 35.9303 267.5C35.4819 268.177 32.2658 260.5 28.9303 232.5
  // C26.6074 213 27.9303 176.5 43.5008 145.5C49.2019 134.15 91.4418 26.7848 220.001 28.5
  // C332.43 30 406.001 126.47 406.001 223.5C406.001 315 322.938 396 248.501 404Z
  doc.moveTo(s(248.501, scale, x), s(404, scale, y))
  doc.lineTo(s(248.501, scale, x), s(433, scale, y))
  doc.curveTo(s(310.43, scale, x), s(425, scale, y), s(430.361, scale, x), s(361, scale, y), s(434.43, scale, x), s(223.5, scale, y))
  doc.curveTo(s(438.5, scale, x), s(86, scale, y), s(326.438, scale, x), s(0, scale, y), s(220.001, scale, x), s(0, scale, y))
  doc.curveTo(s(109.438, scale, x), s(0, scale, y), s(0, scale, x), s(81, scale, y), s(0, scale, x), s(223.5, scale, y))
  doc.curveTo(s(0, scale, x), s(336.5, scale, y), s(104.438, scale, x), s(444, scale, y), s(237.501, scale, x), s(435, scale, y))
  doc.lineTo(s(237.501, scale, x), s(292.5, scale, y))
  doc.lineTo(s(215, scale, x), s(259.5, scale, y))
  doc.lineTo(s(203, scale, x), s(259.5, scale, y))
  doc.curveTo(s(203, scale, x), s(313.5, scale, y), s(204.929, scale, x), s(406.055, scale, y), s(203.93, scale, x), s(406, scale, y))
  doc.curveTo(s(167.93, scale, x), s(404, scale, y), s(146.5, scale, x), s(393.841, scale, y), s(113, scale, x), s(374.5, scale, y))
  doc.curveTo(s(86.2, scale, x), s(359.027, scale, y), s(60.5, scale, x), s(322.72, scale, y), s(51, scale, x), s(306.5, scale, y))
  doc.lineTo(s(149, scale, x), s(147, scale, y))
  doc.lineTo(s(190, scale, x), s(205.5, scale, y))
  doc.lineTo(s(230.5, scale, x), s(205.5, scale, y))
  doc.lineTo(s(167, scale, x), s(112.5, scale, y))
  doc.lineTo(s(130.5, scale, x), s(112.5, scale, y))
  doc.curveTo(s(107.548, scale, x), s(149.5, scale, y), s(36.3788, scale, x), s(266.823, scale, y), s(35.9303, scale, x), s(267.5, scale, y))
  doc.curveTo(s(35.4819, scale, x), s(268.177, scale, y), s(32.2658, scale, x), s(260.5, scale, y), s(28.9303, scale, x), s(232.5, scale, y))
  doc.curveTo(s(26.6074, scale, x), s(213, scale, y), s(27.9303, scale, x), s(176.5, scale, y), s(43.5008, scale, x), s(145.5, scale, y))
  doc.curveTo(s(49.2019, scale, x), s(134.15, scale, y), s(91.4418, scale, x), s(26.7848, scale, y), s(220.001, scale, x), s(28.5, scale, y))
  doc.curveTo(s(332.43, scale, x), s(30, scale, y), s(406.001, scale, x), s(126.47, scale, y), s(406.001, scale, x), s(223.5, scale, y))
  doc.curveTo(s(406.001, scale, x), s(315, scale, y), s(322.938, scale, x), s(396, scale, y), s(248.501, scale, x), s(404, scale, y))
  doc.fill()
}

// Draw contact icon (circle with icon inside)
// Icons match provided SVGs exactly - 26x26 viewBox scaled to 5mm
function drawContactIcon(doc, x, y, type) {
  const iconSize = 5 // 5mm diameter
  const radius = iconSize / 2
  const scale = iconSize / 26 // Scale from 26px viewBox to 5mm

  // Draw circle background (dark color)
  doc.setFillColor(...colors.logoDark)
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
    doc.setDrawColor(...colors.logoDark)
    doc.setLineWidth(0.3)
    doc.line(envLeft, envTop, cx, cy + 1 * scale)
    doc.line(envLeft + w, envTop, cx, cy + 1 * scale)

  } else if (type === 'phone') {
    // Smartphone - rectangle with speaker line and home button dot
    doc.setFillColor(...colors.white)
    doc.setDrawColor(...colors.white)

    const phoneWidth = 1.6
    const phoneHeight = 2.6
    const phoneLeft = cx - phoneWidth / 2
    const phoneTop = cy - phoneHeight / 2

    // Phone body (rounded rectangle)
    doc.roundedRect(phoneLeft, phoneTop, phoneWidth, phoneHeight, 0.3, 0.3, 'F')

    // Speaker line at top (dark color)
    doc.setDrawColor(...colors.logoDark)
    doc.setLineWidth(0.25)
    const lineY = phoneTop + 0.45
    doc.line(cx - 0.35, lineY, cx + 0.35, lineY)

    // Home button dot at bottom (dark color)
    doc.setFillColor(...colors.logoDark)
    doc.circle(cx, phoneTop + phoneHeight - 0.45, 0.2, 'F')

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
    doc.setFillColor(...colors.logoDark)
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

  // Draw logo on left side of header
  drawLogo(doc, 5, 10, 55)

  // Name and title in header (dark text on light background)
  doc.setTextColor(...colors.logoDark)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'normal')
  doc.setCharSpace(1.5)
  doc.text('Adrian Perdomo', contentX, 25)

  doc.setFontSize(12)
  doc.setCharSpace(2)
  doc.text('SOFTWARE ENGINEER', contentX, 33)
  doc.setCharSpace(0) // Reset for rest of document

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
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...colors.textLight)

  const dotRadius = 0.4
  const dotGap = 1.5 // gap before and after dot
  const maxWidth = sidebarWidth - margin * 2
  const lineHeight = 4

  let skillX = margin
  let skillY = sidebarY

  resumeData.skills.forEach((skill, index) => {
    const textWidth = doc.getTextWidth(skill)
    const isLast = index === resumeData.skills.length - 1
    const dotSpace = isLast ? 0 : dotGap * 2 + dotRadius * 2

    // Check if skill itself is wider than available space - wrap to new line first
    if (skillX !== margin && skillX + textWidth > margin + maxWidth) {
      skillX = margin
      skillY += lineHeight
    }

    // Draw skill text
    doc.text(skill, skillX, skillY)
    skillX += textWidth

    // Draw separator dot (except after last skill)
    if (!isLast) {
      // Check if dot fits, otherwise wrap
      if (skillX + dotSpace > margin + maxWidth) {
        skillX = margin
        skillY += lineHeight
      } else {
        skillX += dotGap
        doc.setFillColor(...colors.textLight)
        doc.circle(skillX + dotRadius, skillY - 1, dotRadius, 'F')
        skillX += dotRadius * 2 + dotGap
      }
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
    const titleText = `${exp.title}, ${exp.company}`
    const titleLines = doc.splitTextToSize(titleText, contentWidth)
    doc.text(titleLines, contentX, y)
    y += titleLines.length * 4 + 1

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
