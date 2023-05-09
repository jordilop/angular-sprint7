import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent {

  textModal: Array<string> = [
    "Servei per triar el nombre de págines de la seva pàgina Web",
    "Servei per triar el nombre d'idiomes de la seva pàgina Web"
  ];

  panellForm: FormGroup;

  constructor(private _builder: FormBuilder) {
    this.panellForm = this._builder.group({
      pages: [this.pages, [Validators.required, Validators.pattern("^[0-9]*$")]],
      langs: [this.langs, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  @Output() pagesEvent = new EventEmitter<number>();
  @Output() langsEvent = new EventEmitter<number>();

  @Input() pages!: number;
  @Input() langs!: number;

  onKeyup(e: any) {
    const { name, value } = e.target;

    if (name == 'pages') {
      this.pages = value;
      this.sendEmitEventPages();
    }
    if (name == 'langs') {
      this.langs = value;
      this.sendEmitEventLangs();
    }
  }

  increment(name: string) {
    if (name == 'pages') {
      this.pages++;
      this.sendEmitEventPages();
    }
    if (name == 'langs') {
      this.langs++;
      this.sendEmitEventLangs();
    }
  }

  decrement(name: string) {
    if (name == 'pages' && this.pages > 0) {
      this.pages--;
      this.sendEmitEventPages();
    }
    if (name == 'langs' && this.langs > 0) {
      this.langs--;
      this.sendEmitEventLangs();
    }
  }

  sendEmitEventPages() {
    this.pagesEvent.emit(this.pages);
  }

  sendEmitEventLangs() {
    this.langsEvent.emit(this.langs);
  }
}
