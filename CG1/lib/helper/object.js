export function getPropertyName(obj, expression) {
  let res = {};
  Object.keys(obj).map((k) => {
    res[k] = () => k;
  });

  return expression(res)();
}

export function setPropertyAsGetter(context, property, value) {
  context[property] = () => value;
}

export function setReadOnlyProperty(object, property, value) {
  Object.defineProperty(object, property, {
    value,
    writable: false,
  });
}
