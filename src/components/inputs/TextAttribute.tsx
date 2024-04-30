interface TextAttributeProps {
  label: string,
  text: string | null | undefined
};

const TextAttribute = (props: TextAttributeProps) => {
  const { label, text } = props;

  return (
    <div>
      <h4 className="text-secondary-500 bold-m">{label}</h4>
      <h3 className="text-neutral-900 body-lg">
        {text}
      </h3>
    </div>
  );
};

export default TextAttribute;