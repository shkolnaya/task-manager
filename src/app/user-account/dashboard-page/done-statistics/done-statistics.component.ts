import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StatisticsServiceService } from '../statistics-service.service';
import { Subject, interval, max, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-done-statistics',
  templateUrl: './done-statistics.component.html',
  styleUrls: ['./done-statistics.component.scss']
})
export class DoneStatisticsComponent implements OnInit {

  doneTasksCount: number;
  allTasksCount: number;

  numbertoDisplay: number = 0;

  constructor(private statService: StatisticsServiceService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.statService.getDoneStatistics().subscribe(
      res => {
        this.doneTasksCount = res.doneTasksCount;
        this.allTasksCount = res.allTasksCount;
        
        this.animateValue(this.doneTasksCount);
      }
    )
  }

  // ngAfterViewChecked(){
  //   this.animateValue(this.doneTasksCount);
    
  // }

  animateValue(maxValue: number){
    const destroy$ = new Subject<void>();
    interval(200)
    .pipe(takeUntil(destroy$))
    .subscribe(res => {
      if (res === maxValue) {
        destroy$.next();
      }

      this.numbertoDisplay = res
    });
// .subscribe(console.log);
//     while (this.numbertoDisplay <= maxValue) {
//       setTimeout(() => {
//         this.numbertoDisplay++;
//         console.log('fff');
//         this.cdr.detectChanges();
//       }, 100);


  }

}
