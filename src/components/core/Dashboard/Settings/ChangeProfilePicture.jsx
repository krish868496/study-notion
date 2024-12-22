import Upload from "../AddCourse/CourseInformation/Upload";

const ChangeProfilePicture = ({ register, errors, setValue, getValues, editData }) => {


  return (
    <div>
      <div className="gap-2">
        <div
          className=" gap-4 flex items-center p-2 my-5 rounded-md border-[1px] 
       border-richblack-700 bg-richblack-800  text-richblack-5"
        >
          <Upload
            name="image"
            label="Course Image"
            register={register}
            errors={errors}
            setValue={setValue}
            video={false}
            viewData={false}
            editData={editData}
            className="w-14 h-14 rounded-full"
            change={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
