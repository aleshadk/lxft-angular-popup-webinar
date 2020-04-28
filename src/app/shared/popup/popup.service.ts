import { Injectable, ComponentFactoryResolver, Injector, ComponentRef, Type, ApplicationRef } from '@angular/core';
import { PopupComponent } from './popup.component';
import { IClosable } from './popup.models';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  public show<TResult>(title: string, child: ComponentRef<IClosable<TResult>>): Promise<TResult | null> {
    const popup = this.create(PopupComponent, child);
    popup.instance.title = title;
    popup.changeDetectorRef.detectChanges();
    child.changeDetectorRef.detectChanges();

    document.body.appendChild(popup.location.nativeElement); // TODO: is it ok? appRef?

    return this.init(popup, child);
  }

  public create<TComponent>(component: Type<TComponent>, child?: ComponentRef<{}>): ComponentRef<TComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    return factory.create(this.injector, child ? [[child.location.nativeElement]] : undefined);
  }

  private init<TResult>(popup: ComponentRef<PopupComponent>, child: ComponentRef<IClosable<TResult>>): Promise<TResult> {
    return new Promise<TResult>(resolve => {
      popup.instance.closed.subscribe(() => {
        this.destroy([popup, child]);
        resolve(null);
      });

      child.instance.closed.subscribe(result => {
        this.destroy([popup, child]);
        resolve(result);
      });
    });
  }

  private destroy(components: ComponentRef<{}>[]): void {
    components.forEach(z => {
      this.appRef.detachView(z.hostView);
      z.destroy();
    });
  }

}
