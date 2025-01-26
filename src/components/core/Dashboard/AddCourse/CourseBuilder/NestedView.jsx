import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsApi";
import { setCourse } from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import IconBtn from "../../../../common/IconBtn";

const NestedView = memo(({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course?._id,
      },
      token
    );
    console.log(result);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };
  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({
      subSectionId,
      sectionId,
      token,
    });
    const updatedCourse = course?.courseContent?.map((section) =>
      section?._id === sectionId ? result : section
    );
    const updatedCourseContent = { ...course, courseContent: updatedCourse };
    if (result) {
      // todo extra
      dispatch(setCourse(updatedCourseContent));
    }
    setConfirmationModal(null);
  };

  return (
    <div>
      <div className="p-6 rounded-lg bg-richblack-600 border-richblack-700">
        {course?.courseContent?.map((section) => (
          <details
            key={section._id}
            open
            className="py-3.5 border-b border-richblack-5"
          >
            <summary className="flex items-center justify-between pb-1 gap-x-3">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu />
                <p
                  title={section?.sectionName}
                  className="text-lg leading-8 tracking-wide line-clamp-1"
                >
                  {section?.sectionName}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xl text-richblack-5">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />{" "}
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      id: section._id,
                      text1: "Delete Section",
                      text2: "Are you sure you want to delete this section?",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line />{" "}
                </button>
                <span>|</span>
                <BiSolidDownArrow />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => {
                return (
                  <details
                    key={data._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex flex-col items-start gap-3 p-2 text-base bg-richblack-400 text-richblack-25 gap-x-3"
                  >
                    <summary className="flex items-center justify-between w-full ">
                      <div className="flex items-center gap-x-4">
                        <video
                          src={data?.videoUrl}
                          className="w-[65px] h-[50px] object-cover"
                        ></video>
                        <p className="line-clamp-1">{data?.title}</p>
                        <p className="line-clamp-1">{data?.description}</p>
                      </div>

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-x-3"
                      >
                        <button
                          onClick={() => {
                            setEditSubSection({
                              ...data,
                              sectionId: section?._id,
                            });
                          }}
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => {
                            setConfirmationModal({
                              id: section?._id,
                              text1: "Delete this Sub Section",
                              text2: "Selected category will be deleted",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () =>
                                handleDeleteSubSection(data?._id, section?._id),
                              btn2Handler: () => setConfirmationModal(null),
                            });
                          }}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </summary>
                    <IconBtn
                      onClick={() => setAddSubSection(section?._id)}
                      type="border"
                    >
                      <AiOutlinePlus />
                      <p>Add Lecture</p>
                    </IconBtn>
                  </details>
                );
              })}
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
});

export default NestedView;
