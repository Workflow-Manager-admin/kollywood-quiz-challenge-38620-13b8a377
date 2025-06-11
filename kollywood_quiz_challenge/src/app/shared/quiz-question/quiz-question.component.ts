import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE: A general reusable quiz question component
@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-question.component.html',
  styleUrl: './quiz-question.component.css'
})
export class QuizQuestionComponent {
  @Input() question!: any;
  @Input() questionIndex: number = 0;
  @Input() totalQuestions: number = 0;
  @Input() userAnswer: string = '';
  @Input() showClues: boolean = true;
  @Input() clues: string[] = [];
  @Input() imageUrl: string | null = null;
  @Input() inputPlaceholder: string = "Enter your answer";
  @Input() allowAnswer: boolean = true;
  @Input() revealMode: boolean = false;
  @Input() revealLabel: string = "Reveal Answer";
  @Input() answerRevealed: boolean = false;

  @Output() answer = new EventEmitter<string>();
  @Output() reveal = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  tempInput: string = '';

  setAnswer(val: string) {
    this.tempInput = val;
    this.answer.emit(val);
  }

  revealAnswer() {
    this.reveal.emit();
  }

  goNext() {
    this.next.emit();
  }
}
