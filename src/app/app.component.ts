import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonPropsModel } from '@syncfusion/ej2-angular-popups';
import { NodeSelection, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { Dialog } from '@syncfusion/ej2-popups';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { ToolbarService, LinkService, ImageService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [RichTextEditorModule, DialogModule],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class AppComponent {
  title = 'angular-richtexteditor';
  public selection: NodeSelection = new NodeSelection();
  @ViewChild('exampleRTE')
  public rteObject!: RichTextEditorComponent;
  public range!: Range;
  @ViewChild('sampleDialog')
  public dialogObject !: Dialog;
  public dialogButtons: ButtonPropsModel[] = [
    { buttonModel: { content: 'Insert', isPrimary: true }, click: this.onInsert.bind(this)  },
    { buttonModel: { content: 'Cancel' }, click: this.dialogOverlay.bind(this) }];
  public onInsert(): void {
    const activeElement: Element | null = this.dialogObject.element.querySelector('.char_block.e-active');
    if (activeElement) {
      this.range.insertNode(document.createTextNode((activeElement as any).textContent));
    }
    this.dialogOverlay();
  }
  public dialogOverlay(): void {
    const activeElement: Element | null  = this.dialogObject.element.querySelector('.char_block.e-active');
    if (activeElement) {
          activeElement.classList.remove('e-active');
    }
    this.dialogObject.hide();
  }
  public customToolbar: Object = {
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList',
    'UnorderedList', '|', 'CreateLink', 'Image', '|', 
    {
        tooltipText: 'Insert Symbol',
        click: this.onButtonClick.bind(this),
        template: '<button class="e-tbar-btn e-btn" tabindex="-1" id="custom_tbar"  style="width:100%">'
                  + '<div class="e-tbar-btn-text" style="font-weight: 500;">Ω</div></button>'
    }, '|', 'Undo', 'Redo'
    ]};
    public dialogCreate(): void {
      let dialogElement: HTMLElement = document.getElementById('rteSpecial_character') as HTMLElement;
      dialogElement.onclick = (e: Event) => {
          let target: HTMLElement = e.target as HTMLElement;
          let activeElement: Element | null = this.dialogObject.element.querySelector('.char_block.e-active');
          if (target.classList.contains('char_block')) {
              target.classList.add('e-active');  
              if (activeElement) {
                activeElement.classList.remove('e-active');
            }            
          }
      };
      }
    public onButtonClick() {
      this.rteObject.focusIn();
      this.range = this.selection.getRange(document);
      this.dialogObject.show();
      }
  
}
