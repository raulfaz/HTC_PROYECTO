import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var AOS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HTC_PROYECTO';
}
