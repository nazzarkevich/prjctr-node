const groupBy = (array, func) => {
    return array.reduce((accumulator, currentValue) => {
      const key = func(currentValue);
 
      return {...accumulator, [key]: accumulator[key] ? [...accumulator[key], currentValue] : [currentValue;
    }, {});
 }