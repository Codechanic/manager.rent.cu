import {Pipe, PipeTransform} from '@angular/core';

const DEFAULT_SEASONS_IDS = ['7', '9'];

@Pipe({
  name: 'seasonScrub'
})
export class SeasonScrubPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return this.getScrubbedSeasons(value);
  }

  private getScrubbedSeasons(housePriceFormControls: any[]) {
    const nonDefaultSeason = housePriceFormControls.find(
      housePriceFormControl => !(DEFAULT_SEASONS_IDS.includes(
        housePriceFormControl.value.season.id !== null ? housePriceFormControl.value.season.id.toString() : null
      ))
    );
    if (nonDefaultSeason) {
      return housePriceFormControls.filter(
        housePriceFormControl => !(DEFAULT_SEASONS_IDS.includes(
          housePriceFormControl.value.season.id !== null ? housePriceFormControl.value.season.id.toString() : null
        ))
      );
    }
    return housePriceFormControls;
  }
}
