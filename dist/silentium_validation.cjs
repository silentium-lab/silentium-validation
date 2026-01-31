'use strict';

var silentium = require('silentium');
var silentiumComponents = require('silentium-components');

function Validated(errors) {
  return !Object.values(errors).some(
    (errorValues) => errorValues.length > 0
  );
}

function ValidationErrors(form) {
  const $form = silentium.Actual(form);
  return silentium.Message((resolve, reject) => {
    const formDc = silentium.DestroyContainer();
    $form.then((form2) => {
      formDc.destroy();
      const entries = form2.map((i) => {
        return silentium.All(
          i.key,
          silentium.Applied(
            silentium.All(
              ...i.rules.map((rule) => {
                return formDc.add(rule(i.value));
              })
            ),
            (items) => items.filter(ExcludeTrue).map(ErrorFormat)
          )
        );
      });
      silentium.Applied(silentium.All(...entries), (e) => Object.fromEntries(e)).catch(reject).then(resolve);
    });
  });
}
function ErrorFormat(v) {
  return v === false ? "Error!" : v;
}
function ExcludeTrue(v) {
  return v !== true;
}

function ValidationErrorsHappened(base) {
  return Object.fromEntries(
    Object.entries(base).filter((entry) => entry[1].length > 0)
  );
}

function ValidationErrorsSummary(errors) {
  return Object.values(errors).flat();
}

function ValidationErrorsTouched($form, $errors) {
  const dirtyForm = silentiumComponents.Dirty($form);
  dirtyForm.chain($form);
  const touchedForm = silentiumComponents.MergeAccumulation(dirtyForm);
  const errorsTouched = silentium.All(silentium.Applied(touchedForm, Object.keys), $errors);
  return silentium.Applied(errorsTouched, ([touched, errors]) => {
    return Object.fromEntries(
      Object.entries(errors).filter((entry) => touched.includes(entry[0]))
    );
  });
}

function ValidationItems(form, rules) {
  return Object.keys(form).map((key) => {
    return {
      key,
      value: form[key],
      rules: rules[key]
    };
  }).filter((item) => !!item.rules);
}

const Required = (v) => !!v || "Field required";
const Integer = (v) => Number.isInteger(v) || "Must be integer";

exports.Integer = Integer;
exports.Required = Required;
exports.Validated = Validated;
exports.ValidationErrors = ValidationErrors;
exports.ValidationErrorsHappened = ValidationErrorsHappened;
exports.ValidationErrorsSummary = ValidationErrorsSummary;
exports.ValidationErrorsTouched = ValidationErrorsTouched;
exports.ValidationItems = ValidationItems;
//# sourceMappingURL=silentium_validation.cjs.map
