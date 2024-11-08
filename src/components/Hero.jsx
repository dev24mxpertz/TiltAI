
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import imgframe from "../_x31_01.svg"

const ROTATION_RANGE = 2;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const Hero = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="Main_Hero_Wrapper">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d", transform }}
      >
        <h1 ref={ref} className="First_Hero_Section_h1">
          DIRTYPLAYDIRTYPLAYDIRTYPLAY
        </h1>
        <section className="First_Hero_Section">
          <img
            ref={ref}
            className="imageframe"
            src={imgframe}
            alt="imageframe"
          />
          <img
            ref={ref}
            className="imageframe2"
            src={imgframe}
            alt="imageframe"
          />
          <h3 className="First_Hero_Section_h3">ANDERSON MOSS</h3>
          <div className="First_Hero_lowersection">
            <h2 className="First_Hero_Section_h2">X.XI.VI.IX</h2>
            <p className="First_Hero_Section_p">
              Strategy-led experiential digital for the visionaries and
              pioneers. Signature design, meticulously crafted.
            </p>
            <h4 className="First_Hero_Section_h4">
              SCROLL - EXPLORE{" "}
              <span>
                <i className="bi bi-arrow-down-short"></i>
              </span>
            </h4>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Hero;
