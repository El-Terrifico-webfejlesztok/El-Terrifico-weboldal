interface props {
  name: string
}


function KartyaCheckbox({name}: props) {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer ">
          <span className="label-text">{name}</span>
          <input type="checkbox" checked readOnly className="checkbox" />
        </label>
      </div>
    </div>
  );
}
export default KartyaCheckbox;
