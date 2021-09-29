export type SkillLevels = "unknown" | "beginner" | "skilled" | "pro"

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

  getSkillLevelPercentage() {
    if (this.skillLevel === "unknown") {
      return 0
    }
    if (this.skillLevel === "beginner") {
      return (1 / 3) * 100
    }
    if (this.skillLevel === "skilled") {
      return (2 / 3) * 100
    }
    if (this.skillLevel === "pro") {
      return 100
    }
    console.error("error")
    return -1
  }

  updateSkillLevel(newSkillLevel: SkillLevels) {
    this.skillLevel = newSkillLevel
    // Update user skill level to DB
  }
}

export default SkillLevel
