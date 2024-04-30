function Input({ type, value, onChange, text }) {
  return (
    <input
      className="border border-solid border-black rounded col-span-3"
      type={type}
      value={value}
      onChange={onChange}
    >
      {text}
    </input>
  );
}
export default Input;
