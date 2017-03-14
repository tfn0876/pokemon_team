import { Component, OnInit } from '@angular/core';
import { FileUploader } from '../fileupload/file-uploader.class';
import { FileItem } from '../fileupload/file-item.class';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    showDialog: boolean = false;
    constructor() { }
    ngOnInit() { }
}