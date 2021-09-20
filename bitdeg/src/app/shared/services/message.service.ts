import { Injectable } from "@angular/core";
import { BitdegMessage, BitdegMessageRef } from "@core/models/message.model";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private messageSource: BehaviorSubject<BitdegMessageRef[]> =
    new BehaviorSubject(null);
  private messages: Array<BitdegMessageRef> = [];
  message$ = this.messageSource.asObservable();
  constructor() {}

  show = (msg: BitdegMessage): BitdegMessageRef => {
    msg.id = this.messages.length;
    const ref: BitdegMessageRef = {
      message: msg,
      afterClose: new Subject(),
      hide: () => this.hide(ref),
    };
    this.messages.push(ref);
    this.messageSource.next(this.messages);
    return ref;
  };

  /**Use of a ref allows for multiple alerts and removal of each one */
  hide = (ref?: BitdegMessageRef): void => {
    if (ref) {
      this.messages.splice(ref.message.id!, 1); //alert is removed and array length changes(reduces), therefore invalidating original id
      this.messages.forEach((ref, i) => (ref.message.id = i)); //reset the id
      return ref.afterClose.next();
    }
    this.messageSource.next(null);
  };
}
