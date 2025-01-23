import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ViewModule} from "./view/view/view.module";
import {ManagementModule} from "./management/management.module";
import {CommonModule} from "@angular/common";
import { FinalManagementComponent } from './final/final-management/final-management.component';
import { FinalViewComponent } from './final/final-view/final-view.component';
import {FormsModule} from "@angular/forms";
import {FullscreenApiService} from "./services/fullscreen-api.service";
import {AddQuestionsComponent} from "./addquestions/add-questions.component";

@NgModule({
  declarations: [
    AppComponent,
    FinalManagementComponent,
    FinalViewComponent,
    AddQuestionsComponent
  ],
    imports: [
        BrowserModule,
        ViewModule,
        ManagementModule,
        CommonModule,
        FormsModule
    ],
  providers: [FullscreenApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
