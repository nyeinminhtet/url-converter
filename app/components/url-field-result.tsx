type UrlFieldResultProps = {
  output: string;
};

const UrlFieldResult = ({ output }: UrlFieldResultProps) => {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor="output">
        Result
      </label>
      <textarea
        id="output"
        className="tool-field"
        value={output}
        readOnly
        placeholder="Your converted result will appear here..."
        spellCheck={false}
      />
    </div>
  );
};

export default UrlFieldResult;
