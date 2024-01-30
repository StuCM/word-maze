import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react'
import App from '../src/App'

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
})