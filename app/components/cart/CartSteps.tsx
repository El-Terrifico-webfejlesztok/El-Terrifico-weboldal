

interface props {
    currentStep: number;
}

function CartSteps({ currentStep }: props) {
  const steps = ["Kosár", "Szállítási adatok", "Fizetés", "Összegzés"];
  
  return (
    <div className="text-center my-10">
      <ul className="steps steps-vertical lg:steps-horizontal">
        {steps.map((step, index) => (
          <li key={index} className={`step ${index < currentStep ? "step-primary" : ""}`}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartSteps;