import { expect, test, describe } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import FancyButton from "../src/routes/lab2/FancyButton";

describe('FancyButton test', () => {
    test('Should have content', () => {
        render(<FancyButton>Кнопка</FancyButton>);
        expect(screen.getByText(/Кнопка/i)).toBeDefined()
    })

    test('Should perform action', () => {
        let counter = 0
        function increase_counter() {
            counter += 1
        };

        render(<FancyButton onClick={increase_counter}>Кнопка</FancyButton>)

        const btn = screen.getByText('Кнопка')

        fireEvent.click(btn)
        expect(counter).equal(1)
    })
})