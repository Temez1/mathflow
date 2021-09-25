interface AnswerData {
  streak: number

  answers: number

  correctAnswers: number

  answersWithHelp: number
}

class SessionAnswers implements AnswerData {
  subTopicsHistory: AnswerData[]

  lastFiveAnswers: AnswerData

  streak: number

  answers: number

  correctAnswers: number

  answersWithHelp: number

  helpUsed: boolean

  constructor() {
    this.subTopicsHistory = []
    this.lastFiveAnswers = {
      streak: 0,
      answers: 0,
      answersWithHelp: 0,
      correctAnswers: 0,
    }
    this.streak = 0
    this.answers = 0
    this.correctAnswers = 0
    this.answersWithHelp = 0
    this.helpUsed = false
  }

  saveSubTopicAnswers() {
    const currentSubTopicAnswers = {
      streak: this.streak,
      answers: this.answers,
      correctAnswers: this.correctAnswers,
      answersWithHelp: this.answersWithHelp,
    }
    this.subTopicsHistory.push(currentSubTopicAnswers)
  }

  resetLastFiveAnswers() {
    this.lastFiveAnswers = {
      streak: 0,
      answers: 0,
      answersWithHelp: 0,
      correctAnswers: 0,
    }
  }

  private updateLastFiveAnswers(correct: boolean) {
    if (this.lastFiveAnswers.answers === 5) {
      if (correct) {
        if (this.lastFiveAnswers.correctAnswers !== 5) {
          this.lastFiveAnswers.correctAnswers += 1
        }
        if (this.lastFiveAnswers.streak !== 5) {
          this.lastFiveAnswers.streak += 1
          console.log("last five answers streak", this.lastFiveAnswers.streak)
        }
      } else {
        if (this.lastFiveAnswers.correctAnswers !== 0) {
          this.lastFiveAnswers.correctAnswers -= 1
        }
        console.log("Last five answers streak lost")
        this.lastFiveAnswers.streak = 0
      }

      if (this.helpUsed) {
        if (this.lastFiveAnswers.answersWithHelp !== 5) {
          this.lastFiveAnswers.answersWithHelp += 1
        }
      } else if (this.lastFiveAnswers.answersWithHelp !== 0) {
        this.lastFiveAnswers.answersWithHelp -= 1
      }
    } else {
      this.lastFiveAnswers.answers += 1

      if (correct) {
        this.lastFiveAnswers.correctAnswers += 1
        this.lastFiveAnswers.streak += 1
        console.log("last five answers streak", this.lastFiveAnswers.streak)
      } else {
        console.log("Last five answers streak lost")
        this.lastFiveAnswers.streak = 0
      }

      if (this.helpUsed) {
        this.lastFiveAnswers.answersWithHelp += 1
      }
    }
  }

  private AddAnswer() {
    this.answers += 1
    if (this.helpUsed) {
      this.answersWithHelp += 1
    }
  }

  addRightAnswer() {
    this.updateLastFiveAnswers(true)
    this.streak += 1
    this.correctAnswers += 1
    this.AddAnswer()
    this.helpUsed = false
  }

  addWrongAnswer() {
    this.updateLastFiveAnswers(false)
    this.streak = 0
    this.AddAnswer()
  }
}

export default SessionAnswers
