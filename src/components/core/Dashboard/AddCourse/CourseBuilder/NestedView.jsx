import React, { useState } from "react";
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

const NestedView = ({ handleChangeEditSectionName }) => {
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
      <div className="p-6 rounded-lg bg-richblack-700">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex items-center justify-between border-b-2 gap-x-3">
              <div className="flex items-center gap-x-3">
                <RxDropdownMenu />
                <p>{section?.sectionName}</p>
              </div>
              <div className="flex items-center">
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
                <BiSolidDownArrow className={`text-xl text-richblue-300 `} />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => {
                return (
                  <div
                    key={data._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex items-center justify-between p-10 bg-white border-b-2 gap-x-3"
                  >
                    <div className="flex items-center gap-x-3">
                      <RxDropdownMenu />
                      <video
                        src={data?.videoUrl}
                        className="w-[75px] h-[70px]"
                      ></video>
                      <p className="text-black">{data?.title}</p>
                      <p className="text-black">{data?.description}</p>
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
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setAddSubSection(section?._id)}
              className="flex items-center mt-4"
            >
              <AiOutlinePlus />
              <p>Add Lecture</p>
            </button>
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
};

export default NestedView;
