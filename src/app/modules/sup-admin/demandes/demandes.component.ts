import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {
    catchError,
    EMPTY,
    merge,
    Observable,
    of,
    startWith,
    Subject,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs';

@Component({
    selector: 'app-demandes',
    templateUrl: './demandes.component.html',
    styleUrls: ['./demandes.component.scss'],
})
export class DemandesComponent implements OnInit, AfterViewInit, OnDestroy {
    unsubscribe$ = new Subject<void>();

    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator;

    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    transactions$: Observable<any[]>;

    data: any;
    search$ = new Subject<void>();
    error: string;
    dataSource: any = { data: [], count: 0 };

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _ac: ActivatedRoute, private _dialog: MatDialog) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        merge(this.paginator?.page, this.search$)
            .pipe(
                startWith([{ pageIndex: 0, pageSize: 50 }, {}]),
                takeUntil(this.unsubscribe$),
                tap(() => {
                    this.isLoading = true;
                    this.error = undefined;
                    this.dataSource = { ...this.dataSource, data: [] };
                }),
                switchMap(() =>
                    of({ data: [], count: 10 }).pipe(
                        catchError((err) => {
                            this.isLoading = false;
                            this.error = err.message;
                            return EMPTY;
                        })
                    )
                )
            )
            .subscribe((res: any) => {
                this.isLoading = false;
                this.dataSource.data = res?.data;
                this.dataSource.count = res?.count;
                this.transactions$ = of(res?.data);
            });
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    filter() {}

    getDetails(element) {}
    delete(element) {}
}
