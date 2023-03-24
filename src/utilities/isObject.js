export default function isObject(object) {
   return object?.constructor.name === 'Object';
}
