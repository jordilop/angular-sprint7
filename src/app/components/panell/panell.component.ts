import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent {

  panellForm: FormGroup;

  constructor(private _builder: FormBuilder) {
    this.panellForm = this._builder.group({
      pages: [this.pages, [Validators.required, Validators.pattern("^[0-9]*$")]],
      langs: [this.langs, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  @Output() pagesEvent = new EventEmitter<number>();
  @Output() langsEvent = new EventEmitter<number>();

  pages = 0;
  langs = 0;

  onKeyup(e: any) {
    let { name, value } = e.target;

    name == 'pages' ? this.pages = value : this.langs = value;

    this.pagesEvent.emit(this.pages);
    this.langsEvent.emit(this.langs);
  }
}
