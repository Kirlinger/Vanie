import { FamilyMember, FamilyMemberOptions, Relationship } from "./FamilyMember";

export class Family {
  private members: Map<string, FamilyMember> = new Map();

  /**
   * Add a new member to the family.
   * @param options - Options for the new family member.
   * @returns The newly created FamilyMember.
   */
  addMember(options: FamilyMemberOptions): FamilyMember {
    const member = new FamilyMember(options);
    this.members.set(member.id, member);
    return member;
  }

  /**
   * Remove a family member by ID.
   * @param id - The ID of the member to remove.
   * @returns True if the member was removed, false if not found.
   */
  removeMember(id: string): boolean {
    return this.members.delete(id);
  }

  /**
   * Find a family member by ID.
   * @param id - The ID to look up.
   * @returns The FamilyMember, or undefined if not found.
   */
  getMember(id: string): FamilyMember | undefined {
    return this.members.get(id);
  }

  /**
   * Find family members by name (case-insensitive).
   * @param name - The name to search for.
   * @returns An array of matching FamilyMembers.
   */
  findByName(name: string): FamilyMember[] {
    const lower = name.toLowerCase();
    return Array.from(this.members.values()).filter((m) =>
      m.name.toLowerCase().includes(lower)
    );
  }

  /**
   * Get all members with a given relationship.
   * @param relationship - The relationship type to filter by.
   * @returns An array of FamilyMembers with that relationship.
   */
  getMembersByRelationship(relationship: Relationship): FamilyMember[] {
    return Array.from(this.members.values()).filter(
      (m) => m.relationship === relationship
    );
  }

  /**
   * Get all family members.
   * @returns An array of all FamilyMembers.
   */
  getAll(): FamilyMember[] {
    return Array.from(this.members.values());
  }

  /**
   * The number of members in the family.
   */
  get size(): number {
    return this.members.size;
  }
}
