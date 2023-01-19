import { useEffect, useState } from "react";

export const useContainerDimensionsLine = (myRef) => {
    const [dimensions, setDimensions] = useState({ widthL: 0, heightL: 0 })
  
    useEffect(() => {
      const getDimensions = () => ({
        widthL: myRef.current.offsetWidth,
        heightL: myRef.current.offsetHeight
      })
  
      const handleResize = () => {
        setDimensions(getDimensions())

      }

      if (myRef.current) {
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])
  
    return dimensions;
  };