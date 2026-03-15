# Vanie

A TypeScript library for managing family members and relationships.

## Features

- Add, remove, and look up family members
- Track birth dates and automatically calculate ages
- Filter members by name or relationship type
- Strongly typed with full TypeScript support

## Installation

```bash
npm install
```

## Usage

```typescript
import { Family } from "./src";

const family = new Family();

// Add members
const alice = family.addMember({
  name: "Alice",
  relationship: "parent",
  birthDate: new Date("1970-04-12"),
});

const bob = family.addMember({
  name: "Bob",
  relationship: "child",
  birthDate: new Date("2000-08-25"),
});

// Look up a member by ID
const found = family.getMember(alice.id);

// Search by name
const results = family.findByName("Alice");

// Filter by relationship
const parents = family.getMembersByRelationship("parent");

// Get all members
const everyone = family.getAll();

// Remove a member
family.removeMember(bob.id);
```

## Supported Relationships

`parent` | `child` | `sibling` | `spouse` | `grandparent` | `grandchild` | `aunt/uncle` | `niece/nephew` | `cousin` | `other`

## Development

```bash
# Run tests
npm test

# Build
npm run build
```
