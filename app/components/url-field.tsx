type UrlFieldProps = {
  input: string;
  onInputChange: (value: string) => void;
};

const UrlField = ({ input, onInputChange }: UrlFieldProps) => {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor="input">
        Url
      </label>
      <textarea
        id="input"
        className="tool-field"
        value={input}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Paste a URL or encoded string here..."
        spellCheck={false}
      />
    </div>
  );
};

export default UrlField;
