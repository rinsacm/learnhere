import { Button, Card, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// const CourseDetails = ({ showModal, toggleFunc, details }) => {
//   return (
//     <Modal
//       open={showModal}
//       closable={true}
//       onCancel={() => {
//         toggleFunc();
//       }}
//     >
//       <h3 className="">{details.course}</h3>
//       <div>{details.description}</div>
//     </Modal>
//   );
// };
// export default CourseDetails;

const CourseDetails = ({ courseDetails }) => {
  let { courseid } = useParams();

  const [course, setCourse] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  let [isEnrolled, setIsEnroll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/teacher/courses/${courseid}`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 200) {
          setErr("");
          return res.json();
        }
      })
      .then((data) => {
        console.log(data.data);
        if (data.success === false) setErr(data.message);
        if (!data.data.modules) data.data.modules = [];
        setCourse(data.data);

        console.log(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (localStorage.getItem("id") != null) {
      fetch("http://localhost:3001/student/check-enrolled", {
        method: "POST",
        credentials: "include",
        withcredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: localStorage.getItem("id").toString(),
          course_id: courseid,
        }),
      })
        .then((res) => {
          console.log(res);
          console.log(res.status);
          if (res.status === 200) {
            setErr("");
            return res.json();
          }
        })
        .then((data) => {
          console.log(data.data);
          if (data.success === false) setErr(data.message);
          else {
            setIsEnroll(data.enrolled);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  const onEnroll = (course_id) => {
    if (localStorage.getItem("role")?.includes("student")) {
      fetch("http://localhost:3001/student/enroll", {
        method: "PUT",
        credentials: "include",
        withcredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: localStorage.getItem("id").toString(),
          course_id: course_id.toString(),
        }),
      })
        .then((res) => {
          console.log(res);
          console.log(res.status);
          if (res.status === 200) {
            setErr("");
            return res.json();
          }
        })
        .then((data) => {
          console.log(data.data);
          if (data.success === false) setErr(data.message);
          else {
            setIsEnroll(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login");
    }
  };
  if (!loading) {
    return (
      <div className="container mx-auto m-4">
        <h1 className="text-4xl fond-extrabold">{course.course}</h1>
        <div className="my-2 text-lg italic text-blue-400">
          Instructor : {course.instructor.name}
        </div>
        <div className="text-base my-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </div>
        <div>
          {/* <Link
          
            // to={
            //   localStorage.getItem("role").includes("student")
            //     ? `/courses/${course._id}`
            //     : "/login"
            // }
          > */}
          {isEnrolled ? (
            <div className="text-sm font-italic text-lime-800">
              You are enrolled in this course
            </div>
          ) : (
            <Button
              type="primary"
              className="bg-blue-500"
              onClick={() => onEnroll(course._id)}
            >
              Enroll
            </Button>
          )}
          {/* </Link> */}
        </div>
        {course.modules.length > 0 ? (
          <div className="my-4">
            <div className="text-xl"> Contents</div>
            <ol type="1">
              {course.modules.length > 0 ? (
                course?.modules?.map((module, index) => {
                  return (
                    <li className="my-2">
                      <Link
                        to={`/student/courses/${course._id}/modules/${module.moduleName}`}
                        key={index}
                      >
                        <Card
                          style={{
                            width: "80%",
                          }}
                        >
                          <p>
                            {index + 1}. {module.moduleName}
                          </p>
                        </Card>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <div></div>
              )}
            </ol>
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full min-h-screen container flex items-center justify-center">
        <Spin />
      </div>
    );
  }
};
export default CourseDetails;
