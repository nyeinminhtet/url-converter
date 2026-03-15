type ActionsGroupProps = {
  onDecode: () => void;
  onEncode: () => void;
  onExtractImageUrl: () => void;
  onAutoDecode: () => void;
  onCopy: () => void;
  onClear: () => void;
};

const ActionsGroup = ({
  onDecode,
  onEncode,
  onExtractImageUrl,
  onAutoDecode,
  onCopy,
  onClear,
}: ActionsGroupProps) => {
  return (
    <div className="actions">
      <button className="button button--primary" onClick={onDecode} type="button">
        Decode URL
      </button>
      <button className="button" onClick={onEncode} type="button">
        Encode URL
      </button>
      <button className="button" onClick={onExtractImageUrl} type="button">
        Extract Image URL
      </button>
      <button className="button" onClick={onAutoDecode} type="button">
        Auto Detect &amp; Decode
      </button>
      <button className="button" onClick={onCopy} type="button">
        Copy Result
      </button>
      <button className="button button--ghost" onClick={onClear} type="button">
        Clear
      </button>
    </div>
  );
};

export default ActionsGroup;
