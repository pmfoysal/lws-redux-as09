import isArray from './isArray';
import isObject from './isObject';

export default function sortObject(object) {
   return Object.keys(object)
      .sort()
      .reduce((temp, key) => {
         if (isObject(object[key])) {
            temp[key] = sortObject(object[key]);
         } else if (isArray(object[key])) {
            temp[key] = object[key].sort();
         } else {
            temp[key] = object[key];
         }
         return temp;
      }, {});
}
