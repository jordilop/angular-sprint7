import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

  @Input() text: string = '';

  constructor(private modal: NgbModal) { }

  openModal(content: any) {
    this.modal.open(content, { windowClass: 'modal-custom' })
  }

}
