import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { EditOutlined } from "@ant-design/icons";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Form, Modal, Card } from "antd";
import ReactPlayer from "react-player";
import { Typography } from "antd";

const { Title } = Typography;

function ModulePage(props) {
  let params = useParams();
  let courseid = params.courseid;
  const [course, setCourse] = useState({});
  // let moduleIndex = parseInt(params.module.replace("module-", "")) - 1;
  let mName = params.moduleid;

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState({
    name: "",
  });
  const [module, setModule] = useState({});
  const [videoUrl, setVideoUrl] = useState("");

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
        setCourse(data.data);
        let md = data.data.modules.find((m) => m.moduleName == mName);
        setModule(md);
        console.log(data.data);

        let modules = data.data.modules;
        let m = modules.find((m) => m.moduleName == mName);
        setModule(m);
        console.log(modules);

        console.log(m);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(courseid);

  if (!loading)
    return (
      <div className="container mx-auto py-2">
        {/* <div>{module.moduleName}</div> */}
        <Title level={2}>{module.moduleName}</Title>
        <div className="video-div">
          {/* <video width="320" height="240" controls>
            <source
              src={`http://localhost:3001/teacher/courses/6155fca1fa101710c49aceea/module-${mName}/video/${module.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video> */}
          <ReactPlayer
            playing={true}
            controls={true}
            muted={false}
            url={`http://localhost:3001/teacher/courses/${course._id}/module-${mName}/video/${module.video}`}
          />
        </div>
      </div>
    );
  else
    return (
      <div className="w-full h-full min-h-screen container flex items-center justify-center">
        <Spin />
      </div>
    );
}

export default ModulePage;
