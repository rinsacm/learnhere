import { Button, Modal, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function TeacherCourses() {
  const [newCourseModalVisible, setNewcourseModalVisible] = useState(false);
  const [newCouseName, setNewCourseName] = useState(null);
  const [newCourseDescription, setNewCourseDescription] = useState(null);
  const [err, setErr] = useState("");
  const [myCourses, setMyCourses] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const onCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/teacher/create-new-course", {
      method: "POST",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        course: newCouseName,
        description: newCourseDescription,
      }),
    })
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 201) {
          setErr("");
          alert("New Course created");
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) setErr(data.message);
      })
      .catch((err) => console.log(err));
  };
  if (!loading)
    return (
      <div className="w-full h-full container mx-auto my-auto md:py-8 py-4 min-h-screen px-4 space-y-4">
        <div className="text-black md:text-2xl text-xl font-semibold ">
          My Courses
        </div>
        <Button
          type="primary"
          className="border-none rounded-lg "
          style={{ backgroundColor: "#05A2E5" }}
          onClick={() => setNewcourseModalVisible(true)}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="font-normal text-white text-sm ">
              Create New Course
            </div>
            <PlusOutlined />
          </div>
        </Button>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {myCourses.map((course, index) => {
            return (
              <Link to={`/teacher/${course._id}`}>
                <CourseCard
                  key={index}
                  name={course.course}
                  description={course.description}
                />
              </Link>
            );
          })}
        </div>
        <Modal
          visible={newCourseModalVisible}
          okText="Save"
          closable={true}
          onCancel={() => setNewcourseModalVisible(false)}
          onOk={onCreate}
          afterClose={() => setNewCourseName("")}
        >
          <div className="mt-8">
            <Form layout="vertical">
              <Form.Item>
                <Input
                  type="textarea"
                  placeholder="course name"
                  onChange={(e) => setNewCourseName(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="textarea"
                  placeholder="description"
                  onChange={(e) => setNewCourseDescription(e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  else
    return (
      <div className="w-full h-full min-h-screen container flex items-center justify-center">
        <Spin />
      </div>
    );
}

export default TeacherCourses;
