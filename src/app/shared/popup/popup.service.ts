import { Injectable, ComponentFactoryResolver, Injector, ComponentRef, Type } from '@angular/core';
import { PopupComponent } from './popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  public show(title: string): void {
    const popup = this.create(PopupComponent);
    popup.instance.title = title;
    popup.changeDetectorRef.detectChanges();

    document.body.appendChild(popup.location.nativeElement); // TODO: is it ok?
  }

  public create<TComponent>(component: Type<TComponent>): ComponentRef<TComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    return factory.create(this.injector);
  }

}
