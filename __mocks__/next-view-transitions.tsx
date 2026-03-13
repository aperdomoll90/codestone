const mockPush = jest.fn()

export const useTransitionRouter = () => ({
  push: mockPush,
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
})

export const getMockPush = () => mockPush
