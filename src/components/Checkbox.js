export default function CheckBox({label, value, onChange}){
  return (
    
    <label>
      <input className = "box" type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}
