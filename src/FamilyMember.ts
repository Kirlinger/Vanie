export type Relationship =
  | "parent"
  | "child"
  | "sibling"
  | "spouse"
  | "grandparent"
  | "grandchild"
  | "aunt/uncle"
  | "niece/nephew"
  | "cousin"
  | "other";

export interface FamilyMemberOptions {
  id?: string;
  name: string;
  birthDate?: Date;
  relationship: Relationship;
}

export class FamilyMember {
  readonly id: string;
  name: string;
  birthDate?: Date;
  relationship: Relationship;

  constructor(options: FamilyMemberOptions) {
    this.id =
      options.id ??
      Math.random().toString(36).substring(2) + Date.now().toString(36);
    this.name = options.name;
    this.birthDate = options.birthDate;
    this.relationship = options.relationship;
  }

  get age(): number | undefined {
    if (!this.birthDate) return undefined;
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const monthDiff = today.getMonth() - this.birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < this.birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate?.toISOString(),
      relationship: this.relationship,
      age: this.age,
    };
  }
}
