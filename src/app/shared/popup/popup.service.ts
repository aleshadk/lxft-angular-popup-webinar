import { Injectable, ComponentFactoryResolver, Injector, ComponentRef, Type, ApplicationRef } from '@angular/core';
import { PopupComponent } from './popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  public show(title: string, child: ComponentRef<{}>): void {
    const popup = this.create(PopupComponent, child);
    popup.instance.title = title;
    popup.changeDetectorRef.detectChanges();
    child.changeDetectorRef.detectChanges();

    document.body.appendChild(popup.location.nativeElement); // TODO: is it ok? appRef?

    this.init(popup);
  }

  public create<TComponent>(component: Type<TComponent>, child?: ComponentRef<{}>): ComponentRef<TComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    return factory.create(this.injector, child ? [[child.location.nativeElement]] : undefined);
  }

  private init(popup: ComponentRef<PopupComponent>): void {
    popup.instance.closed.subscribe(() => {
      this.appRef.detachView(popup.hostView);
      popup.destroy();
    });
  }

}
