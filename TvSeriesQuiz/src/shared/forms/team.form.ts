import { TeamModel } from './../models/team.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as newGuid } from 'uuid';

function init() {
  return {
    id: new FormControl(newGuid(), Validators.required),
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    picturePath: new FormControl(null),
  };
}
export class TeamForm extends FormGroup {
  get id() {
    return this.get('id') as FormControl;
  }

  get name() {
    return this.get('name') as FormControl;
  }

  get picturePath() {
    return this.get('picturePath') as FormControl;
  }

  constructor() {
    super(init());
  }

  public toModel() {
    return new TeamModel(this.id.value, this.name.value, this.picturePath.value);
  }
}
