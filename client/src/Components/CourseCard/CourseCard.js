import React from "react";
import courseImg from "../../assets/course-img1.jpg";

function CourseCard({
  name = "Course Name",
  description = " Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}) {
  return (
    <div className="rounded-lg bg-white drop-shadow-md">
      <div className="w-full relative rounded-t-lg">
        <div className="absolute w-full h-full bg-black opacity-20 rounded-t-lg"></div>
        <img className="object-cover rounded-t-lg" src={courseImg} alt="" />
      </div>
      <div className="w-full py-2 px-4">
        <div
          style={{ color: "#EE6F57" }}
          className="md:text-2xl text-xl font-medium"
        >
          {name}
        </div>
        <div className="md:text-sm text-xs font-normal text-black">
          {description}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
