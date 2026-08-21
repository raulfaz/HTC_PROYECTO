import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare const AOS: {
  init(options: { duration: number; once: boolean }): void;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'HTC_PROYECTO';

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: false
    });
  }
}
