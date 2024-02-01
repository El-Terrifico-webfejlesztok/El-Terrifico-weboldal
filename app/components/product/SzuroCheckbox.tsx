"user clients";

interface props {
  cim: string;
}

function SzuroCheckbox({ cim }: props) {
  return (
    <div>
      <div className="form-control">
        <label className="label cursor-pointer ">
          <span className="label-text lg:ml-24 md:ml-20">{cim}</span>
          <input type="checkbox" className="checkbox lg:mr-24 md:mr-20" />
        </label>
      </div>
    </div>
  );
}
export default SzuroCheckbox;
