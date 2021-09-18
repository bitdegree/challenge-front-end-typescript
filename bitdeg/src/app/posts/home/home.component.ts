import { Component, OnInit } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: "bitdeg-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
  
}
