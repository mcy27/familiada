import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementComponent } from './management.component';



@NgModule({
    declarations: [
        ManagementComponent
    ],
    exports: [
        ManagementComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ManagementModule { }
