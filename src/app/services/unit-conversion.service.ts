import { Injectable } from '@angular/core';
import { MeasuringUnits } from '../interfaces/measuring-units';


@Injectable({
  providedIn: 'root'
})
export class UnitConversionService {

  constructor() { }

  /** conerts measuring units */
  convertUnits(amount : number, from : MeasuringUnits, to : MeasuringUnits) : number
  {
    if (from == MeasuringUnits.Units || to == MeasuringUnits.Units)
    {
      alert("The Units of this object cannot be converted.")
      return -1;
    }
    // convert to cups
    const amountInCups = amount * from;
    // convert to to
    const amountInTo = amountInCups * to;
    return amountInTo;
  }


}
