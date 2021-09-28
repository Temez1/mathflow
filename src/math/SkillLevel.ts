export type SkillLevels = "unknown" | "beginner" | "skilled" | "pro" | "expert"

class SkillLevel {
  private skillLevel: SkillLevels

  constructor() {
    this.skillLevel = "unknown"
  }

  initSkillLevel(newSkillLevel: SkillLevels) {
    this.skillLevel = newSkillLevel
  }

  getSkillLevel() {
    return this.skillLevel
  }

  updateSkillLevel(newSkillLevel: SkillLevels) {
    this.skillLevel = newSkillLevel
    // Update user skill level to DB
  }
}

export default SkillLevel
