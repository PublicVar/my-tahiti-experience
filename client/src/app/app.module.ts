import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

import { RouterModule }   from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ContentComponent } from './content/content.component';
import {Angular2AutoScroll} from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";

const routes = [
      {
        path: 'content/:type',
        component: ContentComponent
      }
    ];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ContentComponent,
    Angular2AutoScroll
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
