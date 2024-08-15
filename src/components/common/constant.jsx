export const ACCOUNT_TYPE = {
  INSTRUCTOR: "Instructor",
  STUDENT: "Student",
  ADMIN: "Admin"
};

export const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
}

export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}