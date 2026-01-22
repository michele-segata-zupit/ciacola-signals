import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {distinctUntilChanged, tap} from 'rxjs';

export enum TipoSoggetto {
  PERSONA_FISICA = 'PERSONA_FISICA',
  PERSONA_GIURIDICA = 'PERSONA_GIURIDICA'
}

@Component({
  selector: 'app-reactiveform',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reactiveform.html',
  styleUrl: './reactiveform.scss',
})
export class Reactiveform implements OnInit {
  form: FormGroup;
  public readonly TipoSoggetto = TipoSoggetto;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
        tipoSoggetto: [null],
        cognome: [null],
        nome: [null],
        ragioneSociale: [null],
        pIva: [null],
      }
    );
  }

  ngOnInit(): void {
    this.form.controls['tipoSoggetto'].valueChanges.pipe(
      distinctUntilChanged(),
      tap(v => console.log('tipoSoggetto changed to:', v)),
      tap(v => {
        if (v === TipoSoggetto.PERSONA_FISICA) {
          this.form.controls['ragioneSociale'].setValue(undefined);
          this.form.controls['ragioneSociale'].disable();
          this.form.controls['pIva'].setValue(undefined);
          this.form.controls['pIva'].disable();
          this.form.controls['cognome'].enable();
          this.form.controls['nome'].enable();
        } else if (v === TipoSoggetto.PERSONA_GIURIDICA) {
          this.form.controls['cognome'].setValue(undefined);
          this.form.controls['cognome'].disable();
          this.form.controls['nome'].setValue(undefined);
          this.form.controls['nome'].disable();
          this.form.controls['ragioneSociale'].enable();
          this.form.controls['pIva'].enable();
        }
      }),
    ).subscribe();
  }

  protected submit() {
    console.dir(this.form.getRawValue());
  }
}
