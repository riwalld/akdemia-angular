import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionFormService {

  constructor(private fb: FormBuilder) { }

  getSessionForm() {
    return this.fb.group({
      id: [''],
      code: ['', Validators.required],
      duration	: ['', Validators.required],
      description	: ['',Validators.required],
      date: ['',Validators.required],
      price: ['', Validators.required],
      location: ['',Validators.required],
      sessionScore	: ['',Validators.required],
      minParticipants: [''],
      manager: [],
      trainer: [],
      training: [],
    })
  }
}
