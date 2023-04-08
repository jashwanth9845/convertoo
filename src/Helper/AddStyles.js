export const AddStyles = (props) => {
    const { selector, style, theme, applyTo, styleObject } = props;
  
    if (
      Array.isArray(selector) &&
      Array.isArray(style) &&
      Array.isArray(applyTo)
    ) {
      const selectors = selector[0];
      const styles = style[0];
      const applyTos = applyTo[0];
  
      for (const key of Object.keys(selectors)) {
        const selectorValue = selectors[key];
        const styleValue = styles[key];
        const applyToValue = applyTos[key];
  
        if (selectorValue && styleValue && applyToValue) {
          ApplyStyles({
            selector: selectorValue,
            style: styleValue,
            applyTo: applyToValue,
            styleObject,
            theme,
          });
        }
      }
    } else if (
      typeof selector === "string" &&
      typeof style === "string" &&
      typeof applyTo === "string"
    ) {
      ApplyStyles({ selector, style, applyTo, styleObject, theme });
    } else {
      console.error("Invalid format. Check format and send again.");
      return;
    }
  };
  
  const ApplyStyles = ({ selector, style, theme, applyTo, styleObject }) => {
    const elements = document.querySelectorAll(selector);
  
    if (!elements.length) {
      console.warn("No elements found for selector:", selector);
      return;
    }
  
    const styleValue = styleObject[theme][applyTo];
  
    for (const element of elements) {
      element.style[style] = styleValue;
    }
  };
  