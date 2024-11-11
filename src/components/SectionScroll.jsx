// import React, { useEffect, useRef } from "react";
// import LocomotiveScroll from "locomotive-scroll";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "locomotive-scroll/dist/locomotive-scroll.css";

// gsap.registerPlugin(ScrollTrigger);

// const SectionScroll = () => {
//   const scrollRef = useRef(null);
//   const locomotiveScrollRef = useRef(null);

//   useEffect(() => {
//     // Initialize Locomotive Scroll
//     locomotiveScrollRef.current = new LocomotiveScroll({
//       el: scrollRef.current,
//       smooth: true,
//       inertia: 0.8, // Controls scrolling speed
//       multiplier: 1.0,
//     });

//     // Setup GSAP ScrollTrigger with Locomotive Scroll
//     locomotiveScrollRef.current.on("scroll", ScrollTrigger.update);
//     ScrollTrigger.scrollerProxy(scrollRef.current, {
//       scrollTop(value) {
//         return arguments.length
//           ? locomotiveScrollRef.current.scrollTo(value, 0, 0)
//           : locomotiveScrollRef.current.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return {
//           top: 0,
//           left: 0,
//           width: window.innerWidth,
//           height: window.innerHeight,
//         };
//       },
//       pinType: scrollRef.current.style.transform ? "transform" : "fixed",
//     });

//     ScrollTrigger.addEventListener("refresh", () =>
//       locomotiveScrollRef.current.update()
//     );
//     ScrollTrigger.refresh();

//     // Section-wise scrolling on wheel event
//     let isScrolling = false;
//     const handleWheel = (event) => {
//       if (isScrolling) return;

//       isScrolling = true;
//       const direction = event.deltaY > 0 ? "next" : "prev";

//       // Scroll to next or previous section
//       const sections = scrollRef.current.querySelectorAll(".section");
//       const currentScroll =
//         locomotiveScrollRef.current.scroll.instance.scroll.y;
//       let targetSection = null;

//       sections.forEach((section) => {
//         const rect = section.getBoundingClientRect();
//         const offsetTop = rect.top + currentScroll;

//         if (direction === "next" && offsetTop > currentScroll) {
//           targetSection = targetSection || offsetTop;
//         } else if (direction === "prev" && offsetTop < currentScroll) {
//           targetSection = offsetTop;
//         }
//       });

//       if (targetSection !== null) {
//         locomotiveScrollRef.current.scrollTo(targetSection, {
//           offset: 0,
//           duration: 800,
//         });
//       }

//       // GSAP animation on scroll
//     //   gsap.fromTo(
//     //     scrollRef.current,
//     //     { opacity: 0 },
//     //     { opacity: 1, duration: 1, ease: "power3.out" }
//     //   );

//       // Reset scroll flag after duration
//       setTimeout(() => (isScrolling = false), 1000);
//     };

//     // Add wheel event listener
//     scrollRef.current.addEventListener("wheel", handleWheel);

//     // Clean up on unmount
//     return () => {
//       locomotiveScrollRef.current.destroy();
//       ScrollTrigger.removeEventListener("refresh", () =>
//         locomotiveScrollRef.current.update()
//       );
//       scrollRef.current.removeEventListener("wheel", handleWheel);
//     };
//   }, []);

//   return (
//     <div ref={scrollRef} className="scroll-container">
//       <section
//         className="section"
//         style={{ height: "100vh", backgroundColor: "red" }}
//       >
//         Section 1
//       </section>
//       <section
//         className="section"
//         style={{ height: "100vh", backgroundColor: "blue" }}
//       >
//         Section 2
//       </section>
//       <section
//         className="section"
//         style={{ height: "100vh", backgroundColor: "green" }}
//       >
//         Section 3
//       </section>
//       {/* Add more sections as needed */}
//     </div>
//   );
// };

// export default SectionScroll;

// **********************************************************************************************************************
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import imgframe from "../_x31_01.svg";

gsap.registerPlugin(ScrollTrigger);

