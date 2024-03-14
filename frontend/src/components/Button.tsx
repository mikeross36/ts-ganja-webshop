type PropsType = {
  className: string;
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
};

const Button = ({
  className,
  type,
  children,
  onClick,
}: PropsType): JSX.Element => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
