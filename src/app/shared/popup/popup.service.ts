import { Injectable, ComponentFactoryResolver, Injector, ComponentRef, Type, ApplicationRef } from '@angular/core';
import { PopupComponent } from './popup.component';
import { IClosable } from './popup.models';
import { Subscription } from 'rxjs';

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
    const domElem = (popup.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    return this.init(popup, child);
  }

  public create<TComponent>(component: Type<TComponent>, child?: ComponentRef<{}>): ComponentRef<TComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector, child ? [[child.location.nativeElement]] : undefined);
    this.appRef.attachView(componentRef.hostView);
    return componentRef;
  }

  private init<TResult>(popup: ComponentRef<PopupComponent>, child: ComponentRef<IClosable<TResult>>): Promise<TResult> {
    return new Promise<TResult>(resolve => {
      const sub = new Subscription();
      const components = [popup, child];

      components.forEach(z => {
        sub.add(z.instance.closed.subscribe(result => {
          resolve(result);
          sub.unsubscribe();
          this.destroy(components);
        }));
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