const ROTATION_RANGE = 2;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const SectionScroll = () => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
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

  useEffect(() => {
    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      inertia: 0.8,
      multiplier: 1.0,
    });

    // Setup GSAP ScrollTrigger with Locomotive Scroll
    locomotiveScrollRef.current.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locomotiveScrollRef.current.scrollTo(value, 0, 0)
          : locomotiveScrollRef.current.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () =>
      locomotiveScrollRef.current.update()
    );
    ScrollTrigger.refresh();

    // Section-wise scrolling on wheel event
    let isScrolling = false;
    const handleWheel = (event) => {
      if (isScrolling) return;

      isScrolling = true;
      const direction = event.deltaY > 0 ? "next" : "prev";
      const sections = scrollRef.current.querySelectorAll(".section");
      const currentScroll =
        locomotiveScrollRef.current.scroll.instance.scroll.y;
      let targetSection = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offsetTop = rect.top + currentScroll;

        if (direction === "next" && offsetTop > currentScroll) {
          targetSection = targetSection || offsetTop;
        } else if (direction === "prev" && offsetTop < currentScroll) {
          targetSection = offsetTop;
        }
      });

      if (targetSection !== null) {
        locomotiveScrollRef.current.scrollTo(targetSection, {
          offset: 0,
          duration: 800,
        });
      }

      const firstHeroSection = sections[0];
      const secondHeroSection = sections[1];

      if (
        direction === "next" &&
        firstHeroSection.classList.contains("First_Hero_Section")
      ) {
        // Animation from Section 1 to Section 2
        gsap
          .timeline()
          .fromTo(
            ".First_Hero_Section_h3",
            { x: 0, opacity: 1 },
            { x: 100, opacity: 0, duration: 1, ease: "power3.out" }
          )
          .fromTo(
            ".imageframe",
            {},
            {
              height: "20%",
              left: "50%",
              top: "50%",
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=1"
          )
          .fromTo(
            ".imageframe2",
            {},
            {
              height: "20%",
              right: "-80%",
              top: "45%",
              opacity: 0,
              duration: 2,
              ease: "power3.out",
            },
            "-=1"
          )
          .fromTo(
            ".First_Hero_Section_h1",
            {},
            {
              fontSize: "10px",
              left: "85%",
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=2"
          )
          .fromTo(
            ".First_Hero_lowersection",
            {},
            {
              fontSize: "10px",
              top: "50%",
              left: "85%",
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            },
            "-=2"
          );
      } else if (
        direction === "prev" &&
        secondHeroSection.classList.contains("Second_Hero_Section")
      ) {
        gsap
          .timeline()
          .fromTo(
            ".First_Hero_Section_h3",
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
          )
          .fromTo(
            ".imageframe",
            {
              height: "20%",
              left: "50%",
              top: "50%",
            },
            {
              height: "100%",
              top: "92%",
              left: "-10%",
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=1"
          )
          .fromTo(
            ".imageframe2",
            {
              height: "20%",
              right: "-80%",
              top: "45%",
              opacity: 0,
            },
            {
              top: "50%",
              left: "100%",
              height: "100%",
              opacity: 1,
              duration: 2,
              ease: "power3.out",
            },
            "-=1"
          )
          .fromTo(
            ".First_Hero_Section_h1",
            {
              fontSize: "10px",
              left: "85%",
              opacity: 0,
            },
            {
              fontSize: "140px",
              left: "50%",
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=2"
          )
          .fromTo(
            ".First_Hero_lowersection",
            {
              top: "50%",
              left: "85%",
              opacity: 0,
            },
            {
              top: "80%",
              left: "50%",
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            },
            "-=2"
          );
      }
      setTimeout(() => (isScrolling = false), 1000);
    };

    scrollRef.current.addEventListener("wheel", handleWheel);

    return () => {
      locomotiveScrollRef.current.destroy();
      ScrollTrigger.removeEventListener("refresh", () =>
        locomotiveScrollRef.current.update()
      );
      scrollRef.current.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={scrollRef} className="scroll-container">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d", transform }}
      >
        <section
          className="section First_Hero_Section"
          style={{ height: "100vh", backgroundColor: "black" }}
        >
          <h1 ref={ref} className="First_Hero_Section_h1">
            DIRTYPLAYDIRTYPLAYDIRTYPLAY
          </h1>
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
        <section
          className="section Second_Hero_Section"
          style={{
            height: "100vh",
            backgroundColor: "blue",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent:"center"
          }}
        >
          <h1 className="Second_Hero_Section_h1" >
            Second Section
          </h1>
        </section>
      </motion.div>
    </div>
  );
};

export default SectionScroll;
