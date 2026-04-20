import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // <-- add here
  imports: [
    BrowserModule,
    RichTextEditorModule,
    DialogModule,
  ],

  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
