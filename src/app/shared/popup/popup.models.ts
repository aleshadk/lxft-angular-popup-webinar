import { EventEmitter } from '@angular/core';

export interface IClosable<TResult> {
    closed: EventEmitter<TResult>;
}
