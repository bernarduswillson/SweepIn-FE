export default interface ButtonProps {
  text: string,
  leftIcon?: React.ReactElement,
  rightIcon?: React.ReactElement,
  type: "primary" | "secondary" | "inverse"
  size: "small" | "medium" | "large",
  roundness: "square" | "round",
  onClick?: () => void,
};