import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className = "", orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    const baseClasses = "shrink-0 bg-border";
    const orientationClasses =
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]";
    const combinedClasses = `${baseClasses} ${orientationClasses} ${className}`;

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
