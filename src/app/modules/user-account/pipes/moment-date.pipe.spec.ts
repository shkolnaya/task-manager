import { MatDateFormats } from '@angular/material/core';
import { MomentDatePipe } from './moment-date.pipe';

describe('MomentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MomentDatePipe({} as MatDateFormats);
    expect(pipe).toBeTruthy();
  });
});
