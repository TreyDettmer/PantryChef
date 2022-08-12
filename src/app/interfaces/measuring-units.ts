export var MeasuringUnits  = 
[
        {amount: 1, aliases: ["cup","cups"]},
        {amount: 0.0625, aliases: ["tbsp","tbsps","tablespoons","table spoons", "table spoon"]},
        {amount: 0.0208333, aliases: ["tsp","tsps","teaspoons","tea spoons", "tea spoon"]},
        {amount: 0.125, aliases: ["oz","ounce","ounces"]},
        {amount: 2, aliases: ["pint","pints"]},
        {amount: 4, aliases: ["quart","quarts","qts","qt"]},
        {amount: -1, aliases: ["units"]}
]

export function GetUnit(input : string) : {amount : number, name : string}
{
    let index = MeasuringUnits.findIndex(unit => unit.aliases.includes(input.toLowerCase()));
    if (index < 0)
    {
        return {amount : MeasuringUnits[MeasuringUnits.length-1].amount, name: MeasuringUnits[MeasuringUnits.length-1].aliases[0]} ;
    }
    else
    {
        return {amount : MeasuringUnits[index].amount, name: MeasuringUnits[index].aliases[0]} ;
    }
}




