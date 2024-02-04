"user clients";

interface props {
  cim: string;
}

function SzuroCheckbox({ cim }: props) {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer ">
          <span className="label-text lg:ml-1">{cim}</span>
          <input type="checkbox" className="checkbox lg:mr-1" />
        </label>
      </div>
    </div>
  );
}
export default SzuroCheckbox;
