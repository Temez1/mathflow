import {
  addDoc,
  doc,
  updateDoc,
  collection,
  Firestore,
} from "firebase/firestore"
import { User } from "firebase/auth"

export type SkillLevels = "unknown" | "beginner" | "skilled" | "pro"

class SkillLevel {
  private id: string | undefined

  private skillLevel: SkillLevels

  constructor() {
    this.skillLevel = "unknown"
    this.id = undefined
  }

  initSkillLevel(id: string, skillLevel: SkillLevels) {
    this.id = id
    this.skillLevel = skillLevel
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

  async updateSkillLevel(
    newSkillLevel: SkillLevels,
    firestore: Firestore,
    user: User,
    categoryKey: string,
    topicKey: string,
    subTopicKey: string
  ) {
    this.skillLevel = newSkillLevel

    if (this.id) {
      await updateDoc(
        doc(firestore, "users", user.uid, "skillLevels", this.id),
        {
          skillLevel: newSkillLevel,
        }
      )
    } else {
      await addDoc(collection(firestore, "users", user.uid, "skillLevels"), {
        skillLevel: newSkillLevel,
        categoryKey,
        topicKey,
        subTopicKey,
      })
    }
  }
}

export default SkillLevel
