import { BehaviorSubject} from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class SelectionService {
    private messageSource = new BehaviorSubject<string>("default message");

    currentMessage = this.messageSource.asObservable();
  
}