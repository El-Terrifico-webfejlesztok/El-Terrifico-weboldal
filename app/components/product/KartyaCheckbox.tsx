interface props {
  name: string
}


function KartyaCheckbox({name}: props) {
  return (
        <li className="mb-2">{name}</li>
  );
}
export default KartyaCheckbox;
