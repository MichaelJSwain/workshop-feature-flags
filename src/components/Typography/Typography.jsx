import { createElement } from "react";
import './Typography.css';

export const Typography = ({children, type, tag}) => {

    return createElement(
        tag,
        { className: `typography-${type}` },
        children
      );
}