import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

function CoursePage(props) {
  let { courseid } = useParams();
  const [course, setCourse] = useState({});
  useEffect(() => {
    setCourse({
      name: "Course Name",
    });
  });
  console.log(courseid);
  return (
    <div className="container mx-auto ">
      <div className="p-4 space-y-2 mt-4">
        <div className="flex gap-4">
          <div className="text-black md:text-2xl text-xl font-semibold ">
            {course.name}
          </div>
          <EditOutlined className=" text-xl hover:text-blue-400" />
        </div>
        <Button
          type="primary"
          className="border-none rounded-lg "
          style={{ backgroundColor: "#05A2E5" }}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="font-normal text-white text-sm ">
              Add New Module
            </div>
            <PlusOutlined />
          </div>
        </Button>
      </div>
    </div>
  );
}

export default CoursePage;
