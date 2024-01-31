"user clients";

interface props {
  cim: string;
}

function SzuroCheckbox({ cim }: props) {
  return (
    <div>
      <div className="form-control items-end">
        <label className="label cursor-pointer">
          <span className="label-text mr-3">{cim}</span>
          <input type="checkbox" className="checkbox mr-6" />
        </label>
      </div>
    </div>
  );
}
export default SzuroCheckbox;
