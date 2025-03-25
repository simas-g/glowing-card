'use client'
import React, { useState, useEffect } from 'react'

const Swiper = () => {
  const [start, setStart] = useState({x: 0, y: 0})
  const [end, setEnd] = useState({x: 0, y: 0})
  const [offset, setOffset] = useState({x: 0, y: 0})
  const [isDragging, setIsDragging] = useState(false)
  const [visible, setVisible] = useState(true);
  const handleStartTouch = (e) => {
    setIsDragging(true);
    setStart({x: e.touches[0].clientX, y: e.touches[0].clientY})
  }
  const handleMoveTouch = (e) => {
    setOffset({x: e.touches[0].clientX - start.x, y: e.touches[0].clientY - start.y})
    setEnd({x: e.touches[0].clientX, y: e.touches[0].clientY});
  }
  const handleEndTouch = (e) => {
    setIsDragging(false);
    setOffset({x: 0, y: 0})
  }
  const handleStart = (e) => {
    setIsDragging(true);
    setStart({x: e.clientX, y: e.clientY})
    console.log("Mouse Down at X:", e.clientX)
  }
  const handleMove = (e) => {
    if(!isDragging) return;
    setOffset({x: e.clientX - start.x, y: e.clientY - start.y})
    setEnd({x: e.clientX, y: e.clientY});

  }
  const handleEnd = (e) => {
    setIsDragging(false);
    setEnd({x: e.clientX, y: e.clientY});
    if(Math.abs(offset.x) > 150) {
      setVisible(false);
    } else setOffset({x: 0, y: 0})
  }
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setOffset({ x: 0, y: 0 });
      }
    };
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleEndTouch);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleEndTouch);
    };
  }, [isDragging]);
  return (
    <div className={`w-72 h-80 relative bg-black ${!isDragging ? 'duration-300 ease-in-out transition-all': ''}  border-gradient text-xl text-white`}
    style={{
      left: offset.x,
      rotate: (offset.x / 10) + 'deg',
      animation: visible ? 'none' : 'fadeOut 0.5s forwards',
      opacity: 1 - Math.abs(offset.x) / 400,
      backgroundColor: 'black',
      zIndex: 100,
    }}
    onMouseDown={handleStart}
    onTouchStart={handleStartTouch}
    onMouseMove={handleMove}
    onTouchMove={handleMoveTouch}
    onTouchEnd={handleEndTouch}
    onMouseUp={handleEnd}
    >
        Clicked x: {start.x}, y: {start.y} <br/>
        Offset x: {offset.x}, y: {offset.y} <br/>
        End x: {end.x}, y: {end.y}
    </div>
  )
}
const Card = () => {
  return (
    <div className="w-72 h-80 relative bg-white border-gradient text-xl text-white">
      <Swiper></Swiper>
    </div>
  )
}
export default Card