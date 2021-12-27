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
    Subject,
    Observable,
    merge,
    startWith,
    takeUntil,
    tap,
    switchMap,
    of,
    catchError,
    EMPTY,
} from 'rxjs';

@Component({
    selector: 'app-demandes-details',
    templateUrl: './demandes-details.component.html',
    styleUrls: ['./demandes-details.component.scss'],
})
export class DemandesDetailsComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    unsubscribe$ = new Subject<void>();

    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator;

    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();
    transactions$: Observable<any[]>;
    typs = TYPEDATA;
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
}

export interface Type {
    name: string;
    class: string;
    icone: string;
}

const TYPEDATA: Type[] = [
    { name: 'EN PROGRESSION', icone: 'check', class: '' },
    { name: 'VAIDER', icone: 'check', class: ' text-green-500' },
    {
        name: 'EN PAUSE',
        icone: 'pause_circle_outline',
        class: 'text-amber-500',
    },
    { name: 'REJETER', icone: 'close', class: 'text-red-600' },
];
