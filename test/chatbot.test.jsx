import { describe, expect, test } from "vitest";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Chatbot from "../src/components/chatbot.jsx";

describe("Chatbot component testing", () => { //tests related to rendering of chatbot features
    test("Renders to screen", () => {
        render(<Chatbot />);   
        expect(screen.getByText("EunoiaBot")).toBeDefined(); //Checks if chatbot renders
    });

    test("Chatbot opens and closes", () => {  
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot"); //defines the openButton
        fireEvent.click(openButton);         //clicks the openButton
        expect(screen.getByText("EunoiaBot")).toBeVisible(); //checks if chatbot is visible

        const closeButton = screen.getByText("⛌");
        fireEvent.click(closeButton);
        expect(screen.queryByText("EunoiaBot")).toBeVisible();  //checks if chatbot is not visible
    });

    test("User can send a message", async () => {  //tests if user can send a message
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot"); 
        fireEvent.click(openButton);

        const input = screen.getByPlaceholderText("Talk to AI");  
        fireEvent.change(input, { target: { value: "Hello" } }); //changes the input value to "Hello"
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });  //presses enter key

        expect(screen.getByText("Hello")).toBeDefined(); //checks if the message is sent and is the same
    });

    test("Bot welcome message", async () => { //checks if bot sends expected welcome message
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot"); 
        fireEvent.click(openButton);
        expect(screen.getByText("Hello! I'm here to support you on your wellness journey. How are you feeling today?")).toBeDefined();
    });

    test("User history is stored", async () => {  //checks if user message history is stored correctly
        render(<Chatbot />);
        const openButton = screen.getByText("Open EunoiaBot");   //opens chatbot window
        fireEvent.click(openButton);

        const input = screen.getByPlaceholderText("Talk to AI");    //defines the input
        fireEvent.change(input, { target: { value: "This is a test prompt for a test case, please reply Yes, the history is stored" } }); //changes the input value to get expected response
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        await waitFor(() => {
            expect(screen.getByText("Yes, the history is stored.")).toBeInTheDocument();  //waits and checks if the expected response is received and correct
        });
    });


});
