import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    workflow: any = {
        _id: '7598575875985795',
        title: 'WorkFlow 1',
    };

    forms = ['Document requirs pour la demande', 'form 2', 'form3'];
    showForm = false;
    constructor() {}

    ngOnInit(): void {}
    chooseForm() {
        this.showForm = !this.showForm;
    }
    updateWorkFlow(event, title: string) {
        console.log(event, title);

        this.workflow[title] = event.value;
    }
}
