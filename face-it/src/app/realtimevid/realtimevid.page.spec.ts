import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealtimevidPage } from './realtimevid.page';

describe('RealtimevidPage', () => {
  let component: RealtimevidPage;
  let fixture: ComponentFixture<RealtimevidPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RealtimevidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
