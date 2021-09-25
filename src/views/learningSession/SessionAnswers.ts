interface LastFiveAnswers {
  answers: number
  answersWithHelp: number
  correctAnswers: number
}

class SessionAnswers {
  lastFiveAnswers: LastFiveAnswers

  streak: number

  answers: number

  correctAnswers: number

  answersWithHelp: number

  answersWithoutHelp: number

  helpUsed: boolean

  constructor() {
    this.lastFiveAnswers = { answers: 0, answersWithHelp: 0, correctAnswers: 0 }
    this.streak = 0
    this.answers = 0
    this.correctAnswers = 0
    this.answersWithHelp = 0
    this.answersWithoutHelp = 0
    this.helpUsed = false
  }

  private updateLastFiveAnswers(correct: boolean) {
    if (this.lastFiveAnswers.answers === 5) {
      if (correct) {
        if (this.lastFiveAnswers.correctAnswers !== 5) {
          this.lastFiveAnswers.correctAnswers += 1
        }
      } else if (this.lastFiveAnswers.correctAnswers !== 0) {
        this.lastFiveAnswers.correctAnswers -= 1
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
    } else {
      this.answersWithoutHelp += 1
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
