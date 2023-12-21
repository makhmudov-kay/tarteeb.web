import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ContentLoaderModule } from '@ngneat/content-loader';

@Component({
  selector: 'app-skeleton-statistic-cards',
  templateUrl: './skeleton-statistic-cards.component.html',
  styleUrls: ['./skeleton-statistic-cards.component.less'],
  standalone: true,
  imports: [NgFor, ContentLoaderModule],
})
export class SkeletonStatisticCardsComponent {}
