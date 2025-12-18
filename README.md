# A Personal Productivity App

<a href="https://github.com/AliArgonaut/autodoc-cli">
            <img src="https://img.shields.io/badge/Documented%20by-Autodoc-blue?style=plastic&logo=readthedocs" width="140">
        </a>

This is a personal productivity application that combines calorie tracking with a to-do list. It allows users to log their daily calorie intake and manage their tasks, with the ability to export a daily summary to the clipboard.

LIVE LINK https://aliargonaut.github.io/personal-productivity-app/

## Table of Contents

*   [Features](#features)
*   [Installation](#installation)
*   [Usage](#usage)
*   [License](#license)

## Features

*   **Calorie Tracking:**
    *   Input and add calories consumed throughout the day.
    *   Displays the total calories accumulated.
*   **To-Do List:**
    *   Add new tasks to the list.
    *   Mark tasks as completed or incomplete.
    *   Visually distinguish between completed and pending tasks.
*   **Daily Summary Export:**
    *   Generate a summary of the day including the date, total calories, and completed tasks.
    *   Copy this summary as a JSON string to the clipboard.
*   **User Interface:**
    *   A clean, retro-inspired interface with a focus on usability.

## Installation

This project uses Vite for its build process and React for the frontend.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AliArgonaut/taskmaster.git
    cd taskmaster/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This command will start the Vite development server and the application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

### Core Functionality

*   **Adding Calories:** Enter a numerical value in the "calorie input" field and click "Add" or press Enter. The total calories will update accordingly.
*   **Managing To-Dos:**
    *   Type a new task in the "input for new to do item" field and click "Add" or press Enter.
    *   Click on an existing to-do item to toggle its completion status.
*   **Submitting Daily Summary:** Click the "submit button (copies JSON to clipboard)" to generate and copy your daily summary to the clipboard.

## License

This project is licensed under the MIT License.
