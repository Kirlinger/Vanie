import { Family } from "../Family";
import { FamilyMember } from "../FamilyMember";

describe("Family", () => {
  let family: Family;

  beforeEach(() => {
    family = new Family();
  });

  describe("addMember", () => {
    it("adds a member and returns a FamilyMember instance", () => {
      const member = family.addMember({ name: "Alice", relationship: "parent" });
      expect(member).toBeInstanceOf(FamilyMember);
      expect(member.name).toBe("Alice");
      expect(member.relationship).toBe("parent");
    });

    it("assigns a unique id to each member", () => {
      const a = family.addMember({ name: "Alice", relationship: "parent" });
      const b = family.addMember({ name: "Bob", relationship: "child" });
      expect(a.id).not.toBe(b.id);
    });

    it("increases the family size", () => {
      expect(family.size).toBe(0);
      family.addMember({ name: "Alice", relationship: "parent" });
      expect(family.size).toBe(1);
      family.addMember({ name: "Bob", relationship: "sibling" });
      expect(family.size).toBe(2);
    });

    it("stores the birthDate when provided", () => {
      const dob = new Date("1990-06-15");
      const member = family.addMember({
        name: "Alice",
        relationship: "parent",
        birthDate: dob,
      });
      expect(member.birthDate).toEqual(dob);
    });
  });

  describe("removeMember", () => {
    it("removes an existing member and returns true", () => {
      const member = family.addMember({ name: "Alice", relationship: "parent" });
      expect(family.removeMember(member.id)).toBe(true);
      expect(family.size).toBe(0);
    });

    it("returns false when member does not exist", () => {
      expect(family.removeMember("nonexistent-id")).toBe(false);
    });

    it("does not affect other members", () => {
      const alice = family.addMember({ name: "Alice", relationship: "parent" });
      family.addMember({ name: "Bob", relationship: "child" });
      family.removeMember(alice.id);
      expect(family.size).toBe(1);
      expect(family.findByName("Bob")).toHaveLength(1);
    });
  });

  describe("getMember", () => {
    it("retrieves a member by id", () => {
      const member = family.addMember({ name: "Alice", relationship: "parent" });
      expect(family.getMember(member.id)).toBe(member);
    });

    it("returns undefined for an unknown id", () => {
      expect(family.getMember("unknown")).toBeUndefined();
    });
  });

  describe("findByName", () => {
    beforeEach(() => {
      family.addMember({ name: "Alice Smith", relationship: "parent" });
      family.addMember({ name: "Bob Smith", relationship: "parent" });
      family.addMember({ name: "Charlie Jones", relationship: "child" });
    });

    it("finds members whose name contains the search string", () => {
      const results = family.findByName("Smith");
      expect(results).toHaveLength(2);
    });

    it("is case-insensitive", () => {
      expect(family.findByName("alice")).toHaveLength(1);
      expect(family.findByName("ALICE")).toHaveLength(1);
    });

    it("returns an empty array when no match is found", () => {
      expect(family.findByName("Zara")).toHaveLength(0);
    });
  });

  describe("getMembersByRelationship", () => {
    beforeEach(() => {
      family.addMember({ name: "Alice", relationship: "parent" });
      family.addMember({ name: "Bob", relationship: "parent" });
      family.addMember({ name: "Charlie", relationship: "child" });
    });

    it("returns all members with the given relationship", () => {
      expect(family.getMembersByRelationship("parent")).toHaveLength(2);
      expect(family.getMembersByRelationship("child")).toHaveLength(1);
    });

    it("returns an empty array when no members have that relationship", () => {
      expect(family.getMembersByRelationship("sibling")).toHaveLength(0);
    });
  });

  describe("getAll", () => {
    it("returns an empty array for a new family", () => {
      expect(family.getAll()).toEqual([]);
    });

    it("returns all members", () => {
      family.addMember({ name: "Alice", relationship: "parent" });
      family.addMember({ name: "Bob", relationship: "child" });
      expect(family.getAll()).toHaveLength(2);
    });
  });
});
