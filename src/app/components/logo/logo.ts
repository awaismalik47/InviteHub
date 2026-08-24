import { Component, input } from '@angular/core';

export type LogoLayout = 'horizontal' | 'stacked' | 'icon';

@Component({
  imports: [],
  selector: 'app-logo',
  styleUrl: './logo.scss',
  templateUrl: './logo.html',
})
export class Logo {
  layout = input<LogoLayout>('horizontal');
}
