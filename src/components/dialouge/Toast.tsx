interface ToastProps {
  msg: string,
  type: "info" | "error"
};

const Toast = (props: ToastProps) => {
  const { msg, type } = props;

  return (
    <div className={`w-full px-4 py-3 ${type === 'info' ? 'bg-primary-500' : 'bg-error-500'} rounded-lg body-m text-neutral-100`}>
      <span>{msg}</span>
    </div>
  );
};

export default Toast;