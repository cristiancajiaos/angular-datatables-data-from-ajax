import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<unknown> = new Subject();

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      ajax: "http://jsonplaceholder.typicode.com/todos",
      columns: [
        {
          title: 'User ID',
          data: 'userId'
        },
        {
          title: 'Todo ID',
          data: 'id'
        },
        {
          title: 'Title',
          data: 'title'
        },
        {
          title: 'Completed?',
          data: 'completed'
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
