import { FamilyMember } from "../FamilyMember";

describe("FamilyMember", () => {
  describe("constructor", () => {
    it("creates a member with required fields", () => {
      const member = new FamilyMember({ name: "Alice", relationship: "parent" });
      expect(member.name).toBe("Alice");
      expect(member.relationship).toBe("parent");
      expect(member.id).toBeTruthy();
    });

    it("uses the provided id when given", () => {
      const member = new FamilyMember({
        id: "custom-id",
        name: "Bob",
        relationship: "sibling",
      });
      expect(member.id).toBe("custom-id");
    });

    it("stores the birthDate when provided", () => {
      const dob = new Date("1985-03-20");
      const member = new FamilyMember({
        name: "Carol",
        relationship: "parent",
        birthDate: dob,
      });
      expect(member.birthDate).toEqual(dob);
    });

    it("leaves birthDate undefined when not provided", () => {
      const member = new FamilyMember({ name: "Dave", relationship: "child" });
      expect(member.birthDate).toBeUndefined();
    });
  });

  describe("age", () => {
    it("returns undefined when birthDate is not set", () => {
      const member = new FamilyMember({ name: "Eve", relationship: "spouse" });
      expect(member.age).toBeUndefined();
    });

    it("calculates the correct age", () => {
      const today = new Date();
      const birthYear = today.getFullYear() - 30;
      const dob = new Date(birthYear, today.getMonth(), today.getDate());
      const member = new FamilyMember({
        name: "Frank",
        relationship: "parent",
        birthDate: dob,
      });
      expect(member.age).toBe(30);
    });

    it("accounts for a birthday that hasn't occurred yet this year", () => {
      const today = new Date();
      // Birthday is tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const dob = new Date(
        today.getFullYear() - 25,
        tomorrow.getMonth(),
        tomorrow.getDate()
      );
      const member = new FamilyMember({
        name: "Grace",
        relationship: "sibling",
        birthDate: dob,
      });
      expect(member.age).toBe(24);
    });
  });

  describe("toJSON", () => {
    it("returns a plain object with all fields", () => {
      const dob = new Date("2000-01-01");
      const member = new FamilyMember({
        id: "test-id",
        name: "Hank",
        relationship: "child",
        birthDate: dob,
      });
      const json = member.toJSON() as Record<string, unknown>;
      expect(json.id).toBe("test-id");
      expect(json.name).toBe("Hank");
      expect(json.relationship).toBe("child");
      expect(json.birthDate).toBe(dob.toISOString());
      expect(typeof json.age).toBe("number");
    });

    it("omits birthDate and age when not set", () => {
      const member = new FamilyMember({ name: "Ivy", relationship: "cousin" });
      const json = member.toJSON() as Record<string, unknown>;
      expect(json.birthDate).toBeUndefined();
      expect(json.age).toBeUndefined();
    });
  });
});
