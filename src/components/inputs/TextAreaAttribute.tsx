interface TextAreaAttributeProps {
  label: string,
  value: string,
  placeholder: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
};

const TextAreaAttribute = (props: TextAreaAttributeProps) => {
  const { label, value, placeholder, onChange } = props;

  return (
    <div>
      <h4 className="text-secondary-500 bold-m">{label}</h4>
      <textarea
            rows={3}
            value={value}
            placeholder="Contoh: Menjaga gerbang kampus"
            className="w-full px-3 py-2 mt-2 bg-surface-container body-m text-neutral-900 placeholder:text-neutral-400"
            onChange={onChange}
          />
    </div>
  );
};

export default TextAreaAttribute;