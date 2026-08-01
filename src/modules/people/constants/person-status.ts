import { People } from "../../../../sanity.types";

type PersonStatus = NonNullable<People["status"]>;

export const PERSON_STATUS_LABELS: Record<PersonStatus, string> = {
  assistant_professor: "Assistant Professor",
  phd_student: "PhD Student",
  master_student: "Masters Student",
  undergraduate: "Undergraduate",
  highschool: "High School",
};

export const PERSON_STATUS_COLORS: Record<PersonStatus, string> = {
  assistant_professor: "#AA2C45",
  phd_student: "rgba(170, 44, 69, 0.90)",
  master_student: "rgba(170, 44, 69, 0.80)",
  undergraduate: "rgba(170, 44, 69, 0.70)",
  highschool: "rgba(170, 44, 69, 0.60)",
};
