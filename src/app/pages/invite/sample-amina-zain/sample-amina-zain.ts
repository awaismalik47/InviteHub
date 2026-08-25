import { Component } from '@angular/core';
import { InvitePinGate } from '../../../components/invite-pin-gate/invite-pin-gate';
import { InviteTemplateBasic } from '../../../components/invite-template-basic/invite-template-basic';
import { InvitationData } from '../../../data/invitation';

/**
 * Placeholder client page: proves the routing + template + PIN-gate pattern
 * end to end, and doubles as the starting point for a real client — duplicate
 * this folder, replace DATA, add one route in app.routes.ts with a fresh
 * random-suffixed path, and drop any media into a matching
 * public/invites/<slug>/ folder.
 */
const DATA: InvitationData = {
  eyebrow: 'Wedding',
  title: 'Amina & Zain',
  subheading: 'Request the pleasure of your company',
  dateLabel: 'Saturday, 14th February 2026',
  venueName: 'The Grand Willow Estate',
  venueAddress: 'Lahore',
  message: 'We can’t wait to celebrate this day with the people we love most.',
  pin: 'sample1234',
};

@Component({
  imports: [InvitePinGate, InviteTemplateBasic],
  selector: 'app-sample-amina-zain',
  template: `
    <app-invite-pin-gate [pin]="DATA.pin">
      <app-invite-template-basic [data]="DATA" />
    </app-invite-pin-gate>
  `,
})
export class SampleAminaZain {
  protected readonly DATA = DATA;
}
