import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'

window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined)
window.HTMLMediaElement.prototype.pause = jest.fn()
