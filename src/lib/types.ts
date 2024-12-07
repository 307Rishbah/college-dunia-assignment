export interface College {
  id: number;
  rank: number;
  college: {
    name: string;
    logo: string;
    location: string;
    approvedFrom: string;
    entryExam: string;
    cutOff: string;
    establishedYear: string;
    type: string;
    website: string;
    contactNumber: string;
    email: string;
    affiliations: string[];
    programsOffered: string[];
    majorDepartments: string[];
    studentFacultyRatio: string;
    accreditation: string;
    admissionRate: string;
    applicationFee: string;
    scholarshipsAvailable: boolean;
    applicationDeadline: string;
  };
  courseDetails: {
    course: string;
    courseFees: number;
    campusFee: number;
    totalFees: number;
    duration: string;
    location: string;
  };
  placement: {
    averagePackage: number;
    highestPackage: number;
  };
  userReviews: {
    rating: number;
    scale: number;
    totalRatings: number;
  };
  rankings: {
    source: string;
    position: number;
    totalRanked: number;
    year: number;
  }[];
}

export interface PaginatedDataResponse<T = College> {
  data: T[];
  page: number;
  size: number;
  totalItem: number;
  totalPages: number;
}
