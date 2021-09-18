import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bitdeg-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  test() {
    const body = document.querySelector("body");
    body.classList.contains("light-theme")
      ? body.classList.replace("light-theme", "dark-theme")
      : body.classList.contains("dark-theme")
      ? body.classList.replace("dark-theme", "light-theme")
      : body.classList.add("dark-theme");
  }
}
