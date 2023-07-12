import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("", {
	variants: {
		size: {
			default: "p-3 rounded-lg",
		},
		color: {
			darkGrey: "bg-gray-600 hover:bg-gray-700",
			red: "bg-red-700 hover:bg-red-800",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> &
	ButtonVariantsProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, size, color, ...props }, ref) => (
		<button
			className={`${buttonVariants({ size, color })}`}
			ref={ref}
			{...props}
		>
			{children}
		</button>
	)
);
