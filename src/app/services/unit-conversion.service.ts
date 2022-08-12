import { Injectable } from '@angular/core';
import { MeasuringUnits } from '../interfaces/measuring-units';


@Injectable()
export class UnitConversionService {

  constructor() { }

  /** conerts measuring units */
  convertUnits(amount : number, from : {amount : number, name : string}, to : {amount : number, name : string}) : number
  {
    if ((from.name == "units" && to.name != "units") || (from.name != "units" && to.name == "units"))
    {
      alert("The Units of this object cannot be converted.")
      return -1;
    }
    if (from.name == to.name)
    {
      return amount;
    }
    // convert to cups
    const amountInCups = amount * from.amount;
    // convert to to
    const amountInTo = amountInCups * to.amount;
    return amountInTo;
  }


}
