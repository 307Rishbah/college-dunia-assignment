import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowRight,
  ArrowRightLeft,
  Check,
  ChevronDown,
  Dot,
  Download,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-header";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "rank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CD Rank" />
    ),
    cell: ({ row }) => {
      return <div>#{row.getValue("rank")}</div>;
    },
    size: 100,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "college",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Colleges"
        className="text-white min-w-[500px]"
      />
    ),
    cell: ({ row }) => {
      const college = row.original.college;

      return (
        <div className="grid grid-cols-1 gap-1.5">
          <div className="flex items-center space-x-2">
            {college.featured && (
              <span className="text-xs font-medium text-white bg-red-500 py-1 px-2 rounded-xl">
                Featured
              </span>
            )}
          </div>
          <div className="flex items-start gap-2">
            <img
              src={"/collge-image-logo.png"}
              alt="Logo"
              className="h-12 w-12 border rounded-full"
            />
            <div className="grid grid-cols-1">
              <div className="font-semibold text-sky-500 text-base subpixel-antialiased">
                {college.name}
              </div>
              <div className="font-medium text-sm text-gray-700">
                {college.location} | {college.accreditation.short} Approved
              </div>
              <div className="w-80 rounded-[4px] border-l-4 border-yellow-500 bg-[#FFFAE1] py-0.5 px-1 my-0.5">
                <div className="flex items-center gap-2">
                  <div>
                    {college.majorDepartments.map(
                      (department: string, index: number) => {
                        return (
                          <span
                            key={index}
                            className="font-semibold text-xs text-yellow-500"
                          >
                            {department}
                            {index < college.majorDepartments.length - 1 &&
                              ", "}
                          </span>
                        );
                      }
                    )}
                  </div>
                  <ChevronDown className="text-yellow-500" size={16} />
                </div>
                <div>
                  <span className="font-medium text-xs text-gray-400">
                    {college.entryExam} 2023, Cut Off : {college.cutOff}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ArrowRight
                strokeWidth={2}
                size={16}
                className="text-yellow-500"
              />
              <span className="font-semibold text-xs text-yellow-500">
                Apply Now
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Download size={16} strokeWidth={2} className="text-green-500" />
              <span className="font-semibold text-xs text-green-500">
                Download Brochure
              </span>
            </div>
            <div className="flex items-center gap-1 mr-3">
              <Checkbox />
              <span className="font-semibold text-xs ">Add To Compare</span>
            </div>
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,

    filterFn: (row, _, value) => {
      const collegeName = row.original.college.name.toLowerCase();
      return collegeName.includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "courseFee",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Course Fees"
        className="w-52"
      />
    ),
    cell: ({ row }) => {
      const courseFees = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(parseFloat(row?.original?.courseDetails?.courseFees));

      const course = row?.original?.courseDetails?.course;

      return (
        <div className="grid grid-cols-1 gap-2">
          <div className="text-base font-bold text-green-500">{courseFees}</div>
          <div className="grid grid-cols-1 gap-0.5">
            <div className="text-xs font-medium text-gray-500">{course}</div>
            <div className="text-sm font-medium text-gray-500">
              - 1st Year Fees
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ArrowRightLeft
              strokeWidth={2}
              size={16}
              className="text-yellow-500"
            />
            <span className="text-sm font-bold text-yellow-500">
              Compare Fees
            </span>
          </div>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const feeA = parseFloat(rowA.original?.courseDetails?.courseFees);
      const feeB = parseFloat(rowB.original?.courseDetails?.courseFees);
      return feeA - feeB;
    },
    enableHiding: false,
  },
  {
    accessorKey: "placement",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Placement"
        className="min-w-52"
      />
    ),
    cell: ({ row }) => {
      const averagePackage = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(row?.original?.placement?.averagePackage);

      const highestPackage = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(row?.original?.placement?.highestPackage);

      return (
        <div className="grid grid-cols-1 gap-2">
          <div>
            <div className="text-base font-bold text-green-500">
              {averagePackage}
            </div>
            <div className="text-xs font-medium text-gray-500">
              Average Package
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-green-500">
              {highestPackage}
            </div>
            <div className="text-xs font-medium text-gray-500">
              Highest Package
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ArrowRightLeft
              strokeWidth={2}
              size={16}
              className="text-yellow-500"
            />
            <span className="text-sm font-bold text-yellow-500">
              Compare Placement
            </span>
          </div>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const averagePackageA = rowA.original?.placement?.averagePackage;
      const averagePackageB = rowB.original?.placement?.averagePackage;
      return averagePackageA - averagePackageB;
    },
  },
  {
    accessorKey: "userReviews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Reviews" />
    ),
    cell: ({ row }) => {
      const { rating, scale, totalRatings } = row?.original?.userReviews;
      return (
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center gap-0.5">
            <Dot strokeWidth={4} className="text-yellow-500" />
            <span className="font-semibold text-gray-600">
              {rating} / {scale}
            </span>
          </div>
          <div className="font-semibold text-gray-600">
            Based on {totalRatings} <br /> users reviews
          </div>
          <div className="flex items-center gap-0.5 border rounded-2xl p-1 bg-[#FFFAE1]">
            <Check strokeWidth={1.25} className="text-yellow-500" size={16} />
            <span className="font-semibold text-yellow-500">
              Best in Infrastructure
            </span>
            <ChevronDown className="text-yellow-500" size={16} />
          </div>
        </div>
      );
    },

    enableHiding: true,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const ratingA = rowA.original?.userReviews?.rating;
      const ratingB = rowB.original?.userReviews?.rating;
      return ratingA - ratingB;
    },
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ranking"
        className="text-white"
      />
    ),
    cell: ({ row }) => {
      const { position, totalRanked, year } = row?.original?.rankings[0] || {};

      return (
        <div>
          <div className="font-medium text-base text-gray-500">
            <span>
              # {position} /{" "}
              <span className="text-yellow-500">{totalRanked}</span> in India
            </span>
            <br />
            <span className="flex items-center">
              <img
                src={"/news-image.png"}
                alt="logo"
                className="h-6 w-6 border rounded-full"
              />
              <span>{year}</span>
            </span>
          </div>
          <div className="flex items-center gap-0.5  border-l-sky-600 border-t-sky-100 border-r-sky-600 border-b-sky-600 bg-sky-100 p-1 rounded-xl">
            <img
              src={"/news-images.png"}
              alt="logo"
              className="h-6 w-6 border rounded-full"
            />
            <span>+ 10 more</span>
            <ChevronDown size={16} />
          </div>
        </div>
      );
    },
    enableHiding: true,
    enableSorting: false,
  },
];
