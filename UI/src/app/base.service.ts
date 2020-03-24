import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseService {

  constructor() { }

  protected handleError(error: HttpErrorResponse) {
    var applicationError = error.headers.get('Application-Error');

    if (applicationError) {
      return Observable.throw(applicationError);
    }
    var serverError = error.message;
    var modelStateErrors: string = serverError;
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }
}