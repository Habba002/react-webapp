export default function input({value, setValue, label, type}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input value={value} onChange={e => setValue(e.target.value)} type={type} className="form-control" aria-describedby="emailHelp" />
    </div>
  )
}