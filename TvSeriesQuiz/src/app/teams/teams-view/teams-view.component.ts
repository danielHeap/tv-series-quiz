import { TeamsQueryService } from './../../../shared/services/teams-query.service';
import { TeamModel } from './../../../shared/models/team.model';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teams-view',
  templateUrl: './teams-view.component.html',
  styleUrls: ['./teams-view.component.scss'],
})
export class TeamsViewComponent implements OnInit, OnDestroy {
  showAdd = false;
  data: TeamModel[] | undefined;
  dataSub!: Subscription;
  columns!: number;

  get isLoading() {
    return this.teamsQueryService.isLoading;
  }

  constructor(private teamsQueryService: TeamsQueryService) {
    this.initData();
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    this.columns = Math.floor(window.innerWidth / 500);
  }

  openAdd() {
    this.showAdd = true;
  }
  hideAdd(changed: boolean) {
    this.showAdd = false;
    if (changed) {
      this.teamsQueryService.reload();
    }
  }

  showLoader() {
    this.teamsQueryService.lockSaving();
  }

  private initData() {
    this.dataSub = this.teamsQueryService.getData().subscribe((questions) => {
      this.data = questions;
    });
  }
}
