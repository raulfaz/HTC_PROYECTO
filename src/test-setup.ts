import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';

export const TEST_PROVIDERS = [
  provideRouter([]),
  provideHttpClient(),
  provideHttpClientTesting(),
  provideNoopAnimations(),
  { provide: MAT_DIALOG_DATA, useValue: {} },
  { provide: MatDialogRef, useValue: { close: () => undefined } }
];
