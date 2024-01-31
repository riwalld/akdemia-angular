import {Injectable} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionFormService {

  currentDate = new Date();

  constructor(private fb: FormBuilder) {
  }

  getSessionForm() {
    return this.fb.group({
      id: [''],
      code: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
      status: [null],
      date: [this.currentDate, [Validators.required]],
      price: ['', Validators.required],
      location: ['', Validators.required],
      sessionScore: ['', Validators.required],
      minParticipants: ['', Validators.required],
      company: [],
      trainer: [],
      training: [],
    })
  }

  getLoginForm() {
    return this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }
}
