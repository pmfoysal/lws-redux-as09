import sortObject from './sortObject';

export default function isSameObject(...args) {
   const first = JSON.stringify(sortObject(args[0]));
   return args.map(object => JSON.stringify(sortObject(object))).every(object => object === first);
}
