import React, { useEffect, useRef, useState } from "react";
import NavUser from "./NavUser";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserDashborad = () => {

  const {city} = useSelector(state=>state.user)

  // console.log("city", city);
  

  const cardScroll = useRef();
  const [LeftScroll, setLeftScroll] = useState(false);
  const [RightScroll, setRightScroll] = useState(false);

  const updateScroll = (ref, LeftScroll, RightScroll) => {
    const element = ref.current;
    if (element) {
      setLeftScroll(element.scrollLeft > 0)
      setRightScroll(element.scrollLeft + element.clientWidth < element.scrollWidth)

    }
  }

  const scrollDirection = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth"
      })
    }
  }

  useEffect(() => {
    if (cardScroll.current) {
      cardScroll.current.addEventListener("scroll", () => { updateScroll(cardScroll, LeftScroll, RightScroll) })
    }
    
  }, [])



  return (
    <>
      <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#fff9f6] overflow-y-auto">
        <NavUser />

        {/* To Dispaly Category */}
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">Inspiration for your first order</h1>
          <div className="w-full relative">
            {LeftScroll &&
              <button onClick={() => scrollDirection(cardScroll, "left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-[#e64528] z-10">
                <FaChevronCircleLeft />
              </button>
            }

            <div className="w-full flex overflow-x-auto gap-4 pb-2 " ref={cardScroll}>
              {categories.map((card, index) => {
                return <CategoryCard data={card} key={index} />
              })}
            </div>
            {RightScroll &&
              <button onClick={() => scrollDirection(cardScroll, "right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-[#e64528] z-10">
                <FaChevronCircleRight />
              </button>
            }

          </div>
        </div>

        {/* To Dispaly Shop */}

        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
          <h1 className="text-gray-800 text-2xl sm:text-3xl">Best Shop in {city}</h1>
        </div>

      </div>
    </>
  )
}

export default UserDashborad