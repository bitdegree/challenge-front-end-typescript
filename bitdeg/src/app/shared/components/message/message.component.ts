import { Component, OnInit } from "@angular/core";
import { BitdegMessageRef, MessageType } from "@core/models";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MessageService } from "@shared/services/message.service";

/**Listen for and display alert messages site wide*/
UntilDestroy({ checkProperties: true });
@Component({
  selector: "bitdeg-message",
  template: ` <div class="msg-wrapper position-fixed">
    <div
      class="alert alert-dismissible fade show w-100 shadowed mb-2"
      [ngClass]="getAlert(alert.message.type)"
      role="alert"
      *ngFor="let alert of alerts"
    >
      <div>{{ alert.message.message }}</div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        (click)="alert.hide()"
      ></button>
    </div>
  </div>`,
  styleUrls: ["./message.component.scss"],
})
export class MessageComponent implements OnInit {
  alerts: Array<BitdegMessageRef>;
  constructor(private msg: MessageService) {}

  ngOnInit(): void {
    this.msg.message$.subscribe((msgs) => {
      this.alerts = msgs;
      if (msgs) {
        msgs.forEach((alert) => {
          setTimeout(() => {
            alert.hide();
          }, alert.message.alertDuration || 5000);
        });
      }
    });
  }

  getAlert = (type: MessageType): string => {
    switch (type) {
      case "error":
        return "alert-danger";
      case "info":
        return "alert-info";
      case "success":
        return "alert-success";
      case "warn":
        return "alert-warning";
      case "light":
        return "alert-light";
      default:
        return "alert-danger";
    }
  };
}
