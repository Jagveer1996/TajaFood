import React, { useEffect, useRef, useState } from "react";
import NavUser from "./NavUser";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getShopbyCityAPI } from "../API/shopApi";
import shop from "../assets/foodimage/shop.png"
import { setItemsInMyCity, setShopsInMyCity } from "../redux/userSlice.js";
import { getItembyCityAPI } from "../API/itemAPI.js";
import FoodCard from "./FoodCard.jsx";

const UserDashborad = () => {

  const { city, shopsInMyCity, itemsInMyCity } = useSelector(state => state.user);

  // console.log("User state:", useSelector(state => state.user));
  const dispatch = useDispatch();


  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ['getShopbyCityAPI', city],
    queryFn: () => getShopbyCityAPI(city),
    enabled: !!city
  })

  // console.log("Fetch shop by city", data);


  useEffect(() => {
    if (isSuccess && data?.shops) {
      dispatch(setShopsInMyCity(data.shops));
    }
  }, [isSuccess, data, dispatch]);


  const { data: itemData, isSuccess: itemSuccess } = useQuery({
    queryKey: ['getItembyCityAPI', city],
    queryFn: () => getItembyCityAPI(city),
    enabled: !!city
  })
  console.log("Fetch Item in my city", itemData);


 useEffect(() => {
  if (itemSuccess && itemData?.items) {
    dispatch(setItemsInMyCity(itemData.items));
  }
}, [itemSuccess, itemData, dispatch]);



  const cardScroll = useRef();
  const shopScrollRef = useRef();
  const [LeftScroll, setLeftScroll] = useState(false);
  const [RightScroll, setRightScroll] = useState(false);

  const [shopLeftScroll, setShopLeftScroll] = useState(false);
  const [shopRightScroll, setShopRightScroll] = useState(false);

  const updateScroll = (ref, LeftScroll, RightScroll) => {
    const element = ref.current;
    if (element) {
      setLeftScroll(element.scrollLeft > 0)
      setRightScroll(element.scrollLeft + element.clientWidth < element.scrollWidth)

    }
  }

  const updateShopScroll = (ref, shopLeftScroll, shopRightScroll) => {
    const element = ref.current;
    if (element) {
      setShopLeftScroll(element.scrollLeft > 0)
      setShopRightScroll(element.scrollLeft + element.clientWidth < element.scrollWidth)

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
      cardScroll.current.addEventListener("scroll", () => { updateScroll(cardScroll, LeftScroll, shopRightScroll) })
    }

    if (shopScrollRef.current) {
      shopScrollRef.current.addEventListener("scroll", () => { updateShopScroll(shopScrollRef, shopLeftScroll, shopRightScroll) })
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
                return <CategoryCard name={card.category} image={card.image} key={index} />
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

          <div className="w-full relative">
            {shopLeftScroll &&
              <button onClick={() => scrollDirection(shopScrollRef, "left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-[#e64528] z-10">
                <FaChevronCircleLeft />
              </button>
            }

            <div className="w-full flex overflow-x-auto gap-4 pb-2 " ref={shopScrollRef}>
              {/* {shopsInMyCity.map((card, index) => {
                return <CategoryCard name={card.shops.name} image={shop} key={index} />
              })} */}

              {Array.isArray(shopsInMyCity) && shopsInMyCity.map((card, index) => (
                <CategoryCard name={card?.name} image={shop} key={index} />
              ))}
            </div>
            {shopRightScroll &&
              <button onClick={() => scrollDirection(shopScrollRef, "right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full hover:bg-[#e64528] z-10">
                <FaChevronCircleRight />
              </button>
            }

          </div>
        </div>


        {/* To display shops products */}

        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]" >
          <h1 className="text-gray-800 text-2xl sm:text-3xl">Suggested Food Items</h1>
          <div className="w-full h-auto flex flex-wrap justify-center gap-[20px]">
            {Array.isArray(itemsInMyCity) && itemsInMyCity.map((item, index) => (
              <FoodCard data={item} key={index} />
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default UserDashborad