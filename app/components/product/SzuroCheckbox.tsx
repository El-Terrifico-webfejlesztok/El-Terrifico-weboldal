"user clients";

interface props {
  cim: string;
  name: string;
}

function SzuroCheckbox({ cim, name }: props) {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer ">
          <span className="label-text lg:ml-6">{cim}</span>
          <input
            name={name}
            value={cim}
            type="checkbox"
            className="checkbox lg:mr-6"
          />
        </label>
      </div>
    </div>
  );
}
export default SzuroCheckbox;
