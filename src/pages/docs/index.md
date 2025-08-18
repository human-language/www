---
layout: "@layouts/DocsLayout.astro"
title: "What is Human?"
description: "Introduction to the Human language"
---

# What is Human?

Human is a language for defining AI behavior with clarity and control.


```ts
type User = {
  id: number
  name: string
  email?: string  // optional
}

function greet(user: User): string {
  return `Hello, ${user.name}!`
}

const alice: User = { id: 1, name: "Alice" }
console.log(greet(alice))
```
