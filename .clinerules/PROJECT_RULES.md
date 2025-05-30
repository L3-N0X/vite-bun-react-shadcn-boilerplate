# Project Rules

This document outlines the rules and guidelines for the project. It is important to follow these rules to ensure consistency, maintainability, and quality of the codebase.

## General Guidelines

- Use TypeScript for the codebase.
- Prefer creating new files for components so that they can be easily imported and reused.
- Use bun as the package manager.
- Do not use 'any' for types. Always specify a type or use `unknown` if the type is not known.
- The project uses vite for bundling. Ensure that all components are compatible with vite.
- The project uses bun serve as http server.
- The project uses tailwindcss for styling.
- Try to keep the codebase clean and organized. Use meaningful names for files, variables, and functions.
- Use Shadcn UI components where applicable to maintain consistency in the UI.
- Use ESLint and Prettier for code formatting and linting. Ensure that the code is formatted before committing.
- Use Git for version control. Commit changes frequently with meaningful commit messages.
- I am on Windows, all commands should be compatible with Windows.

## Behavioral Guidelines

- Do not generate any markdown files with results or summaries of your tasks.
- Do not generate any temporary test files which are not needed in the final codebase.
