# 🤖 agentwright

> *Where Playwright meets intelligent agents.*

AgentWright is an experimental JavaScript/TypeScript framework that brings **agentic automation** into the Playwright ecosystem.  
It allows multiple AI-driven agents to **planner**, **generator**, and **healer** within the same browser session — perfect for exploring the future of autonomous testing.

---

## 🧩 Project Overview

This repository demonstrates how **three different agents** can collaborate in a Playwright-based testing environment.

| Agent | Purpose | Description |
|-------|----------|-------------|
| **PlannerAgent** | Exploration | planner explores the app and produces a Markdown test plan. |
| **GeneratorAgent** | Transformation | transforms the Markdown plan into the Playwright Test files |
| **HealerAgent** | Execution | executes the test suite and automatically repairs failing tests |

Each agent operates independently but shares a unified Playwright context, simulating a **multi-agent test orchestration** model.

---

## ⚙️ Setup

```bash
# Clone the repo
git clone https://github.com/<your-username>/AgentWright.git
cd AgentWright

# Install dependencies
npm install

# Run sample test
npx playwright test
