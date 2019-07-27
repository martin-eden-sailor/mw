import {InjectionToken} from '@angular/core';

/**
 * Error formaters.
 */
export const defaultErrors = {
  required: (error: any): string => `This field is required.`,
  minlength: ({requiredLength, actualLength}): string => {
    return `Expect ${requiredLength} but got ${actualLength}`;
  }
};

/**
 * Error formaters injected.
 */
export const FORM_ERRORS = new InjectionToken<any>('FORM_ERRORS');
