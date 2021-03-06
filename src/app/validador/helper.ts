import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { RegistrarUsuarioService } from '../services/registrar-usuario.service';
import { map, catchError} from 'rxjs/operators';
import { ServiciosService } from '../services/servicios.service';
import { BancosService } from '../services/bancos.service';


export function passValidator (control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const confClave = control.value;
    const passControl = control.root.get('clave');
      if (passControl) {
        const passValue = passControl.value;
        if ( passValue !== confClave ) {
          return {
            isError: true
          };
        }
      }
    }
  return null;
}

export function espacioVacio(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const campo = control.value;
    if (campo !== null) {
      if (campo.trim() === '') {
        return {
          isVacio: true
        };
      }
    }

  }
  return null;
}
// validaciones asincronas
export function correoUnico(servicio: RegistrarUsuarioService): AsyncValidatorFn {

  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return servicio.getUserByEmail(control.value)
    .pipe(
      map(resp => {
          return (resp && resp.length > 0) ? {existeCorreo: true} : null;
        }),
        catchError(error => null)
    );
  };
}

export function servicioUnico(servicio: ServiciosService ): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return servicio.verificarServicioUnico(control.value)
    .pipe(
      map(resp => {
          return (resp && resp.length > 0 ) ? {existeServicio: true} : null;
      }),
      catchError(error => null)
    );
  };
}

export function cuentaBancoUnico(servicio: BancosService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return servicio.verificarCuentaUnico(control.value)
    .pipe(
      map(resp => {
          return (resp && resp.length > 0 ) ? {existeCuenta: true} : null;
      }),
      catchError(error => null)
    );
  };
}

