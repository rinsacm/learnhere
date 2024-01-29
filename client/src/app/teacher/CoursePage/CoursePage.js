import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Form, Modal, Card } from "antd";
import { Link } from "react-router-dom";

function CoursePage(props) {
  let { id } = useParams();
  let courseid = id;
  const [course, setCourse] = useState({});
  const [newModuleModalVisible, setNewModuleModalVisible] = useState(false);
  const [newModuleName, setNewModuleName] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
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
  console.log(courseid);
  const onCreate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/teacher/courses/${courseid}/new-module`, {
      method: "POST",
      credentials: "include",
      withcredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        module: newModuleName,
      }),
    })
      .then((res) => {
        console.log(res);
        console.log(res.status);
        if (res.status === 201) {
          setErr("");
          alert("New Module created");
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
      <div className="container mx-auto ">
        <div className="p-4 space-y-2 mt-4">
          <div className="flex gap-4">
            <div className="text-black md:text-2xl text-xl font-semibold ">
              {course.course}
            </div>
            <EditOutlined className=" text-xl hover:text-blue-400" />
          </div>
          <Button
            type="primary"
            className="border-none rounded-lg "
            style={{ backgroundColor: "#05A2E5" }}
            onClick={() => {
              setNewModuleModalVisible(!newModuleModalVisible);
              console.log(newModuleModalVisible);
            }}
          >
            <div className="flex items-center justify-center gap-4">
              <div className="font-normal text-white text-sm ">
                Add New Module
              </div>
              <PlusOutlined />
            </div>
          </Button>
        </div>
        <div>
          {course.modules != null
            ? course.modules.map((data, index) => {
                return (
                  <Link
                    to={`/teacher/courses/${course._id}/module-${data.moduleName}`}
                    key={index}
                  >
                    <Card style={{ width: "100%" }} className="m-2">
                      <p>{data.moduleName}</p>
                    </Card>
                  </Link>
                );
              })
            : null}
        </div>
        <Modal
          open={newModuleModalVisible}
          okText="Save"
          closable={true}
          onCancel={() => setNewModuleModalVisible(false)}
          onOk={onCreate}
          afterClose={() => setNewModuleName("")}
        >
          <div className="mt-8">
            <Form layout="vertical">
              <Form.Item>
                <Input
                  type="textarea"
                  placeholder="module name"
                  onChange={(e) => setNewModuleName(e.target.value)}
                  value={newModuleName}
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

export default CoursePage;
