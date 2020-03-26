import { throwError } from  'rxjs' ;
import { HttpErrorResponse } from '@angular/common/http';

export abstract class BaseService {

  constructor() { }

  protected handleError(error: HttpErrorResponse) {
    var applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return throwError(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = error.error;
    console.log("serverError = " + serverError);

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
     }
    }
    console.log("modelStateErrors = " + modelStateErrors);
    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return throwError(modelStateErrors || 'Server error');
  }
}