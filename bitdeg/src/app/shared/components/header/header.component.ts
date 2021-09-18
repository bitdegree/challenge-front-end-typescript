import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bitdeg-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {

  darkMode: boolean;
  constructor() {}

  ngOnInit(): void {
    this.darkMode = this.check();
  }

  test() {
    const body = document.querySelector("body");
    body.classList.contains("light-theme")
      ? body.classList.replace("light-theme", "dark-theme")
      : body.classList.contains("dark-theme")
      ? body.classList.replace("dark-theme", "light-theme")
      : body.classList.add("dark-theme");
    this.darkMode = this.check();
  }

  check(): boolean {
   return document.querySelector("body").classList.contains("dark-theme");
  }
}
