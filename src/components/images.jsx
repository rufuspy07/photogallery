import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";
import CustomMoal from "./modal";
import ReactPaginate from "react-paginate";

function MyImages(props) {
  const [imgData, setImageData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const handlePageClick = (event) => {
    // console.log(event.selected+1)
    setPage(event.selected + 1);
  };

  const getImageData = async () => {
    try {
      const payload = {
        page: page,
        limit: 6,
      };
      const res = await axios.post("http://localhost:4000/getImages", payload);
      setImageData(res.data.result);
      setCount(res.data.count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("RUN1");
    getImageData();
  }, [page,props.imgData]);

  useEffect(() => {
    console.log("RUN2");

    const countpg = Math.ceil(count / 6);
    console.log("count", countpg, count);
    setPageCount(countpg);
  }, [imgData]);

  // useEffect(() => {
  //   if (props.imgData) {
  //     console.log("image-reload", props.imgData, props.count);
  //     console.log("before", count);
  //     setCount(props.count);
  //     setPage(1);
  //     console.log("differnce", props.imgData === imgData);
  //     setImgUrl(props.imgData);
  //   }
  // }, [props.imgData])

  return (
    <>
      <div className="d-flex justify-end m-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          forcePage={page - 1}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          nextLinkClassName="page-link"
          previousLinkClassName="page-link"
          pageClassName="page-item"
          breakClassName="page-item"
          nextClassName="page-item"
          previousClassName="page-item"
        />
      </div>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-3 gap-11 m-5">
          {imgData &&
            imgData.map((img, i) => {
              return (
                <div
                  key={i}
                  className="h-[500px] w-[400px] hover:shadow-2xl cursor-pointer"
                >
                  <div
                    onClick={() => {
                      setImgUrl(img?.imgUrl);
                      setShowModal(true);
                    }}
                    className="w-full h-full bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: `url(${img.imgUrl})` }}
                  ></div>
                </div>
              );
            })}
        </div>
        {showModal && (
          <CustomMoal imgUrl={imgUrl} setShowModal={setShowModal} />
        )}
      </div>
    </>
  );
}

export default MyImages;
