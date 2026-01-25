import {Component, effect, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TipoSoggetto} from '../../models/tipo-soggetto';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signal-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './signal-form.component.html',
  styleUrl: './signal-form.component.scss',
  standalone: true
})
export class SignalForm implements OnInit {
  form: FormGroup;
  public readonly TipoSoggetto = TipoSoggetto;
  public readonly tipoSoggetoChange;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
        tipoSoggetto: [null],
        cognome: [null],
        nome: [null],
        ragioneSociale: [null],
        pIva: [null],
      }
    );
    this.tipoSoggetoChange = toSignal<TipoSoggetto>(this.form?.controls['tipoSoggetto']?.valueChanges);
    effect(() => {
      const tipoSoggettoValue = this.tipoSoggetoChange();
      console.log('tipoSoggetto changed to:', tipoSoggettoValue);
      this.manageTipOSoggettoChange(tipoSoggettoValue);
    });
  }

  ngOnInit(): void {

  }

  manageTipOSoggettoChange(tipoSoggetto: TipoSoggetto | undefined) {
    if (!tipoSoggetto) {
      return;
    }
    if (tipoSoggetto === TipoSoggetto.PERSONA_FISICA) {
      this.form.controls['ragioneSociale'].setValue(undefined);
      this.form.controls['ragioneSociale'].disable();
      this.form.controls['pIva'].setValue(undefined);
      this.form.controls['pIva'].disable();
      this.form.controls['cognome'].enable();
      this.form.controls['nome'].enable();
    } else if (tipoSoggetto === TipoSoggetto.PERSONA_GIURIDICA) {
      this.form.controls['cognome'].setValue(undefined);
      this.form.controls['cognome'].disable();
      this.form.controls['nome'].setValue(undefined);
      this.form.controls['nome'].disable();
      this.form.controls['ragioneSociale'].enable();
      this.form.controls['pIva'].enable();
    }
  }

  protected submit() {
    console.dir(this.form.getRawValue());
  }
}
