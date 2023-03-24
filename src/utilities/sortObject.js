import isObject from './isObject';

export default function sortObject(object) {
   return Object.keys(object)
      .sort()
      .reduce((temp, key) => {
         if (isObject(object[key])) {
            temp[key] = sortObject(object[key]);
         } else {
            temp[key] = object[key];
         }
         return temp;
      }, {});
}
