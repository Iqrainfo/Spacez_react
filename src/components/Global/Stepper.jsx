import React from 'react';
import { FaRegCircle } from 'react-icons/fa';
import { LuTriangleRight } from "react-icons/lu";


import '../../styles/Stepper.css';

function Stepperr({ steps, header }) {
  return (
    <>
      {steps.length !== 0 && (
        <div className="mt-4 stepper_main">
          <label className="tittle_stepper">{header}</label>
          <ul className="stepper_ul">
            {steps.map((step, index) => (
              <li key={index}>
                <span className="stepper_head">
                  <FaRegCircle className="step_icon" />
                  {step.title}
                </span>
                {step.subSteps && (
                  <ul className="stepper_ul">
                    {step.subSteps.map((subStep, subIndex) => (
                      <li key={subIndex}>
                        <span className="stepper_a">
                          <FaRegCircle className="step_icon" />
                          {subStep}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <span className='stepper_head'><LuTriangleRight className='step_icon_last' />Fulfilment & Closer</span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Stepperr;
