import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faUser,
  faPhotoFilm,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";

function NavBar(props) {
  const uploadRef = useRef();

  const handlePhotos = async (e) => {
    console.log(e.target.files);
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const headers = { "Content-Type": "multipart/form-data" };
      await axios.post("http://localhost:4000/uploads", formData, headers);
      const res = await axios.post("http://localhost:4000/getImages", {
        page: 1,
        limit: 6,
      });
      props.getData(res.data.result);
      props.setCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-2 flex justify-between border-b-2">
      <span className="m-2">
        <FontAwesomeIcon icon={faPhotoFilm} size="2x" />
        <span className="font-bold text-2xl text-blue-600">PhotoGallery</span>
      </span>
      <div className="mt-2">
        <span className="m-2">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            size="2x"
            cursor={"pointer"}
            onClick={() => {
              uploadRef.current.click();
            }}
          />
          <div className="hidden">
            <input
              type="file"
              ref={uploadRef}
              accept="image/png/jpg/jpeg"
              onChange={handlePhotos}
            />
          </div>
        </span>
        <span className="m-2">
          <FontAwesomeIcon icon={faUser} size="2x" />
        </span>
      </div>
    </div>
  );
}

export default NavBar;
