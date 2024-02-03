"user clients";

interface props {
  cim: string;
}

function SzuroCheckbox({ cim }: props) {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer ">
          <span className="label-text md:ml-10">{cim}</span>
          <input type="checkbox" className="checkbox md:mr-10" />
        </label>
      </div>
    </div>
  );
}
export default SzuroCheckbox;
