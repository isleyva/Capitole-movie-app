import { memo, useMemo, ComponentProps } from "react";

import "../../styles/commonComponents/_button.scss";

export interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "ghost";
  size?: "icon";
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Button = memo<ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }) => {
    const buttonClasses = useMemo(
      () =>
        cn(
          "button",
          `button--${variant}`,
          size === "default" ? "button--default-size" : `button--${size}`,
          className
        ),
      [variant, size, className]
    );

    return <button className={buttonClasses} {...props} />;
  }
);

export { Button };
