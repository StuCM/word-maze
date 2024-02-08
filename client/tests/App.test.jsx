import { describe, it, expect, vi } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from '../src/App'

vi.mock('../src/components/Modal', () => ({
    default: () => <div>Test</div>
}))

describe("App test", () => {
    it("renders title", () => {
        render(<App />)
        expect(screen.getByText(/Word-Maze/i)).toBeDefined()
    })
    it("renders the gameboard", () => {
        render(<App/>)
        const gameboard = screen.getByLabelText('gameboard');
        expect(gameboard).toBeInTheDocument();
    })
    it("renders the score", () => {
        render(<App/>)
        const score = screen.getByText(/Score/i);
        expect(score).toBeInTheDocument();
    })
    it("renders the attempts", () => {
        render(<App/>)
        const attempt = screen.getByText(/Attempt/i);
        expect(attempt).toBeInTheDocument();
    })
    it("reduces attempts when reset is clicked", async () => {
        const user = userEvent.setup();

        render(<App />)
        const button = screen.getByTestId('resetButton')

        await user.click(button)

        const remainingAttempts = screen.getByTestId('attempts');
        expect(remainingAttempts.textContent).toBe('2');
    })
})
