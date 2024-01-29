import { Link } from "react-router-dom";
import CourseCard from "../../Components/CourseCard/CourseCard";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const AllCourses = () => {
  const [loading, setLoading] = useState(true);
  const [myCourses, setMyCourses] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/teacher/courses", {
      method: "GET",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data.courses);
        setMyCourses(data.courses);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!loading)
    return (
      <div className="w-full h-full container mx-auto my-auto md:py-8 py-4 min-h-screen px-4 space-y-4">
        <div className="text-black md:text-2xl text-xl font-semibold ">
          Courses
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {myCourses.length > 0 ? (
            myCourses.map((course, index) => {
              return (
                <Link to={`/courses/${course._id}`}>
                  <div>
                    <CourseCard
                      key={index}
                      name={course.course}
                      description={course.description}
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No courses to show</div>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="w-full h-full min-h-screen container flex items-center justify-center">
        <Spin />
      </div>
    );
};
export default AllCourses;
