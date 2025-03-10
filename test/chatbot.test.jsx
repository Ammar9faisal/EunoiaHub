import { describe, expect, test, vi } from "vitest";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chatbot from "../src/components/chatbot.jsx";
import { generateResponse } from "../src/services/chatbotService";

// Mock the generateResponse function
vi.mock("../src/services/chatbotService", () => ({
    generateResponse: vi.fn(),
}));

describe("Chatbot component testing", () => {
    test("Renders to screen", () => {
        render(<Chatbot />);
        expect(screen.getByText("EunoiaBot")).toBeDefined(); // Checks if chatbot renders
    });

    test("Chatbot opens and closes", () => {
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot"); // Defines the openButton
        fireEvent.click(openButton); // Clicks the openButton
        expect(screen.getByText("EunoiaBot")).toBeVisible(); // Checks if chatbot is visible

        const closeButton = screen.getByText("⛌");
        fireEvent.click(closeButton);
    });

    test("User can send a message", async () => {
        generateResponse.mockResolvedValueOnce("Hello"); // Mock the bot response

        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot");
        fireEvent.click(openButton);

        const input = screen.getByPlaceholderText("Talk to AI");
        fireEvent.change(input, { target: { value: "Hello" } }); // Changes the input value to "Hello"
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" }); // Presses enter key

        expect(screen.getByText("Hello")).toBeDefined(); // Checks if the message is sent and is the same
        await waitFor(() => {
            expect(screen.getByText("Hello")).toBeInTheDocument(); // Checks if the bot response is displayed
        });
    });

    test("Bot welcome message", async () => {
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot");
        fireEvent.click(openButton);
        expect(screen.getByText("Hello! I'm here to support you on your wellness journey. How are you feeling today?")).toBeDefined();
    });

    test("User history is stored", async () => {
        generateResponse.mockResolvedValueOnce("Yes, the history is stored."); // Mock the bot response

        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot"); // Opens chatbot window
        fireEvent.click(openButton);

        const input = screen.getByPlaceholderText("Talk to AI"); // Defines the input
        fireEvent.change(input, { target: { value: "This is a test prompt for a test case, please reply Yes, the history is stored" } }); // Changes the input value to get expected response
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        await waitFor(() => {
            expect(screen.getByText("Yes, the history is stored.")).toBeInTheDocument(); // Waits and checks if the expected response is received and correct
        });
    });
});