import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges,
  ViewEncapsulation,
  OnChanges,
} from '@angular/core';
import { trimLabel, formatLabel } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts-advanced-legend',
  template: `
    <div class="advanced-pie-legend"
      [style.width.px]="width">
      <div class="yoshi">
        <div
          *ngIf="animations"
          class="total-value"
          ngx-charts-count-up
          [countTo]="roundedTotal">
        </div>
        <div *ngIf="!animations">
          {{roundedTotal}}
        </div>
        <div class="total-label">
        Total
        </div>
      </div>
      <div class="yoshi">
        <div
          *ngIf="animations"
          class="total-value"
          ngx-charts-count-up
          [countDecimals]="2"
          [countTo]="roundedMean">
        </div>
        <div *ngIf="!animations">
          {{roundedMean}}
        </div>
        <div class="total-label">
          Avg
        </div>
      </div>
      <div class="yoshi">
        <div
          *ngIf="animations"
          class="total-value"
          ngx-charts-count-up
          [countDecimals]="2"
          [countTo]="roundedStdev">
        </div>
        <div *ngIf="!animations">
          {{roundedStdev}}
        </div>
        <div class="total-label">
          Stdev
        </div>
      </div>
      <div class="legend-items-container">
        <div class="legend-items">
          <div
            *ngFor="let legendItem of legendItems; trackBy:trackBy"
            tabindex="-1"
            class="legend-item"
            (mouseenter)="activate.emit(legendItem.label)"
            (mouseleave)="deactivate.emit(legendItem.label)"
            (click)="select.emit({ name: legendItem.label, value: legendItem.value })">
            <div
              class="item-color"
              [style.background]="legendItem.color">
            </div>
            <div *ngIf="animations"
              class="item-value"
              ngx-charts-count-up
              [countTo]="legendItem.value">
            </div>
            <div *ngIf="!animations" class="item-value">
              {{legendItem.value}}
            </div>
            <div class="item-label">{{legendItem.label}}</div>
            <div *ngIf="animations"
              class="item-percent"
              ngx-charts-count-up
              [countTo]="legendItem.percentage"
              [countSuffix]="'%'">
            </div>
            <div *ngIf="!animations"
              class="item-percent">
              {{legendItem.percentage.toLocaleString()}}%
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./advanced-legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedLegendComponent implements OnChanges {
  @Input() width: number;
  @Input() data;
  @Input() colors;
  @Input() animations: boolean = true;

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  legendItems: any[] = [];
  total: number;
  roundedTotal: number;
  mean: number;
  roundedMean: number;
  stdev: number;
  roundedStdev: number;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  getTotal(): number {
    return this.data.map(d => d.value).reduce((sum, d) => sum + d, 0);
  }

  getMean(): number {
    return (
      this.data.reduce((sum, item) => sum + +item.name * item.value, 0) /
      this.total
    );
  }

  getStdev(): number {
    return Math.sqrt(
      this.data.reduce(
        (sum, item) =>
          sum + (this.mean - item.value) * (this.mean - item.value),
        0,
      ) /
        (this.total - 1),
    );
  }

  update(): void {
    this.total = this.getTotal();
    this.mean = this.getMean();
    this.stdev = this.getStdev();
    this.roundedTotal = this.total;
    this.roundedMean = this.mean;
    this.roundedStdev = this.stdev;

    this.legendItems = this.getLegendItems();
  }

  getLegendItems(): any {
    return this.data.map((d, index) => {
      const label = formatLabel(d.name);
      const value = d.value;
      const percentage = this.total > 0 ? value / this.total * 100 : 0;
      const color = this.colors.getColor(label);

      return {
        value,
        color,
        label: trimLabel(label, 20),
        originalLabel: d.name,
        percentage,
      };
    });
  }

  trackBy(item) {
    return item.formattedLabel;
  }
}
