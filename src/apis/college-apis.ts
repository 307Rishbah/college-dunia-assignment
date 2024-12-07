import { College, PaginatedDataResponse } from "@/lib/types";

export const fetchData = (
  page: number,
  pageSize: number,
  searchQuery: string = ""
): Promise<PaginatedDataResponse> => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.filter((college: College) => {
            return (
              college.college.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              college.courseDetails.course
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            );
          });

          const startIndex = (page - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          const dataSubset = filteredData.slice(startIndex, endIndex);

          resolve({
            data: dataSubset,
            page: page,
            size: pageSize,
            totalItem: data.length,
            totalPages: Math.ceil(data.length / pageSize),
          });
        })
        .catch((error) => {
          reject(error);
        });
    }, 1000);
  });
};
