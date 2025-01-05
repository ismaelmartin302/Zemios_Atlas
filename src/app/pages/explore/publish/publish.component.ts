import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-publish',
  imports: [ReactiveFormsModule],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent {
  @Output() closeModalEvent = new EventEmitter();
  publishForm: FormGroup;

  constructor(private fb: FormBuilder, private postsService: PostsService) {
    this.publishForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  sendPost() {
    if (this.publishForm.valid) {
      const post = this.publishForm.value;
      this.postsService.create(post).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al crear la publicación:', err);
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
