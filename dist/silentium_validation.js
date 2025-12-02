import { ActualMessage, Message, DestroyContainer, All, Applied, Chainable } from 'silentium';
import { Dirty, MergeAccumulation } from 'silentium-components';

function Validated(errors) {
  return !Object.values(errors).some(
    (errorValues) => errorValues.length > 0
  );
}

function ValidationErrors(form) {
  const $form = ActualMessage(form);
  return Message((resolve, reject) => {
    const formDc = DestroyContainer();
    $form.then((form2) => {
      formDc.destroy();
      const entries = form2.map((i) => {
        return All(
          i.key,
          Applied(
            All(
              ...i.rules.map((rule) => {
                return formDc.add(rule(i.value));
              })
            ),
            (items) => items.filter(ExcludeTrue).map(ErrorFormat)
          )
        );
      });
      Applied(All(...entries), (e) => Object.fromEntries(e)).catch(reject).then(resolve);
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
  const dirtyForm = Dirty($form);
  Chainable(dirtyForm).chain($form);
  const touchedForm = MergeAccumulation(dirtyForm);
  const errorsTouched = All(Applied(touchedForm, Object.keys), $errors);
  return Applied(errorsTouched, ([touched, errors]) => {
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

export { Integer, Required, Validated, ValidationErrors, ValidationErrorsHappened, ValidationErrorsSummary, ValidationErrorsTouched, ValidationItems };
//# sourceMappingURL=silentium_validation.js.map
