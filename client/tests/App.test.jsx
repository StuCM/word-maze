import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from '../src/App'
import ScoreUI from '../src/components/ScoreUI'

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
})

describe("ScoreUI", () => {
    it("reduces attempts when reset is clicked", async () => {
        const user = userEvent.setup();
        render(<ScoreUI score={0} attempts={3} />)
        const button = screen.getByRole('button')

        await user.click(button)

        const attemptsAfter = await screen.findByText(/^2$/)
        expect(attemptsAfter).toBeInTheDocument()
    })
})