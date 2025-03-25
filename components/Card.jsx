'use client'
import React, { useState, useEffect } from 'react'

const Card = () => {
  const [start, setStart] = useState({x: 0, y: 0})
  const [offset, setOffset] = useState({x: 0, y: 0})
  const [isDragging, setIsDragging] = useState(false)
  const handleStart = (e) => {
    setIsDragging(true);
    setStart({x: e.clientX, y: e.clientY})
    console.log("Mouse Down at X:", e.clientX)
  }
  const handleMove = (e) => {
    if(!isDragging) return;
    setOffset({x: e.clientX - start.x, y: e.clientY - start.y})
  }
  const handleEnd = (e) => {
    setIsDragging(false);
    setOffset({x: 0, y: 0})
  }
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setOffset({ x: 0, y: 0 });
      }
    };
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);
  return (
    <div className={`w-72 h-72 relative bg-black ${!isDragging ? 'duration-300 ease-in-out transition-all': ''}  border-gradient text-xl text-white`}
    style={{
      left: offset.x,
      rotate: (offset.x / 10) + 'deg',
    }}
    onMouseDown={handleStart}
    onMouseMove={handleMove}
    onMouseUp={handleEnd}>
        Clicked x: {start.x}, y: {start.y} <br/>
        Offset x: {offset.x}, y: {offset.y}
    </div>
  )
}

export default Card