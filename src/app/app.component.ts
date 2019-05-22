import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'appS';
  form: FormGroup;

  constructor(
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]]
    });
  }
}
